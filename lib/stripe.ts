import crypto from "node:crypto";

function stripeSecret() {
  const value = process.env.STRIPE_SECRET_KEY;
  if (!value) throw new Error("STRIPE_SECRET_KEY is not configured.");
  return value;
}

export async function createCheckoutSession(args: {
  priceId: string;
  quantity: number;
  shippingAmountCents: number;
  shippingLabel: string;
  customerEmail: string;
  orderId: string;
  titleId: string;
  appUrl: string;
  productSlug: string;
  idempotencyKey: string;
}) {
  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("line_items[0][price]", args.priceId);
  body.set("line_items[0][quantity]", String(args.quantity));
  body.set("line_items[1][price_data][currency]", "usd");
  body.set("line_items[1][price_data][unit_amount]", String(args.shippingAmountCents));
  body.set("line_items[1][price_data][product_data][name]", args.shippingLabel);
  body.set("line_items[1][quantity]", "1");
  body.set("customer_email", args.customerEmail);
  body.set("success_url", `${args.appUrl.replace(/\/$/, "")}/success?session_id={CHECKOUT_SESSION_ID}`);
  body.set("cancel_url", `${args.appUrl.replace(/\/$/, "")}/books/${encodeURIComponent(args.productSlug)}?canceled=1`);
  body.set("metadata[order_id]", args.orderId);
  body.set("metadata[title_id]", args.titleId);
  body.set("payment_intent_data[metadata][order_id]", args.orderId);
  body.set("payment_intent_data[metadata][title_id]", args.titleId);

  if (process.env.STRIPE_AUTOMATIC_TAX === "true") {
    body.set("automatic_tax[enabled]", "true");
  }

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecret()}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Idempotency-Key": args.idempotencyKey,
    },
    body,
    cache: "no-store",
  });

  const data = (await response.json()) as {
    id?: string;
    url?: string;
    error?: { message?: string };
  };

  if (!response.ok || !data.id || !data.url) {
    throw new Error(data.error?.message || "Stripe Checkout Session creation failed.");
  }

  return data;
}

export function verifyStripeWebhook(rawBody: string, signatureHeader: string | null) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET is not configured.");
  if (!signatureHeader) return false;

  const parts = signatureHeader.split(",");
  const timestamp = parts.map((part) => part.trim().split("=")).find(([k]) => k === "t")?.[1];
  const signatures = parts
    .map((part) => part.trim().split("="))
    .filter(([k]) => k === "v1")
    .map(([, value]) => value);

  if (!timestamp || !signatures.length) return false;

  const age = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`, "utf8")
    .digest("hex");

  return signatures.some((candidate) => {
    try {
      return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(candidate, "hex"));
    } catch {
      return false;
    }
  });
}
