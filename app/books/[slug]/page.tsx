import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getStoreProduct, getStoreProducts } from "@/lib/store-products";
import { storeAsset } from "@/lib/store-asset";

export function generateStaticParams() {
  return getStoreProducts().map((book) => ({ slug: book.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const book = getStoreProduct(params.slug);
  if (!book) return {};
  const title = book.subtitle ? `${book.name}: ${book.subtitle}` : book.name;
  const description = book.description.split(/\n\n+/)[0].slice(0, 220);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "book",
      images: book.coverImage && !book.coverImage.startsWith("data:") ? [storeAsset(book.coverImage)] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: book.coverImage && !book.coverImage.startsWith("data:") ? [storeAsset(book.coverImage)] : undefined,
    },
  };
}

export default function BookPage({ params }: { params: { slug: string } }) {
  const book = getStoreProduct(params.slug);
  if (!book) notFound();

  return (
    <main className="product-page">
      <Link href="/" className="back-link">← Back to store</Link>

      <section className="product-detail-grid">
        <div className="product-cover-stage">
          {book.coverImage ? (
            <img
              className="product-cover-art"
              src={storeAsset(book.coverImage)}
              alt={"Cover of " + book.name}
            />
          ) : book.buyButtonId ? (
            <div className="lulu-native-button product-native showcase">
              {React.createElement("lulu-buy-button", {
                "buy-button-id": book.buyButtonId,
                variant: "product-showcase",
              })}
            </div>
          ) : null}
        </div>

        <div className="product-direct">
          <span className="product-kicker">{book.format}</span>
          <h1>{book.name}</h1>
          {book.subtitle ? <p className="product-subtitle">{book.subtitle}</p> : null}
          <div className="product-description">
            {book.description.split(/\n\n+/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="product-meta-row">
            <span>Eric J. Finkley</span>
            <strong>{book.priceLabel}</strong>
          </div>

          <a
            className="product-buy"
            href={book.checkoutUrl}
            target="_blank"
            rel="noreferrer"
          >
            Buy through Lulu ↗
          </a>
        </div>
      </section>
    </main>
  );
}
