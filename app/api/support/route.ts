import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

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

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const raw = String(form.get("amount") || "").trim();
    const amount = Number(raw);

    if (!Number.isFinite(amount) || amount < 5 || amount > 5000) {
      return NextResponse.redirect(new URL("/store/support?error=amount", request.url), 303);
    }

    const amountCents = Math.round(amount * 100);
    const idempotencyKey = crypto.randomUUID();
    const appUrl = (process.env.APP_URL || request.nextUrl.origin).replace(/\/$/, "");
    const storeUrl = appUrl.endsWith("/store") ? appUrl : appUrl + "/store";

    const response = await fetch(squareBaseUrl() + "/v2/online-checkout/payment-links", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${squareAccessToken()}`,
        "Square-Version": process.env.SQUARE_API_VERSION || DEFAULT_VERSION,
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        idempotency_key: idempotencyKey,
        description: "Support Consonance independent research and publishing",
        payment_note: "Support Consonance",
        quick_pay: {
          name: "Support Consonance",
          price_money: { amount: amountCents, currency: "USD" },
          location_id: squareLocationId(),
        },
        checkout_options: {
          allow_tipping: false,
          redirect_url: storeUrl + "/support?thanks=1",
        },
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("[support square checkout]", data);
      return NextResponse.redirect(new URL("/store/support?error=checkout", request.url), 303);
    }

    const url = data?.payment_link?.url;
    if (!url) {
      return NextResponse.redirect(new URL("/store/support?error=checkout", request.url), 303);
    }

    return NextResponse.redirect(url, 303);
  } catch (error) {
    console.error("[support checkout]", error);
    return NextResponse.redirect(new URL("/store/support?error=checkout", request.url), 303);
  }
}
