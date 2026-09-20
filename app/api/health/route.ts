import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    app: "consonance-store",
    ok: true,
    environment: {
      supabaseUrl: Boolean(process.env.SUPABASE_URL),
      supabaseServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      stripeSecret: Boolean(process.env.STRIPE_SECRET_KEY),
      stripeWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
      luluBaseUrl: Boolean(process.env.LULU_API_BASE_URL),
      luluClientKey: Boolean(process.env.LULU_CLIENT_KEY),
      luluClientSecret: Boolean(process.env.LULU_CLIENT_SECRET),
      luluInteriorUrl: Boolean(process.env.LULU_AIR_WAS_SAFE_INTERIOR_URL),
      luluCoverUrl: Boolean(process.env.LULU_AIR_WAS_SAFE_COVER_URL),
      appUrl: Boolean(process.env.APP_URL),
      autoFulfillment: process.env.LULU_AUTO_FULFILLMENT_ENABLED === "true",
    },
  });
}
