import { NextRequest, NextResponse } from "next/server";
import { getStoreProduct } from "@/lib/store-products";
import { getFulfillmentProvider } from "@/lib/fulfillment";
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
  if (!product.availableForDirectCheckout) {
    return NextResponse.json({ error: "Direct checkout is not enabled for this edition." }, { status: 409 });
  }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
    return NextResponse.json({ error: "Quantity must be between 1 and 20." }, { status: 400 });
  }
  if (!validAddress(body.address)) {
    return NextResponse.json({ error: "A complete shipping address is required." }, { status: 400 });
  }

  const provider = getFulfillmentProvider(product);
  const quote = await provider.quoteShipping(product, quantity, body.address);

  if (!quote.ok) {
    return NextResponse.json(
      { code: quote.code, error: quote.message },
      { status: quote.code === "NOT_CONFIGURED" ? 409 : 502 }
    );
  }

  return NextResponse.json({
    product: {
      slug: product.slug,
      titleId: product.titleId,
      name: product.name,
      priceCents: product.priceCents,
      currency: product.currency,
    },
    quantity,
    options: quote.options,
  });
}
