import React from "react";
import BuyForm from "@/components/BuyForm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getStoreProduct, getStoreProducts } from "@/lib/store-products";

export function generateStaticParams() {
  return getStoreProducts().map((book) => ({ slug: book.slug }));
}

export default function BookPage({ params }: { params: { slug: string } }) {
  const book = getStoreProduct(params.slug);
  if (!book) notFound();

  return (
    <main className="product-page">
      <Link href="/" className="back-link">← Back to store</Link>

      <section className="product-detail-grid">
        <div className="product-cover-stage">
          <img
            className="product-cover-art"
            src={book.coverImage}
            alt={"Cover of " + book.name}
          />
        </div>

        <div className="product-direct">
          <span className="product-kicker">{book.format}</span>
          <h1>{book.name}</h1>
          {book.subtitle ? <p className="product-subtitle">{book.subtitle}</p> : null}
          <p className="product-description">{book.description}</p>

          <div className="product-meta-row">
            <span>Eric J. Finkley</span>
            <strong>{book.priceLabel}</strong>
          </div>

          {book.availableForDirectCheckout && book.priceCents != null && book.stripePriceId ? (
            <div className="consonance-checkout">
              <BuyForm slug={book.slug} priceCents={book.priceCents} />
              <p className="checkout-note">Secure payment by Stripe. Printing and shipping are fulfilled through Lulu.</p>
            </div>
          ) : book.buyButtonId ? (
            <div className={"lulu-native-button product-native " + (book.buyButtonVariant === "product-showcase" ? "showcase" : "compact")}>
              {React.createElement("lulu-buy-button", {
                "buy-button-id": book.buyButtonId,
                variant: book.buyButtonVariant || "button-only",
              })}
              <a className="native-fallback-link" href={book.checkoutUrl} target="_blank" rel="noreferrer">
                Open Lulu checkout ↗
              </a>
            </div>
          ) : (
            <a
              className="product-buy"
              href={book.checkoutUrl}
              target="_blank"
              rel="noreferrer"
            >
              Buy through Lulu ↗
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
