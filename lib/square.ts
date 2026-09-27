import crypto from "node:crypto";
import type { StoreProduct } from "@/lib/catalog";
import type { ShippingAddress } from "@/lib/types";

const DEFAULT_BASE_URL = "https://connect.squareup.com";
const DEFAULT_VERSION = "2026-09-16";

function squareBaseUrl() {
  return (process.env.SQUARE_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, "");
}

function squareAccessToken() {
  const value = process.env.SQUARE_ACCESS_TOKEN;
  if (!value) throw new Error("SQUARE_ACCESS_TOKEN is not configured.");
  return value;
}

function squareLocationId() {
  const value = process.env.SQUARE_LOCATION_ID;
  if (!value) throw new Error("SQUARE_LOCATION_ID is not configured.");
  return value;
}

function squareVersion() {
  return process.env.SQUARE_API_VERSION || DEFAULT_VERSION;
}

async function squareFetch(path: string, init: RequestInit) {
  const response = await fetch(squareBaseUrl() + path, {
    ...init,
    headers: {
      Authorization: `Bearer ${squareAccessToken()}`,
      "Square-Version": squareVersion(),
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message =
      Array.isArray(data?.errors) && data.errors.length
        ? data.errors.map((item: { detail?: string; code?: string }) => item.detail || item.code).join("; ")
        : `Square API request failed (${response.status}).`;
    throw new Error(message);
  }
  return data;
}

export async function createSquarePaymentLink(args: {
  product: StoreProduct;
  quantity: number;
  shippingAmountCents: number;
  shippingLabel: string;
  address: ShippingAddress;
  orderId: string;
  appUrl: string;
  idempotencyKey: string;
}) {
  const unitPrice = args.product.readerPriceCents ?? args.product.priceCents;
  if (unitPrice == null) throw new Error("Reader price is not configured for this title.");

  const body = {
    idempotency_key: args.idempotencyKey,
    description: `Consonance Publishing order ${args.orderId}`,
    payment_note: `Consonance order ${args.orderId}`,
    order: {
      location_id: squareLocationId(),
      reference_id: args.orderId,
      line_items: [
        {
          name: args.product.name,
          quantity: String(args.quantity),
          base_price_money: { amount: unitPrice, currency: "USD" },
        },
        {
          name: `Shipping — ${args.shippingLabel}`,
          quantity: "1",
          base_price_money: { amount: args.shippingAmountCents, currency: "USD" },
        },
      ],
      pricing_options: {
        auto_apply_taxes: true,
      },
    },
    checkout_options: {
      ask_for_shipping_address: true,
      allow_tipping: false,
      redirect_url: `${args.appUrl.replace(/\/$/, "")}/success?order_id=${encodeURIComponent(args.orderId)}`,
    },
    pre_populated_data: {
      buyer_email: args.address.email,
      buyer_phone_number: args.address.phone,
      buyer_address: {
        address_line_1: args.address.street1,
        ...(args.address.street2 ? { address_line_2: args.address.street2 } : {}),
        locality: args.address.city,
        ...(args.address.state ? { administrative_district_level_1: args.address.state } : {}),
        postal_code: args.address.postcode,
        country: args.address.country.toUpperCase(),
      },
    },
  };

  const data = await squareFetch("/v2/online-checkout/payment-links", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const link = data?.payment_link;
  if (!link?.id || !link?.order_id || !link?.url) {
    throw new Error("Square did not return a usable payment link.");
  }

  return {
    paymentLinkId: String(link.id),
    squareOrderId: String(link.order_id),
    url: String(link.url),
  };
}

export function verifySquareWebhook(rawBody: string, signatureHeader: string | null) {
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  const notificationUrl = process.env.SQUARE_WEBHOOK_NOTIFICATION_URL;
  if (!signatureKey) throw new Error("SQUARE_WEBHOOK_SIGNATURE_KEY is not configured.");
  if (!notificationUrl) throw new Error("SQUARE_WEBHOOK_NOTIFICATION_URL is not configured.");
  if (!signatureHeader) return false;

  const expected = crypto
    .createHmac("sha256", signatureKey)
    .update(notificationUrl + rawBody, "utf8")
    .digest("base64");

  const expectedBuffer = Buffer.from(expected);
  const candidateBuffer = Buffer.from(signatureHeader);
  if (expectedBuffer.length !== candidateBuffer.length) return false;
  return crypto.timingSafeEqual(expectedBuffer, candidateBuffer);
}
