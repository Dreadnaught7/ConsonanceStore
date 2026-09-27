import { NextRequest, NextResponse } from "next/server";
import { getStoreProduct } from "@/lib/store-products";
import { getFulfillmentProvider } from "@/lib/fulfillment";
import { createSquarePaymentLink } from "@/lib/square";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { ShippingAddress } from "@/lib/types";

export const runtime = "nodejs";

function validAddress(address: Partial<ShippingAddress> | undefined): address is ShippingAddress {
  if (!address) return false;
  const base = Boolean(
    address.name?.trim() &&
    address.email?.trim() &&
    address.phone?.trim() &&
    address.street1?.trim() &&
    address.city?.trim() &&
    address.postcode?.trim() &&
    address.country?.trim()
  );
  if (!base) return false;
  if (address.country?.toUpperCase() === "US" && !address.state?.trim()) return false;
  return true;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const product = body.slug ? getStoreProduct(body.slug) : undefined;
  const quantity = Number(body.quantity ?? 1);

  if (!product) return NextResponse.json({ error: "Unknown store product." }, { status: 404 });

  if (
    process.env.SQUARE_DIRECT_CHECKOUT_ENABLED !== "true" ||
    process.env.SQUARE_SALES_TAX_READY !== "true"
  ) {
    return NextResponse.json(
      { error: "Direct checkout is not enabled yet. Please use the current Lulu purchase link." },
      { status: 409 }
    );
  }

  const salePriceCents = product.readerPriceCents ?? product.priceCents;
  if (
    !product.availableForDirectCheckout ||
    !product.titleId ||
    salePriceCents == null ||
    !product.currency ||
    !product.provider ||
    (product.provider === "lulu" && (!product.podPackageId || !product.interiorUrl || !product.coverUrl))
  ) {
    return NextResponse.json(
      { error: "Direct checkout is not enabled for this edition." },
      { status: 409 }
    );
  }

  if (!validAddress(body.address) || !body.shippingLevel) {
    return NextResponse.json(
      { error: "Shipping address and shipping level are required." },
      { status: 400 }
    );
  }

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
    return NextResponse.json(
      { error: "Quantity must be between 1 and 20." },
      { status: 400 }
    );
  }

  const provider = getFulfillmentProvider(product);
  const quote = await provider.quoteShipping(product, quantity, body.address);

  if (!quote.ok) {
    return NextResponse.json({ code: quote.code, error: quote.message }, { status: 409 });
  }

  const shipping = quote.options.find((option) => option.level === body.shippingLevel);
  if (!shipping) {
    return NextResponse.json(
      { error: "The selected shipping option is no longer available." },
      { status: 409 }
    );
  }

  const orderId = crypto.randomUUID();
  const idempotencyKey = orderId + ":square-checkout";
  const configuredAppUrl = (process.env.APP_URL || request.nextUrl.origin).replace(/\/$/, "");
  const appUrl = configuredAppUrl.endsWith("/store")
    ? configuredAppUrl
    : configuredAppUrl + "/store";

  try {
    const supabase = getSupabaseAdmin();

    const { error: insertError } = await supabase.from("commerce_orders").insert({
      id: orderId,
      title_id: product.titleId,
      product_slug: product.slug,
      provider: product.provider,
      provider_project_id: product.providerProjectId ?? null,
      stripe_product_id: null,
      stripe_price_id: null,
      customer_email: body.address.email,
      shipping_address: body.address,
      quantity,
      book_subtotal_cents: salePriceCents * quantity,
      shipping_amount_cents: shipping.amountCents,
      currency: product.currency,
      shipping_level: shipping.level,
      quote_payload: shipping.raw ?? shipping,
      status: "QUOTED",
      idempotency_key: idempotencyKey,
      payment_processor: "square",
    });

    if (insertError) throw insertError;

    const paymentLink = await createSquarePaymentLink({
      product,
      quantity,
      shippingAmountCents: shipping.amountCents,
      shippingLabel: shipping.label,
      address: body.address,
      orderId,
      appUrl,
      idempotencyKey,
    });

    const { error: updateError } = await supabase
      .from("commerce_orders")
      .update({
        square_payment_link_id: paymentLink.paymentLinkId,
        square_order_id: paymentLink.squareOrderId,
        payment_session_id: paymentLink.paymentLinkId,
        status: "CHECKOUT_CREATED",
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (updateError) throw updateError;

    return NextResponse.json({ checkoutUrl: paymentLink.url, orderId });
  } catch (error) {
    console.error("[store square checkout]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout could not be created." },
      { status: 503 }
    );
  }
}
