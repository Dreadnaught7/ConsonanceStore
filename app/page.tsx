import Link from "next/link";
import { STORE_PRODUCTS, formatMoney } from "@/lib/catalog";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="shell">
          <p className="eyebrow">CONSONANCE PUBLISHING</p>
          <h1>Books built to hold the record.</h1>
          <p className="hero-copy">
            Direct editions from Consonance Publishing. Independent work, documented history,
            and original worlds sold from the source.
          </p>
        </div>
      </section>

      <section className="shell catalog-section">
        <div className="section-heading">
          <p className="eyebrow">CURRENT CATALOG</p>
          <h2>Available editions</h2>
        </div>

        <div className="book-grid">
          {STORE_PRODUCTS.map((book) => (
            <article className="book-card" key={book.slug}>
              <div className="book-cover" aria-hidden="true">
                <span>CONSONANCE</span>
                <strong>{book.name}</strong>
              </div>
              <div className="book-card-copy">
                <p className="format">{book.format}</p>
                <h3>{book.name}</h3>
                {book.subtitle ? <p className="subtitle">{book.subtitle}</p> : null}
                <p>{book.description}</p>
                <div className="book-card-bottom">
                  <strong className="price">{formatMoney(book.priceCents)}</strong>
                  <Link className="button" href={"/books/" + book.slug}>
                    View edition
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
