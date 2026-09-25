import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const ALLOWED = new Set([
  "all_releases",
  "history_investigations",
  "black_history_genealogy",
  "nyc_place",
  "fiction_vnari",
]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const interests = Array.isArray(body?.interests)
      ? body.interests.map(String).filter((value: string) => ALLOWED.has(value))
      : [];

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("publishing_newsletter_subscribers")
      .upsert(
        {
          email,
          interests: interests.length ? interests : ["all_releases"],
          source: "consonance_storefront",
          status: "subscribed",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      );

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[publishing newsletter]", error);
    return NextResponse.json({ error: "Could not subscribe right now." }, { status: 500 });
  }
}