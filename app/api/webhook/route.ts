import { NextRequest, NextResponse } from "next/server";
import { verifyStripeWebhook } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { getStoreProduct } from "@/lib/store-products";
import { submitLuluPrintJob } from "@/lib/lulu";
import type { ShippingAddress } from "@/lib/types";
import { sendOrderNotification } from "@/lib/order-notifications";

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

    if (process.env.LULU_AUTO_FULFILLMENT_ENABLED === "true") {
      const { data: order, error: orderError } = await supabase
        .from("commerce_orders")
        .select("id, product_slug, provider, provider_order_id, status, shipping_address, shipping_level, quantity")
        .eq("id", orderId)
        .maybeSingle();

      if (orderError || !order) {
        console.error("[store fulfillment order read]", orderError);
        return NextResponse.json({ error: "Paid order could not be loaded." }, { status: 500 });
      }

      if (order.provider === "lulu" && !order.provider_order_id) {
        const product = getStoreProduct(order.product_slug);

        if (!product) {
          await supabase
            .from("commerce_orders")
            .update({
              status: "FAILED",
              failure_reason: "Store product configuration not found after payment.",
              updated_at: new Date().toISOString(),
            })
            .eq("id", orderId);
          return NextResponse.json({ error: "Fulfillment product configuration missing." }, { status: 500 });
        }

        try {
          const printJob = await submitLuluPrintJob({
            product,
            quantity: order.quantity,
            address: order.shipping_address as ShippingAddress,
            shippingLevel: order.shipping_level,
            externalId: order.id,
          });

          await supabase
            .from("commerce_orders")
            .update({
              provider_order_id: String(printJob.id),
              status: "FULFILLMENT_SUBMITTED",
              failure_reason: null,
              updated_at: new Date().toISOString(),
            })
            .eq("id", orderId);
        } catch (fulfillmentError) {
          console.error("[lulu fulfillment]", fulfillmentError);
          await supabase
            .from("commerce_orders")
            .update({
              status: "FAILED",
              failure_reason:
                fulfillmentError instanceof Error
                  ? fulfillmentError.message
                  : "Lulu fulfillment failed after payment.",
              updated_at: new Date().toISOString(),
            })
            .eq("id", orderId);

          return NextResponse.json(
            { error: "Payment was recorded, but fulfillment submission failed." },
            { status: 500 }
          );
        }
      }
    }
  }

  if (confirmedPaid && !duplicate) {
    try {
      const { data: notificationOrder, error: notificationOrderError } = await supabase
        .from("commerce_orders")
        .select("id, product_slug, quantity, book_subtotal_cents, shipping_amount_cents, currency, customer_email, status, provider_order_id")
        .eq("id", orderId)
        .maybeSingle();

      if (notificationOrderError || !notificationOrder) {
        console.error("[order notification order read]", notificationOrderError);
      } else {
        const product = getStoreProduct(notificationOrder.product_slug);
        await sendOrderNotification({
          orderId: notificationOrder.id,
          bookName: product?.name || notificationOrder.product_slug,
          quantity: notificationOrder.quantity,
          bookSubtotalCents: notificationOrder.book_subtotal_cents,
          shippingAmountCents: notificationOrder.shipping_amount_cents,
          currency: notificationOrder.currency,
          customerEmail: notificationOrder.customer_email,
          fulfillmentStatus: notificationOrder.status,
          providerOrderId: notificationOrder.provider_order_id,
        });
      }
    } catch (notificationError) {
      // Never fail a paid order because an owner notification could not be sent.
      console.error("[order notification]", notificationError);
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
