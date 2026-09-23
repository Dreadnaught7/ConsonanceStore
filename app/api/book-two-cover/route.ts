const COVER_URL = "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/ChatGPT%20Image%20Sep%2023,%202026,%2001_47_42%20PM.png";

export async function GET() {
  const response = await fetch(COVER_URL, { cache: "no-store" });
  if (!response.ok) return new Response("Cover unavailable", { status: response.status });
  const body = await response.arrayBuffer();
  return new Response(body, {
    headers: {
      "Content-Type": response.headers.get("content-type") || "image/png",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
