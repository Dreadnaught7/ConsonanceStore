import { NextRequest, NextResponse } from "next/server";
import { verifySquareWebhook } from "@/lib/square";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-square-hmacsha256-signature");

  try {
    if (!verifySquareWebhook(rawBody, signature)) {
      return NextResponse.json({ error: "Invalid Square signature." }, { status: 403 });
    }
  } catch (error) {
    console.error("[square webhook config]", error);
    return NextResponse.json({ error: "Webhook configuration error." }, { status: 503 });
  }

  const event = JSON.parse(rawBody);
  if (!event?.event_id) {
    return NextResponse.json({ error: "Square event ID is missing." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("commerce_webhook_events").insert({
    id: event.event_id,
    event_type: event.type || "square.unknown",
    payload: event,
  });

  if (error && error.code !== "23505") {
    console.error("[square webhook persistence]", error);
    return NextResponse.json({ error: "Webhook persistence failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true, duplicate: error?.code === "23505" });
}
