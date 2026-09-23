import { NextRequest, NextResponse } from "next/server";
import { getStoreProduct } from "@/lib/store-products";
import { getFulfillmentProvider } from "@/lib/fulfillment";
import { createCheckoutSession } from "@/lib/stripe";
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
    !product.availableForDirectCheckout ||
    !product.titleId ||
    product.priceCents == null ||
    !product.currency ||
    !product.stripeProductId ||
    !product.stripePriceId ||
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
  const idempotencyKey = orderId + ":checkout";
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
      stripe_product_id: product.stripeProductId,
      stripe_price_id: product.stripePriceId,
      customer_email: body.address.email,
      shipping_address: body.address,
      quantity,
      book_subtotal_cents: product.priceCents * quantity,
      shipping_amount_cents: shipping.amountCents,
      currency: product.currency,
      shipping_level: shipping.level,
      quote_payload: shipping.raw ?? shipping,
      status: "QUOTED",
      idempotency_key: idempotencyKey,
    });

    if (insertError) throw insertError;

    const session = await createCheckoutSession({
      priceId: product.stripePriceId,
      quantity,
      shippingAmountCents: shipping.amountCents,
      shippingLabel: "Shipping — " + shipping.label,
      customerEmail: body.address.email,
      orderId,
      titleId: product.titleId,
      appUrl,
      productSlug: product.slug,
      idempotencyKey,
    });

    const { error: updateError } = await supabase
      .from("commerce_orders")
      .update({
        stripe_session_id: session.id,
        status: "CHECKOUT_CREATED",
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (updateError) throw updateError;

    return NextResponse.json({ checkoutUrl: session.url, orderId });
  } catch (error) {
    console.error("[store checkout]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout could not be created." },
      { status: 503 }
    );
  }
}
