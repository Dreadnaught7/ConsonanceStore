"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { STORE_PRODUCTS } from "@/lib/catalog";

export default function HomePage() {
  const [filter, setFilter] = useState<"all" | "history" | "method">("all");
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--mx", event.clientX + "px");
      document.documentElement.style.setProperty("--my", event.clientY + "px");
    };

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.width =
          (total > 0 ? (window.scrollY / total) * 100 : 0) + "%";
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const books = useMemo(
    () => filter === "all" ? STORE_PRODUCTS : STORE_PRODUCTS.filter((book) => book.category === filter),
    [filter]
  );

  return (
    <main className="store-page">
      <div className="scroll-progress" ref={progressRef} />

      <header className="site-header">
        <div className="shell header-inner">
          <a href="/" className="brand">
            <img src="/covers/consonance-logo.svg" alt="" />
            <span>
              <b>Consonance</b>
              <small>Publishing</small>
            </span>
          </a>

          <nav>
            <a href="#books">Books</a>
            <a href="#about">About</a>
            <a href="https://consonanceintelligence.com/" target="_blank" rel="noreferrer">Intelligence ↗</a>
          </nav>
        </div>
      </header>

      <section className="shell hero-grid">
        <div className="hero-main glass-panel">
          <span className="kicker">Independent publishing / direct editions</span>
          <h1>Books built to hold up.</h1>
          <p>
            Documentary history, practical method, and evidence-led work from Eric J. Finkley.
          </p>
          <a className="text-link" href="#books">Browse current titles ↓</a>
        </div>

        <div className="hero-note tactile-card">
          <span className="micro-label">CONSONANCE METHOD</span>
          <p>Signal → trace → record → context → choice.</p>
        </div>

        <div className="hero-texture zine-card">
          <span>CONNECTION</span>
          <strong>NOT CLAIM</strong>
          <small>Evidence first. Context widened. Human choice preserved.</small>
        </div>
      </section>

      <section className="shell catalog" id="books">
        <div className="catalog-head">
          <div>
            <span className="kicker">Current shelf</span>
            <h2>Available now</h2>
          </div>

          <div className="filters">
            {[
              ["all","All"],
              ["history","History"],
              ["method","Method"]
            ].map(([value,label]) => (
              <button
                key={value}
                onClick={() => setFilter(value as "all" | "history" | "method")}
                className={filter === value ? "active" : ""}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="book-bento">
          {books.map((book, index) => (
            <article className={"book-card card-" + ((index % 3) + 1)} key={book.slug}>
              <a className="cover-wrap" href={"/books/" + book.slug}>
                <img src={book.coverImage} alt={"Cover of " + book.name} />
              </a>

              <div className="book-info">
                <span className="book-type">{book.category}</span>
                <h3>{book.name}</h3>
                {book.subtitle ? <p className="subtitle">{book.subtitle}</p> : null}
                <p className="description">{book.description}</p>

                <div className="book-footer">
                  <div>
                    <strong>{book.priceLabel}</strong>
                    <small>{book.format}</small>
                  </div>
                  <div className="actions">
                    <a href={"/books/" + book.slug}>Details</a>
                    <a className="buy" href={book.checkoutUrl} target="_blank" rel="noreferrer">
                      Buy direct ↗
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shell about-grid" id="about">
        <div className="about-copy glass-panel">
          <span className="kicker">Consonance Publishing</span>
          <h2>Clear work. Strong record.</h2>
          <p>
            Consonance Publishing is an imprint of EJFinkley Holdings Inc., built around
            documentary rigor, original ideas, direct ownership, and long-term preservation.
          </p>
        </div>

        <blockquote className="quote-card">
          “Language should increase the reader’s ability to see, not reduce the reader’s ability to choose.”
        </blockquote>
      </section>

      <footer className="site-footer">
        <div className="shell">
          <span>© 2026 Consonance Publishing</span>
          <span>EJFinkley Holdings Inc.</span>
        </div>
      </footer>
    </main>
  );
}
