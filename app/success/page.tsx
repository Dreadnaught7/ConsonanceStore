"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type OrderState = {
  ok: boolean;
  order?: {
    id: string;
    status: string;
    kind: string;
    title: string;
    created_at: string;
    updated_at: string;
    fulfillment_submitted: boolean;
    fulfillment_error: boolean;
  };
};

const COMMERCE_BASE = "https://consonance-commerce.ericjfinkley.workers.dev";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = useMemo(() => searchParams.get("order_id") || "", [searchParams]);
  const [state, setState] = useState<OrderState | null>(null);

  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;
    const check = async () => {
      try {
        const response = await fetch(`${COMMERCE_BASE}/order/${encodeURIComponent(orderId)}/status`, {
          cache: "no-store",
        });
        const data = await response.json();
        if (!cancelled) setState(data);
      } catch {
        if (!cancelled) setState({ ok: false });
      }
    };
    check();
    const timer = window.setInterval(check, 4000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [orderId]);

  const status = state?.order?.status;
  const paid = status === "PAID" || status === "FULFILLMENT_SUBMITTED";
  const fulfilled = status === "FULFILLMENT_SUBMITTED";
  const fulfillmentError = status === "FULFILLMENT_ERROR";

  return (
    <main className="shell status-page">
      <p className="eyebrow">{paid ? "PAYMENT CONFIRMED" : "ORDER RECEIVED"}</p>
      <h1>{fulfilled ? "Your book is in fulfillment." : "Thank you."}</h1>

      {!orderId ? (
        <p>Your order was returned from checkout, but no order reference was included. Keep your Square receipt for your records.</p>
      ) : fulfillmentError ? (
        <>
          <p>Your payment was recorded, but automatic fulfillment needs attention. Your order is not lost.</p>
          <p>Order reference: <strong>{orderId}</strong></p>
        </>
      ) : fulfilled ? (
        <>
          <p>Your payment was confirmed and the print order has been submitted for fulfillment.</p>
          <p>Order reference: <strong>{orderId}</strong></p>
        </>
      ) : paid ? (
        <>
          <p>Your payment was confirmed. Fulfillment is being submitted now.</p>
          <p>Order reference: <strong>{orderId}</strong></p>
        </>
      ) : (
        <>
          <p>Your payment confirmation is being recorded. This page checks the order automatically.</p>
          <p>Order reference: <strong>{orderId}</strong></p>
        </>
      )}

      <Link href="/" className="button">Return to the store</Link>
    </main>
  );
}
