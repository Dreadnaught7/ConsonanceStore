import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support the Work",
  description:
    "Support Consonance independent research, archival work, public-access projects, technology infrastructure, and publishing.",
  alternates: { canonical: "https://consonanceintelligence.com/store/support" },
};

export default function SupportPage({
  searchParams,
}: {
  searchParams: { thanks?: string; error?: string };
}) {
  const thanked = searchParams?.thanks === "1";
  const error = searchParams?.error;
  return (
    <main className="product-page">
      <Link href="/" className="back-link">← Back to store</Link>

      <section className="product-direct">
        <span className="product-kicker">SUPPORT CONSONANCE</span>
        <h1>Help keep the work moving.</h1>
        <p className="product-subtitle">
          Independent research, archives, publishing, and public tools all take infrastructure,
          time, records, and room to keep building.
        </p>

        <div className="product-description">
          {thanked ? (
            <p><strong>Thank you.</strong> Your support helps Consonance keep researching, preserving, building, and publishing.</p>
          ) : null}

          {error === "amount" ? (
            <p>Please choose an amount between $5 and $5,000.</p>
          ) : error === "checkout" ? (
            <p>Square checkout could not be opened. Please try again in a moment.</p>
          ) : null}

          <p>
            Support helps fund archival acquisition and preservation, Observatory and API
            infrastructure, records-based investigations, public-access research, independent
            publishing, and the systems required to keep Consonance projects available and growing.
          </p>

          <p>
            This is support for the work of EJFinkley Holdings Inc. / Consonance. It is not
            represented as a charitable or tax-deductible donation.
          </p>

          <form action="https://consonance-commerce.ericjfinkley.workers.dev/support" method="post" style={{ marginTop: "30px" }}>
              <p className="product-kicker">CHOOSE AN AMOUNT</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", margin: "14px 0 24px" }}>
                {[10, 25, 50, 100, 250].map((amount) => (
                  <button
                    className="button primary"
                    type="submit"
                    name="amount"
                    value={amount}
                    key={amount}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "end" }}>
                <label style={{ display: "grid", gap: "8px", minWidth: "220px" }}>
                  <span>Other amount (USD)</span>
                  <input
                    name="amount"
                    type="number"
                    min="5"
                    max="5000"
                    step="1"
                    placeholder="75"
                    style={{
                      minHeight: "44px",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,.16)",
                      background: "#0d1218",
                      color: "inherit",
                      padding: "0 14px",
                    }}
                  />
                </label>
                <button className="button primary" type="submit">Continue to Square →</button>
              </div>
            </form>

          <p style={{ marginTop: "30px" }}>
            Prefer to support by buying a book? <Link href="/#books">Browse the current catalog →</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
