import { NextRequest, NextResponse } from "next/server";
import { verifyStripeWebhook } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

type StripeEvent = {
  id: string;
  type: string;
  data: {
    object: {
      id?: string;
      payment_intent?: string | null;
      payment_status?: string | null;
      metadata?: Record<string, string>;
    };
  };
};

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  try {
    if (!verifyStripeWebhook(rawBody, signature)) {
      return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 });
    }
  } catch (error) {
    console.error("[stripe webhook config]", error);
    return NextResponse.json({ error: "Webhook configuration error." }, { status: 503 });
  }

  const event = JSON.parse(rawBody) as StripeEvent;
  const supabase = getSupabaseAdmin();

  const { error: eventError } = await supabase.from("commerce_webhook_events").insert({
    id: event.id,
    event_type: event.type,
    payload: event,
  });

  const duplicate = eventError?.code === "23505";
  if (eventError && !duplicate) {
    console.error("[store webhook event insert]", eventError);
    return NextResponse.json({ error: "Webhook persistence failed." }, { status: 500 });
  }

  const session = event.data.object;
  const orderId = session.metadata?.order_id;
  if (!orderId) return NextResponse.json({ received: true, ignored: true });

  const confirmedPaid =
    event.type === "checkout.session.async_payment_succeeded" ||
    (event.type === "checkout.session.completed" && session.payment_status === "paid");

  if (confirmedPaid) {
    const { error } = await supabase
      .from("commerce_orders")
      .update({
        status: "PAID",
        stripe_session_id: session.id ?? null,
        stripe_payment_intent_id: session.payment_intent ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (error) {
      console.error("[store webhook paid update]", error);
      return NextResponse.json({ error: "Order update failed." }, { status: 500 });
    }
  }

  if (event.type === "checkout.session.expired") {
    await supabase
      .from("commerce_orders")
      .update({ status: "CANCELED", updated_at: new Date().toISOString() })
      .eq("id", orderId);
  }

  return NextResponse.json({ received: true, duplicate });
}
