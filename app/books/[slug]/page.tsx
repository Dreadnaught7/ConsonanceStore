import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, STORE_PRODUCTS } from "@/lib/catalog";

export function generateStaticParams() {
  return STORE_PRODUCTS.map((book) => ({ slug: book.slug }));
}

export default function BookPage({ params }: { params: { slug: string } }) {
  const book = getProduct(params.slug);
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

          {book.buyButtonId ? (
            <div className={"lulu-native-button product-native " + (book.buyButtonVariant === "product-showcase" ? "showcase" : "compact")}>
              {React.createElement("lulu-buy-button", {
                "buy-button-id": book.buyButtonId,
                variant: book.buyButtonVariant || "button-only",
              })}
              <a className="native-fallback-link" href={book.checkoutUrl} target="_blank" rel="noreferrer">
                Open direct checkout ↗
              </a>
            </div>
          ) : (
            <a
              className="product-buy"
              href={book.checkoutUrl}
              target="_blank"
              rel="noreferrer"
            >
              Buy direct ↗
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
