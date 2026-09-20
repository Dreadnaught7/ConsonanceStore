import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, formatMoney, STORE_PRODUCTS } from "@/lib/catalog";
import BuyForm from "@/components/BuyForm";

export function generateStaticParams() {
  return STORE_PRODUCTS.map((book) => ({ slug: book.slug }));
}

export default function BookPage({ params }: { params: { slug: string } }) {
  const book = getProduct(params.slug);
  if (!book) notFound();

  return (
    <main className="shell product-page">
      <Link href="/" className="back-link">← Back to books</Link>
      <div className="product-grid">
        <div className="book-cover large" aria-hidden="true">
          <span>CONSONANCE</span>
          <strong>{book.name}</strong>
        </div>

        <section>
          <p className="eyebrow">{book.format}</p>
          <h1>{book.name}</h1>
          {book.subtitle ? <p className="product-subtitle">{book.subtitle}</p> : null}
          <p className="product-description">{book.description}</p>
          {book.isbn ? <p className="metadata">ISBN {book.isbn}</p> : null}
          <p className="product-price">{formatMoney(book.priceCents)}</p>

          {book.availableForDirectCheckout ? (
            <BuyForm slug={book.slug} priceCents={book.priceCents} />
          ) : (
            <div className="notice">
              <strong>Direct checkout is not enabled for this edition yet.</strong>
              <p>This listing is live in the catalog while direct fulfillment is completed.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
