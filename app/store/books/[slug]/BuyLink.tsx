"use client";

import { useEffect } from "react";

function campaignParams() {
  if (typeof window === "undefined") return {};
  const q = new URLSearchParams(window.location.search);
  return {
    source: q.get("utm_source") || q.get("source") || "direct",
    medium: q.get("utm_medium") || "",
    campaign: q.get("utm_campaign") || "",
  };
}

function record(event: string, slug: string) {
  const payload = JSON.stringify({ event, slug, ...campaignParams(), path: window.location.pathname, at: new Date().toISOString() });
  try {
    const existing = JSON.parse(localStorage.getItem("consonance_book_events") || "[]");
    existing.push(JSON.parse(payload));
    localStorage.setItem("consonance_book_events", JSON.stringify(existing.slice(-100)));
  } catch {}
}

export default function BuyLink({ slug, href }: { slug: string; href: string }) {
  useEffect(() => { record("book_page_view", slug); }, [slug]);
  return (
    <a
      className="book-detail-buy"
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => record("book_buy_click", slug)}
    >
      Buy the book →
    </a>
  );
}
