import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    luluClientKey: Boolean(process.env.LULU_CLIENT_KEY),
    luluClientSecret: Boolean(process.env.LULU_CLIENT_SECRET),
    stripeSecret: Boolean(process.env.STRIPE_SECRET_KEY),
    stripeWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    supabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL),
    supabaseServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    luluAutoFulfillment: process.env.LULU_AUTO_FULFILLMENT_ENABLED === "true",
    appUrl: Boolean(process.env.APP_URL),
  });
}
