import { notFound } from "next/navigation";
import { getProduct, STORE_PRODUCTS } from "@/lib/catalog";
import { storeAsset } from "@/lib/store-asset";
import BuyLink from "./BuyLink";

export function generateStaticParams() {
  return STORE_PRODUCTS.map((book) => ({ slug: book.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const book = getProduct(params.slug);
  if (!book) return {};
  return {
    title: `${book.name} | Consonance Publishing`,
    description: book.description.split("\n")[0],
    openGraph: {
      title: book.name,
      description: book.description.split("\n")[0],
      images: book.coverImage ? [storeAsset(book.coverImage)] : [],
    },
  };
}

export default function BookPage({ params }: { params: { slug: string } }) {
  const book = getProduct(params.slug);
  if (!book) notFound();
  const uncrossed = book.slug === "uncrossed";

  return (
    <main className="book-detail-page">
      <div className="book-detail-shell">
        <a className="book-detail-back" href="/store">← All books</a>
        {uncrossed ? (
          <div className="book-campaign-kicker">CONSONANCE FICTION · SUPERNATURAL HORROR</div>
        ) : null}
        <section className="book-detail-grid">
          <div className="book-detail-cover-wrap">
            {book.coverImage ? <img className="book-detail-cover" src={storeAsset(book.coverImage)} alt={book.name} /> : null}
          </div>
          <div className="book-detail-copy">
            {uncrossed ? <p className="book-campaign-hook">THE DEAD WERE NEVER GONE.<br />THEY WERE UNNAMED.</p> : null}
            <h1>{book.name}</h1>
            {book.subtitle ? <h2>{book.subtitle}</h2> : null}
            <p className="book-detail-meta">{book.format}</p>
            <div className="book-detail-description">
              {book.description.split("\n\n").map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="book-detail-actions">
              <BuyLink slug={book.slug} href={book.checkoutUrl} />
              <span>{book.priceLabel}</span>
            </div>
            {uncrossed ? (
              <p className="book-campaign-note">Genealogy opens the door. Memory brings them through.</p>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
