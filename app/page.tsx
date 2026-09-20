"use client";

import { useEffect, useRef } from "react";
import { STORE_PRODUCTS } from "@/lib/catalog";

export default function HomePage() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--mx", event.clientX + "px");
      document.documentElement.style.setProperty("--my", event.clientY + "px");
    };
    const scroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.width =
          (total > 0 ? (window.scrollY / total) * 100 : 0) + "%";
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  const featured = STORE_PRODUCTS.slice(0, 3);

  return (
    <main className="store-page">
      <div className="scroll-progress" ref={progressRef} />

      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top">
            <span className="brand-mark">C</span>
            <span className="brand-copy">
              <b>CONSONANCE</b>
              <small>IDEAS FOR A MORE HUMAN TOMORROW</small>
            </span>
          </a>

          <nav>
            <a href="#books">Books</a>
            <a href="#about">About</a>
            <a href="https://consonanceintelligence.com/" target="_blank" rel="noreferrer">
              Intelligence ↗
            </a>
          </nav>

          <a className="support-button" href="#books">Support the work</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-photo" />
        <div className="hero-vignette" />
        <div className="hero-glow" />

        <div className="shell hero-layout">
          <aside className="hero-left-rail">
            <span>BOOKS</span>
            <span>IDEAS</span>
            <span>RESEARCH</span>
            <span>CULTURE</span>
            <span>A MORE HUMAN</span>
            <span>TOMORROW</span>
            <i />
          </aside>

          <div className="hero-copy">
            <h1>
              <span className="gold">NEW YORK</span>
              <span className="gold">IDEAS TRAVEL</span>
              <span>FURTHER HERE.</span>
            </h1>
            <p>
              Independent books for curious minds — exploring history, technology, culture,
              and what comes next.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#books">Browse books →</a>
              <a className="button ghost" href="#about">Our mission</a>
            </div>
          </div>

          <aside className="hero-right-rail">
            <div className="rail-words">
              <span>PEOPLE</span>
              <span>PLACES</span>
              <span>STORIES</span>
              <span>IDEAS</span>
              <span>STILL</span>
              <span>MATTER</span>
            </div>
            <div className="harlem-plaque">
              <strong>Harlem</strong>
              <small>A More Human Tomorrow</small>
            </div>
          </aside>
        </div>
      </section>

      <section className="featured" id="books">
        <div className="shell featured-layout">
          <div className="featured-intro">
            <p className="eyebrow">FEATURED BOOKS</p>
            <h2>Different questions.<br />A richer conversation.</h2>
            <a href="#books">View all books →</a>
          </div>

          <div className="book-list">
            {featured.map((book) => (
              <article className="book-card" key={book.slug}>
                <a className="book-cover" href={"/books/" + book.slug}>
                  <img src={book.coverImage} alt={"Cover of " + book.name} />
                </a>
                <div className="book-card-copy">
                  <h3>{book.name}</h3>
                  {book.subtitle ? <p>{book.subtitle}</p> : null}
                  <span>Eric J. Finkley</span>
                  <strong>{book.priceLabel}</strong>
                  <a className="book-buy" href={book.checkoutUrl} target="_blank" rel="noreferrer">
                    Buy direct
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lower-grid" id="about">
        <div className="city-panel apollo-panel">
          <div className="panel-overlay" />
          <blockquote>
            “Our stories were never the footnote.<br />They were the foundation.”
            <span>— Eric J. Finkley</span>
          </blockquote>
        </div>

        <div className="mission-panel">
          <p className="eyebrow">CONSONANCE</p>
          <h2>Independent ideas.<br />Real impact.</h2>
          <p>
            Consonance Publishing exists to explore the deeper questions — and to amplify
            voices that challenge, connect, and inspire.
          </p>
          <a href="#books">Learn more →</a>
        </div>

        <div className="newsletter-panel">
          <div className="newsletter-photo" />
          <div className="newsletter-overlay" />
          <div className="newsletter-copy">
            <p className="eyebrow">STAY IN THE LOOP</p>
            <h3>New releases, essays, and updates from Consonance.</h3>
            <form onSubmit={(event) => event.preventDefault()}>
              <input type="email" aria-label="Email address" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <div className="brand footer-brand">
            <span className="brand-mark">C</span>
            <span className="brand-copy">
              <b>CONSONANCE</b>
              <small>IDEAS FOR A MORE HUMAN TOMORROW</small>
            </span>
          </div>

          <nav>
            <a href="#books">Books</a>
            <a href="#about">About</a>
            <a href="https://consonanceintelligence.com/" target="_blank" rel="noreferrer">Intelligence ↗</a>
          </nav>

          <div className="footer-right">
            <span>© 2026 Consonance Publishing</span>
            <small>EJFinkley Holdings Inc.</small>
          </div>
        </div>
      </footer>
    </main>
  );
}
