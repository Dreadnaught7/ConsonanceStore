"use client";

import { FormEvent, useState } from "react";

const OPTIONS = [
  ["all_releases", "All releases"],
  ["history_investigations", "History & investigations"],
  ["black_history_genealogy", "Black history & genealogy"],
  ["nyc_place", "NYC & place"],
  ["fiction_vnari", "Fiction & V’Nari"],
] as const;

export function NewsletterSignup() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus("");

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const interests = OPTIONS.filter(([value]) => form.get(value) === "on").map(([value]) => value);

    const response = await fetch("/store/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, interests: interests.length ? interests : ["all_releases"] }),
    });

    const data = await response.json().catch(() => ({}));
    setBusy(false);
    setStatus(response.ok ? "You’re on the list. We’ll send the work, not noise." : data?.error || "Could not subscribe right now.");
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <form className="newsletter-form" onSubmit={submit}>
      <label className="newsletter-email">
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required placeholder="reader@example.com" />
      </label>
      <fieldset>
        <legend>What should we send you?</legend>
        <div className="newsletter-options">
          {OPTIONS.map(([value, label], index) => (
            <label key={value}>
              <input type="checkbox" name={value} defaultChecked={index === 0} />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <button className="button primary" type="submit" disabled={busy}>
        {busy ? "Joining…" : "Join the reader list →"}
      </button>
      {status ? <p className="newsletter-form-status" aria-live="polite">{status}</p> : null}
      <small>No daily churn. Release news, archive discoveries, excerpts, and useful context.</small>
    </form>
  );
}