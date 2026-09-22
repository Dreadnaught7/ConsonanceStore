import { NextResponse } from "next/server";
import { getStoreProducts } from "@/lib/store-products";

export const runtime = "nodejs";

export async function GET() {
  const products = getStoreProducts();
  const stripeReady = products.filter(
    (book) =>
      Boolean(book.stripeProductId) &&
      Boolean(book.stripePriceId) &&
      book.priceCents != null &&
      Boolean(book.currency)
  );
  const autoFulfillmentReady = products.filter(
    (book) =>
      book.availableForDirectCheckout &&
      book.provider === "lulu" &&
      Boolean(book.podPackageId) &&
      Boolean(book.interiorUrl) &&
      Boolean(book.coverUrl)
  );

  return NextResponse.json({
    app: "consonance-store",
    ok: true,
    catalog: {
      total: products.length,
      stripeReady: stripeReady.length,
      autoFulfillmentReady: autoFulfillmentReady.length,
      pendingAutoFulfillment: products
        .filter((book) => !autoFulfillmentReady.includes(book))
        .map((book) => book.slug),
    },
    environment: {
      supabaseUrl: Boolean(process.env.SUPABASE_URL),
      supabaseServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      stripeSecret: Boolean(process.env.STRIPE_SECRET_KEY),
      stripeWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
      luluBaseUrl: Boolean(process.env.LULU_API_BASE_URL),
      luluClientKey: Boolean(process.env.LULU_CLIENT_KEY),
      luluClientSecret: Boolean(process.env.LULU_CLIENT_SECRET),
      luluContactEmail: Boolean(process.env.LULU_CONTACT_EMAIL),
      appUrl: Boolean(process.env.APP_URL),
      autoFulfillment: process.env.LULU_AUTO_FULFILLMENT_ENABLED === "true",
    },
  });
}
