// Deployment refresh: live Vercel sync
"use client";

import React, { useEffect, useRef } from "react";
import { STORE_PRODUCTS } from "@/lib/catalog";
import { MALCOLM_PRODUCT } from "@/lib/malcolm";

const HERO_IMAGE = "https://images.unsplash.com/photo-1432183163557-d2779f981bd3?auto=format&fit=crop&q=88&w=2400";

function ConsonanceMark() {
  return (
    <svg className="brand-logo brand-mark" viewBox="0 0 100 100" role="img" aria-label="Consonance">
      <defs>
        <linearGradient id="blueArc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b3b8f" />
          <stop offset="1" stopColor="#001f61" />
        </linearGradient>
        <linearGradient id="goldSignal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b77a12" />
          <stop offset=".48" stopColor="#f6d778" />
          <stop offset="1" stopColor="#b77a12" />
        </linearGradient>
        <radialGradient id="goldCore">
          <stop offset="0" stopColor="#fff7c9" />
          <stop offset=".32" stopColor="#f6d778" />
          <stop offset="1" stopColor="#c58a1b" />
        </radialGradient>
      </defs>
      <path d="M45 8C20 11 7 29 7 50s13 39 38 42C30 79 26 65 26 50S30 21 45 8Z" fill="url(#blueArc)" />
      <path d="M55 8c25 3 38 21 38 42S80 89 55 92c15-13 19-27 19-42S70 21 55 8Z" fill="#080a0d" />
      <line className="signal-line" x1="50" y1="5" x2="50" y2="95" stroke="url(#goldSignal)" strokeWidth="1.6" />
      <path className="signal-star" d="M50 24C53 37 58 45 68 50c-10 5-15 13-18 26-3-13-8-21-18-26 10-5 15-13 18-26Z" fill="url(#goldCore)" />
      <circle className="signal-orb" cx="50" cy="79" r="3.6" fill="url(#goldCore)" />
      <circle className="signal-shimmer" cx="50" cy="50" r="13" />
    </svg>
  );
}

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
            <ConsonanceMark />
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
          <p className="eyebrow">ABOUT CONSONANCE</p>
          <h2>History is the beginning.<br />Human understanding is the mission.</h2>
          <p>
            Consonance is an independent publishing and intelligence company built to connect
            records, lived experience, technology, culture, and human stories that are too often
            separated from one another. The books are one expression of that work: researched,
            accessible ways to recover context, preserve memory, challenge incomplete narratives,
            and give readers more of the record from which to form their own understanding.
          </p>
          <p>
            Beyond publishing, Consonance develops research systems, archives, tools, and
            intelligence projects designed around a simple principle: information should help
            people see more clearly without reducing their ability to choose. The goal is not to
            tell people what to think. It is to build better ways to trace what happened, understand
            why it matters, and carry useful knowledge forward.
          </p>
          <div className="founder-bio">
            <p className="eyebrow">FOUNDER</p>
            <h3>Eric J. Finkley</h3>
            <p>
              Eric J. Finkley is the founder of EJFinkley Holdings Inc., doing business as
              Consonance, and the author behind Consonance Publishing. A New Yorker with more than
              two decades of field-service experience, he brings a builder&apos;s approach to
              research and storytelling: follow the evidence, connect the systems, and make the
              result useful. His work spans history, technology, culture, archival research, and
              the development of the Resonance Method.
            </p>
          </div>
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
            <ConsonanceMark />
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
