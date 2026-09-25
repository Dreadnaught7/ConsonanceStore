import Link from "next/link";
import { getStoreProducts } from "@/lib/store-products";

export const metadata = {
  title: "Press & Review Room | Consonance Publishing",
  description: "Media, review, library, classroom, rights, and institutional information for Consonance Publishing.",
};

const lanes = [
  {
    title: "WHO ARE WE?",
    copy: "Archival reconstruction, slavery and its descendants, genealogy, provenance, family continuity, and the human beings inside fragmented records.",
  },
  {
    title: "Before the Bullet",
    copy: "Documentary history centered on Fred Hampton, Martin Luther King Jr., and Malcolm X before assassination became the dominant frame.",
  },
  {
    title: "GROUNDS",
    copy: "Harlem and Bedford-Stuyvesant as living systems of migration, housing, culture, transit, institutions, memory, ownership, and change.",
  },
  {
    title: "Fiction + V’Nari",
    copy: "Speculative and contemporary fiction about memory, identity, relation, ancestry, bureaucracy, technology, family, and consequence.",
  },
];

export default function PressPage() {
  const books = getStoreProducts();

  return (
    <main className="press-page">
      <div className="press-shell">
        <Link className="back-link" href="/">← Back to Consonance Publishing</Link>

        <header className="press-hero">
          <p className="eyebrow">PRESS + REVIEW ROOM</p>
          <h1>The work is the story.</h1>
          <p>
            Consonance Publishing is an independent publishing imprint spanning documentary history,
            archival reconstruction, New York place-history, method, speculative fiction, and
            contemporary American fiction.
          </p>
          <div className="press-actions">
            <a className="button primary" href="/store/press/Consonance_Publishing_Media_Kit_2026.pdf">
              Download media kit ↓
            </a>
            <a className="button ghost" href="mailto:EJFinkley@ConsonanceIntelligence.com?subject=Consonance%20Publishing%20review%20or%20press%20request">
              Request review materials
            </a>
          </div>
        </header>

        <section className="press-section">
          <p className="eyebrow">PUBLICITY POSTURE</p>
          <h2>Work-centered by design.</h2>
          <p>
            Consonance does not operate as a personality-driven imprint. Written Q&A, project review,
            excerpts, source and methodology notes, review copies, library and classroom discussions,
            and focused institutional conversations are preferred. Live interviews are selective.
          </p>
        </section>

        <section className="press-grid">
          {lanes.map((lane) => (
            <article key={lane.title}>
              <h3>{lane.title}</h3>
              <p>{lane.copy}</p>
            </article>
          ))}
        </section>

        <section className="press-section">
          <p className="eyebrow">CURRENT CATALOG</p>
          <h2>{books.length} current titles.</h2>
          <div className="press-catalog">
            {books.map((book) => (
              <Link key={book.slug} href={"/books/" + book.slug}>
                <strong>{book.name}</strong>
                {book.subtitle ? <span>{book.subtitle}</span> : null}
                <small>{book.format}</small>
              </Link>
            ))}
          </div>
        </section>

        <section className="press-grid press-grid-contact">
          <article>
            <h3>Reviews</h3>
            <p>Digital review materials and title-specific review packets are available. Honest review only; no requested outcome.</p>
          </article>
          <article>
            <h3>Libraries + classrooms</h3>
            <p>Collection development, course use, reading lists, research, public programming, and bulk-order inquiries are welcome.</p>
          </article>
          <article>
            <h3>Rights + adaptation</h3>
            <p>Foreign rights, audio, documentary, dramatic, and other adaptation inquiries may be directed to the publishing contact.</p>
          </article>
          <article>
            <h3>Contact</h3>
            <p><a href="mailto:EJFinkley@ConsonanceIntelligence.com">EJFinkley@ConsonanceIntelligence.com</a><br />EJFinkley Holdings Inc. / Consonance</p>
          </article>
        </section>
      </div>
    </main>
  );
}