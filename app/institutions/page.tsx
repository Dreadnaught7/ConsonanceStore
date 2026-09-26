import Link from "next/link";
import { getStoreProducts } from "@/lib/store-products";

export const metadata = {
  title: "Booksellers, Libraries & Classrooms | Consonance Publishing",
  description:
    "Ordering, review-copy, collection-development, classroom, bulk-order, and institutional information for Consonance Publishing.",
};

const pathways = [
  {
    title: "Booksellers",
    copy:
      "Title consideration, local-interest placement, independent-store discovery, and bulk or event-order inquiries are welcome. We can provide covers, metadata, review materials, and title-specific sell sheets.",
    subject: "Consonance Publishing bookseller inquiry",
  },
  {
    title: "Libraries",
    copy:
      "Public, academic, special-collection, genealogy, and Black-studies libraries may request title information, digital review copies, collection-development materials, and research context.",
    subject: "Consonance Publishing library inquiry",
  },
  {
    title: "Faculty + classrooms",
    copy:
      "Desk-copy requests, sample chapters, reading-list consideration, course adoption, teaching context, and classroom discussion materials are available for relevant titles.",
    subject: "Consonance Publishing classroom or desk-copy request",
  },
  {
    title: "Institutions + bulk",
    copy:
      "Museums, archives, cultural organizations, nonprofits, book clubs, and educational programs may inquire about bulk orders, curated title sets, research-centered programming, or licensing.",
    subject: "Consonance Publishing institutional inquiry",
  },
];

export default function InstitutionalPage() {
  const books = getStoreProducts();

  return (
    <main className="press-page">
      <div className="press-shell">
        <Link className="back-link" href="/">← Back to Consonance Publishing</Link>

        <header className="press-hero">
          <p className="eyebrow">BOOKSELLERS · LIBRARIES · CLASSROOMS</p>
          <h1>Make the books easy to acquire, evaluate, and use.</h1>
          <p>
            Consonance Publishing works with independent booksellers, public and academic libraries,
            faculty, archives, museums, cultural organizations, and other institutions. The goal is
            simple: give professional buyers and educators the information they need without making
            them hunt for it.
          </p>
          <div className="press-actions">
            <a
              className="button primary"
              href="mailto:EJFinkley@ConsonanceIntelligence.com?subject=Consonance%20Publishing%20institutional%20inquiry"
            >
              Start an institutional inquiry
            </a>
            <a className="button ghost" href="/store/press/Consonance_Publishing_Media_Kit_2026.pdf">
              Download publishing kit ↓
            </a>
          </div>
        </header>

        <section className="press-grid">
          {pathways.map((pathway) => (
            <article key={pathway.title}>
              <h3>{pathway.title}</h3>
              <p>{pathway.copy}</p>
              <a
                href={
                  "mailto:EJFinkley@ConsonanceIntelligence.com?subject=" +
                  encodeURIComponent(pathway.subject)
                }
              >
                Request materials →
              </a>
            </article>
          ))}
        </section>

        <section className="press-section">
          <p className="eyebrow">CURRENT CATALOG</p>
          <h2>{books.length} titles available for consideration.</h2>
          <div className="press-catalog">
            {books.map((book) => (
              <Link key={book.slug} href={"/books/" + book.slug}>
                <strong>{book.name}</strong>
                {book.subtitle ? <span>{book.subtitle}</span> : null}
                <small>
                  {book.format}
                  {book.pageCount ? " · " + book.pageCount + " pages" : ""}
                  {book.isbn ? " · ISBN " + book.isbn : ""}
                </small>
              </Link>
            ))}
          </div>
        </section>

        <section className="press-grid press-grid-contact">
          <article>
            <h3>Review + desk copies</h3>
            <p>
              Digital review and desk copies are available selectively for reviewers, librarians,
              faculty, booksellers, and institutional evaluators. Honest evaluation only; no requested outcome.
            </p>
          </article>
          <article>
            <h3>Course adoption</h3>
            <p>
              Relevant titles may be considered for African American Studies, history, public history,
              genealogy, urban studies, archival studies, digital humanities, literature, and related courses.
            </p>
          </article>
          <article>
            <h3>Collection development</h3>
            <p>
              We can provide title metadata, cover files, descriptions, sample material, subject fit,
              and direct ordering information for collection-development review.
            </p>
          </article>
          <article>
            <h3>Contact</h3>
            <p>
              <a href="mailto:EJFinkley@ConsonanceIntelligence.com">
                EJFinkley@ConsonanceIntelligence.com
              </a>
              <br />
              EJFinkley Holdings Inc. / Consonance Publishing
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
