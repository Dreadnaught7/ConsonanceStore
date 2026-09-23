// Deployment refresh: live Vercel sync
"use client";

import React, { useEffect, useRef } from "react";
import { STORE_PRODUCTS } from "@/lib/catalog";
import { MALCOLM_PRODUCT } from "@/lib/malcolm";

const HERO_IMAGE = "https://images.unsplash.com/photo-1432183163557-d2779f981bd3?auto=format&fit=crop&q=88&w=2400";

const CONSONANCE_LOGO = "data:image/jpeg;base64,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";

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

  const featured = [...STORE_PRODUCTS, MALCOLM_PRODUCT];

  return (
    <main className="store-page">
      <div className="scroll-progress" ref={progressRef} />

      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top">
            <img className="brand-logo" src={CONSONANCE_LOGO} alt="Consonance logo" />
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

          <a className="support-button" href="/books/the-air-was-safe">Support the work</a>
        </div>
      </header>

      <section className="hero" id="top">
        <img className="hero-photo" src={HERO_IMAGE} alt="" loading="eager" fetchPriority="high" decoding="sync" />
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
              <span className="gold">INTELLIGENCE</span>
              <span className="gold">TRAVELS</span>
              <span>FARTHER HERE.</span>
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
          </aside>
        </div>
      </section>

      <section className="featured" id="books">
        <div className="shell featured-layout">
          <div className="featured-intro">
            <p className="eyebrow">FEATURED BOOKS</p>
            <h2>Different questions.<br />A richer conversation.</h2>
            <span className="catalog-label">CURRENT CATALOG</span>
          </div>

          <div className="book-list">
            {featured.map((book) => (
              <article className="book-card" key={book.slug}>
                <a
                  className="book-cover"
                  href={"/books/" + book.slug}
                  aria-label={"View " + book.name}
                  style={
                    book.coverImage
                      ? { backgroundImage: `url("${book.coverImage}")` }
                      : {
                          background: "linear-gradient(160deg, #080808 0%, #24190b 52%, #080808 100%)",
                          color: "#d8b15a",
                          display: "grid",
                          placeItems: "center",
                          padding: "2rem",
                          textAlign: "center",
                        }
                  }
                >
                  {!book.coverImage ? (
                    <span style={{ fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "0.06em", lineHeight: 1.15 }}>
                      WHO ARE WE?<br />
                      <small style={{ display: "block", marginTop: "0.8rem", fontSize: "0.7em", letterSpacing: "0.12em" }}>
                        BOOK TWO
                      </small>
                      <span style={{ display: "block", marginTop: "0.35rem" }}>THE HUMAN LEDGER</span>
                    </span>
                  ) : null}
                </a>
                <div className="book-card-copy">
                  <a className="book-title-link" href={"/books/" + book.slug}>
                    <h3>{book.name}</h3>
                  </a>
                  {book.subtitle ? <p>{book.subtitle}</p> : null}
                  <span>Eric J. Finkley</span>
                  <strong>{book.priceLabel}</strong>
                  <div className="book-actions">
                    <a className="book-details" href={"/books/" + book.slug}>Description + buy →</a>
                    {book.availableForDirectCheckout && book.stripePriceId ? (
                      <a className="book-buy" href={"/books/" + book.slug}>
                        Buy with Stripe
                      </a>
                    ) : book.buyButtonId && book.buyButtonVariant === "button-only" ? (
                      <div className="lulu-native-button compact">
                        {React.createElement("lulu-buy-button", {
                          "buy-button-id": book.buyButtonId,
                          variant: "button-only",
                        })}
                      </div>
                    ) : (
                      <a className="book-buy" href={book.checkoutUrl} target="_blank" rel="noreferrer">
                        Buy through Lulu
                      </a>
                    )}
                  </div>
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
          <a href="https://consonanceintelligence.com/" target="_blank" rel="noreferrer">Explore Consonance →</a>
        </div>

        <div className="newsletter-panel">
          <div className="newsletter-photo" />
          <div className="newsletter-overlay" />
          <div className="newsletter-copy">
            <p className="eyebrow">STAY IN THE LOOP</p>
            <h3>New releases, essays, and updates from Consonance.</h3>
            <div className="newsletter-status">
              <span>Newsletter signup coming soon.</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <div className="brand footer-brand">
            <img className="brand-logo" src={CONSONANCE_LOGO} alt="Consonance logo" />
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
