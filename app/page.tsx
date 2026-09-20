"use client";

import { useEffect, useRef } from "react";

const books = [
  {
    title: "The Resonance Method",
    subtitle: "Second Edition",
    price: "$16.99",
    className: "cover-resonance",
    checkout: "https://svc.lulu.com/?items=c36f44ae-dc16-451e-86ad-99929d9c2186",
  },
  {
    title: "GROUNDS: Harlem",
    subtitle: "A Place. A People. A Longer Story.",
    price: "Buy direct",
    className: "cover-harlem",
    checkout: "https://svc.lulu.com/?items=2e105102-6127-43b3-a019-9d0d2dbf9bf1",
  },
  {
    title: "The Air Was Safe",
    subtitle: "September 11 · Records · Public Assurance",
    price: "$15.99",
    className: "cover-air",
    checkout: "https://svc.lulu.com/?items=2fc771d6-ffc7-4421-b062-93f85aea265b",
  },
];

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

  return (
    <main className="store-page">
      <div className="scroll-progress" ref={progressRef} />

      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top">
            <span className="brand-mark">C</span>
            <span className="brand-copy">
              <b>CONSONANCE</b>
              <small>PUBLISHING</small>
            </span>
          </a>
          <nav>
            <a href="#books">Books</a>
            <a href="#about">About</a>
            <a href="https://consonanceintelligence.com/" target="_blank" rel="noreferrer">
              Intelligence ↗
            </a>
          </nav>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-image" />
        <div className="hero-overlay" />
        <div className="shell hero-content">
          <div className="hero-copy">
            <p className="eyebrow">IDEAS BELONG HERE</p>
            <h1>Consonance<br />Publishing</h1>
            <p className="hero-deck">
              Books with weight. Work with memory. Stories and research rooted in New York and built to travel.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#books">Explore books →</a>
              <a className="button secondary" href="#about">Our mission</a>
            </div>
          </div>

          <aside className="hero-side">
            <span>PEOPLE</span>
            <span>PLACES</span>
            <span>PERSPECTIVES</span>
            <span>PROGRESS</span>
          </aside>
        </div>
      </section>

      <section className="shell featured" id="books">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">FEATURED BOOKS</p>
            <h2>Current shelf</h2>
          </div>
          <span className="rule" />
        </div>

        <div className="book-grid">
          {books.map((book) => (
            <article className="book-card" key={book.title}>
              <div className={"book-cover " + book.className}>
                <div className="cover-noise" />
                <div className="cover-title">{book.title}</div>
                <div className="cover-sub">{book.subtitle}</div>
                <div className="cover-author">ERIC J. FINKLEY</div>
              </div>
              <div className="book-copy">
                <h3>{book.title}</h3>
                <p>{book.subtitle}</p>
                <div className="book-buy-row">
                  <strong>{book.price}</strong>
                  <a href={book.checkout} target="_blank" rel="noreferrer">Buy direct ↗</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mission" id="about">
        <div className="mission-city" />
        <div className="mission-overlay" />
        <div className="shell mission-grid">
          <div className="mission-copy">
            <p className="eyebrow">OUR MISSION</p>
            <h2>Books that move people forward.</h2>
            <p>
              Consonance Publishing exists to preserve evidence, widen context, and create work that leaves the reader with more room to think — not less.
            </p>
          </div>

          <blockquote>
            “Language should increase the reader’s ability to see, not reduce the reader’s ability to choose.”
          </blockquote>
        </div>
      </section>

      <section className="city-strip">
        <div className="city-tile tile-one">
          <span>READ</span>
          <span>THINK</span>
          <span>BELONG</span>
          <span>BUILD</span>
        </div>
        <div className="city-tile tile-two" />
        <div className="city-tile tile-three">
          <span>A BRIGHTER TOMORROW READS HERE.</span>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <div className="brand footer-brand">
            <span className="brand-mark">C</span>
            <span className="brand-copy">
              <b>CONSONANCE</b>
              <small>PUBLISHING</small>
            </span>
          </div>
          <span>© 2026 EJFinkley Holdings Inc.</span>
        </div>
      </footer>
    </main>
  );
}
