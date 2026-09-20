"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { STORE_PRODUCTS } from "@/lib/catalog";

const SIGNALS = ["OBSERVE", "TRACE", "RECORD", "CONNECT", "CONTEXT", "UNDERSTAND", "CHOOSE"];

export default function HomePage() {
  const [filter, setFilter] = useState<"all" | "history" | "method">("all");
  const [signalIndex, setSignalIndex] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(
      () => setSignalIndex((current) => (current + 1) % SIGNALS.length),
      1900
    );
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.width =
          (total > 0 ? (window.scrollY / total) * 100 : 0) + "%";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const books = useMemo(
    () => filter === "all" ? STORE_PRODUCTS : STORE_PRODUCTS.filter((book) => book.category === filter),
    [filter]
  );

  return (
    <main className="store-page" id="top">
      <div className="scroll-progress" ref={progressRef} />

      <header className="store-header">
        <div className="store-shell store-nav">
          <a className="store-brand" href="#top" aria-label="Consonance Publishing Store">
            <span className="logo-frame">
              <img src="/covers/consonance-logo.svg" alt="" />
            </span>
            <span className="brand-type">
              <b>CONSONANCE</b>
              <small>PUBLISHING / STORE</small>
            </span>
          </a>

          <nav>
            <a href="#books">BOOKS</a>
            <a href="#about">IMPRINT</a>
            <a href="https://consonanceintelligence.com/" target="_blank" rel="noreferrer">
              INTELLIGENCE ↗
            </a>
          </nav>
        </div>
      </header>

      <section className="store-hero">
        <div className="store-shell hero-grid">
          <div className="hero-copy-block">
            <p className="store-eyebrow">CONSONANCE PUBLISHING / DIRECT</p>
            <h1>BOOKS WITH<br />PRESENCE.</h1>
            <p className="hero-copy">
              Documentary history, practical method, and evidence-driven work from
              Eric J. Finkley. Built with weight. Sold direct.
            </p>
            <div className="hero-actions">
              <a className="store-button primary" href="#books">ENTER THE SHELF</a>
              <a className="store-button ghost" href="#about">THE IMPRINT</a>
            </div>
          </div>

          <aside className="signal-panel">
            <div className="signal-index">SIGNAL / {String(signalIndex + 1).padStart(2, "0")}</div>
            <strong key={signalIndex}>{SIGNALS[signalIndex]}</strong>
            <div className="signal-rule" />
            <small>SIGNAL → TRACE → RECORD → CONTEXT → CHOICE</small>
          </aside>
        </div>
      </section>

      <section className="store-shell shelf-section" id="books">
        <div className="section-head">
          <div>
            <p className="store-eyebrow">CURRENT SHELF</p>
            <h2>AVAILABLE NOW</h2>
          </div>
          <p>
            Direct editions from Consonance Publishing. Every title is treated as an object,
            not an app tile.
          </p>
        </div>

        <div className="store-filters" aria-label="Filter books">
          {[
            ["all", "ALL"],
            ["history", "HISTORY"],
            ["method", "METHOD"],
          ].map(([value, label]) => (
            <button
              key={value}
              className={filter === value ? "active" : ""}
              onClick={() => setFilter(value as "all" | "history" | "method")}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="store-shelf">
          {books.map((book, index) => (
            <article className="store-book" key={book.slug}>
              <div className="cover-stage">
                <div className="cover-shadow" />
                <a href={"/books/" + book.slug} className="store-cover">
                  <img src={book.coverImage} alt={"Cover of " + book.name} />
                </a>
              </div>

              <div className="store-copy">
                <p className="book-tag">
                  {String(index + 1).padStart(2, "0")} / {book.category.toUpperCase()}
                </p>
                <h3>{book.name}</h3>
                <p className="edition">{book.subtitle}</p>
                <p className="book-desc">{book.description}</p>
                <div className="book-meta">
                  <span>ERIC J. FINKLEY</span>
                  <span>{book.format}</span>
                </div>
              </div>

              <div className="buy-panel">
                <span className="buy-label">DIRECT EDITION</span>
                <strong>{book.priceLabel}</strong>
                <a className="direct-buy" href={book.checkoutUrl} target="_blank" rel="noreferrer">
                  BUY DIRECT ↗
                </a>
                <a className="detail-link" href={"/books/" + book.slug}>
                  VIEW EDITION →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="next-strip">
          <b>NEXT /</b>
          <span>BEFORE THE BULLET · A DREAM OBSERVED · MALCOLM X</span>
        </div>
      </section>

      <section className="store-shell about-section" id="about">
        <div className="about-number">01</div>
        <div>
          <p className="store-eyebrow">WHY THIS IMPRINT</p>
          <h2>CONNECTION,<br />NOT CLAIM.</h2>
        </div>
        <div className="about-copy">
          <p>
            Consonance Publishing is an imprint of EJFinkley Holdings Inc. The throughline is
            simple: preserve evidence, widen context, respect the person, and leave the reader
            with more ability to choose — not less.
          </p>
          <blockquote>
            “Language should increase the reader’s ability to see, not reduce the reader’s
            ability to choose.”
          </blockquote>
        </div>
      </section>

      <footer className="store-footer">
        <div className="store-shell">
          <span>© 2026 CONSONANCE PUBLISHING / EJFINKLEY HOLDINGS INC.</span>
          <a href="https://consonanceintelligence.com/" target="_blank" rel="noreferrer">
            CONSONANCEINTELLIGENCE.COM ↗
          </a>
        </div>
      </footer>
    </main>
  );
}
