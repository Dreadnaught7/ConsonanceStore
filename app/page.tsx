"use client";

import { useEffect, useRef, useState } from "react";

const LOGO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wgARCABAAEADASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAABAYCAwUBAAf/xAAYAQADAQEAAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAABZxK1q50NQuUvnu58vT8qM7E5lU3vfLtdgnNsRMQsMbJbfndIl8TmDbPSGJr59aiYTDnzp3UaTmrOddKFmafLn4DDQOxS0mf/xAAgEAACAgEFAQEBAAAAAAAAAAACAwEEABAREhMyIgUU/9oACAEBAAEFAsfYWiJuvbiwdA7xAiYlrbsQhaFHbeACAl5HzYpLbi7bqzAMTG0ztfSV1V8PwPnP0kdifzX8GhG56NnlCi2jJjeJ+DCeJ6Oj5UPzoc7ndV1Pou7a+H5Dzl1vVWqq7rFhIvWPbRepoOAvA+ZKIy5Ymy6jW/nXhgJjFKAOOXB1qFRCLlia1NdfT//EABkRAQADAQEAAAAAAAAAAAAAAAEAECECMf/aAAgBAwEBPwFYF8bsCJXGZD2NJC//xAAdEQACAwACAwAAAAAAAAAAAAABAgAQEQMhQVFh/9oACAECAQE/AVXyYx9Xy9DIxwRTork7GxhoijBQbI3y/wD/xAAsEAABAgQEBAUFAAAAAAAAAAABAAIQERJRAyEiMTJBcZEEE1JisSNhcoHh/9oACAEBAAY/AlrOdl9DDkO6qxsUl1hspuK0uB6GPuOy1E+4oNaJAI9EFU3Q+4Xl+I1Ad0HMMwU53LYIXdmYO6IdIVjiZ8Lyjwv+U0XMaGqh24hIr8SgbGNQ3CqO5i43KPpdmEPU3IwKEHHmcgms5blUu/Rssx/VUw5I9EEZnZSZOkZNCm7jdvCl4BCqwMR2Ge4WuU/sqWNL32ARr0hxmZqfE+8P/8QAIxABAAIBAwUAAwEAAAAAAAAAAQARIRAxYUFRcYGhkcHwsf/aAAgBAQABPyGWHO2G7L6mwLq1x3RV0AJUkCsrP9PzW1FOM/uIFRvEe+wJ96fBLAe3j/MXk7i9nI9YDTKEj3mD6CBg6U6blHb8NAUut56o97mxxF89A1v0td+JVpWA50BNhKZZ63wemWl0GGSzTLx5PMxe7eNar6jHrH8DAAv8hpTNtVRCxtWgX2L3sai3eginE79xEVx7PYwheX5J9qfBC0YC23YgMFyB5lpR8nGiJK6JOBYbkFwnTcVMVHw7HliqHox8YmIcj/XbT//aAAwDAQACAAMAAAAQSbrMVAI82GiwWmjI/8QAGREBAAMBAQAAAAAAAAAAAAAAAQARIRAx/9oACAEDAQE/EKWj2Jex5sqXMYeCyo0FRK7yzZa9j7z/xAAaEQEAAwEBAQAAAAAAAAAAAAABABARMSFB/9oACAECAQE/ENT4QcQZDleAw0WCSU8jAUYABWTHkBjqHK//xAAkEAEAAQMEAgIDAQAAAAAAAAABEQAhMUFRYYEQcaGxkcHR8P/aAAgBAQABPxCgloTf+o/bakoBK7hg0J4vQtM5YY4JatQoqgxXwxH08xNlk45XBU8IT8hscuA06onV2DHPvmv9jarvR+qDCG4rngZ95p63QlIaaB7/ADRNV3KpUFw7f2u90KoCl5cHRHgHMDfDRCYU+PFnuswvoOs9c0OwwVtpJ7x7igxhftCgAAICx4EGt2YG3ugLrhdGnfgvpcG42oEtHy5sfVYnTnSNIBJG4+IRIck0GaiGkbnQ4PCgSsBR4wN2rSHAq+l8On4SplAB62y7Pp8Ia8l3ahdiAOreDTCEdHwS9UZkgrtef0d1s5gL7n9KRsuwfju+u5Qlcw1dk0avH/EV8P8AVS8N8HI8WaTScIuuYbv13UaUQsvHQv3z4yYSnFS6zNoNkcndX3UJQbbKx+agpwEAo0C3rNB4wttgshdAwYokmQgeOBo+fH//2Q==";

const RESONANCE = "data:image/jpeg;base64,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";

const HARLEM = "data:image/jpeg;base64,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";

const AIR = "data:image/jpeg;base64,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";

const BOOKS = [
  {
    category: "Method",
    tag: "METHOD / PERSONAL PRACTICE",
    title: "The Resonance Method",
    edition: "Second Edition",
    description: "A practical framework for observing clearly, aligning with what is true, acting with intention, and learning from the echo of results.",
    price: "$16.99",
    cover: RESONANCE,
    checkout: "https://svc.lulu.com/?items=c36f44ae-dc16-451e-86ad-99929d9c2186",
  },
  {
    category: "History",
    tag: "GROUNDS & LEGENDS / DOCUMENTARY HISTORY",
    title: "GROUNDS: Harlem",
    edition: "A Place. A People. A Longer Story.",
    description: "Harlem as place, evidence, argument, and inheritance — tracing the ground before the legend and the systems that shaped the people.",
    price: "Buy now",
    cover: HARLEM,
    checkout: "https://svc.lulu.com/?items=2e105102-6127-43b3-a019-9d0d2dbf9bf1",
  },
  {
    category: "History",
    tag: "INVESTIGATIVE HISTORY / PUBLIC RECORD",
    title: "The Air Was Safe",
    edition: "September 11 · Records · Public Assurance",
    description: "A documentary examination of records, public assurances, and the evidence available after September 11.",
    price: "$15.99",
    cover: AIR,
    checkout: "https://svc.lulu.com/?items=2fc771d6-ffc7-4421-b062-93f85aea265b",
  },
];

const SIGNALS = ["Observe", "Trace", "Record", "Connect", "Context", "Understand", "Choose"];

export default function HomePage() {
  const [filter, setFilter] = useState("All");
  const [signalIndex, setSignalIndex] = useState(0);
  const [opening, setOpening] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSignalIndex((current) => (current + 1) % SIGNALS.length);
    }, 1800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--mx", event.clientX + "px");
      document.documentElement.style.setProperty("--my", event.clientY + "px");
    };
    const scroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + "%";
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  const visible = filter === "All" ? BOOKS : BOOKS.filter((book) => book.category === filter);

  function tilt(event: React.MouseEvent<HTMLElement>) {
    const cover = event.currentTarget.querySelector(".store-cover") as HTMLElement | null;
    if (!cover) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    cover.style.transform = "perspective(420px) rotateX(" + y * 7 + "deg) rotateY(" + x * -8 + "deg) translateZ(3px)";
  }

  function resetTilt(event: React.MouseEvent<HTMLElement>) {
    const cover = event.currentTarget.querySelector(".store-cover") as HTMLElement | null;
    if (cover) cover.style.transform = "";
  }

  return (
    <main className="store-page">
      <div className="scroll-progress" ref={progressRef} />
      <div className="signal-ring signal-ring-a" />
      <div className="signal-ring signal-ring-b" />

      <header className="store-header">
        <div className="store-shell store-nav">
          <a className="store-brand" href="#top">
            <span className="logo-wrap"><img src={LOGO} alt="Consonance logo" /></span>
            <span>CONSONANCE PUBLISHING</span>
          </a>
          <nav>
            <a href="#books">Books</a>
            <a href="#about">About</a>
            <a href="https://consonanceintelligence.com/" target="_blank" rel="noreferrer">Consonance Intelligence ↗</a>
            <a className="nav-buy" href="#books">Buy Direct</a>
          </nav>
        </div>
      </header>

      <section className="store-hero" id="top">
        <div className="store-shell hero-grid">
          <div>
            <p className="store-eyebrow">CONSONANCE PUBLISHING</p>
            <h1>Books with presence.</h1>
            <p className="hero-copy">Documentary history, practical method, and evidence-driven work from Eric J. Finkley — presented cleanly and sold direct.</p>
            <div className="hero-actions">
              <a className="store-button primary" href="#books">Browse the shelf</a>
              <a className="store-button ghost" href="#about">About the imprint</a>
            </div>
            <p className="live-line"><span className="live-dot" />3 titles live · direct fulfillment through Lulu</p>
          </div>
          <aside className="signal-panel">
            <span>CONSONANCE SIGNAL</span>
            <strong key={signalIndex}>{SIGNALS[signalIndex]}</strong>
            <small>SIGNAL → TRACE → RECORD → CONTEXT → CHOICE</small>
          </aside>
        </div>
      </section>

      <section className="store-shell shelf-section" id="books">
        <div className="section-head">
          <div>
            <p className="store-eyebrow">CURRENT SHELF</p>
            <h2>Available now</h2>
          </div>
          <p>Move through the shelf, filter by lane, and go straight to the matching direct checkout.</p>
        </div>

        <div className="store-filters">
          {["All", "History", "Method"].map((item) => (
            <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>
          ))}
        </div>

        <div className="store-shelf">
          {visible.map((book) => (
            <article className="store-book" key={book.title} onMouseMove={tilt} onMouseLeave={resetTilt}>
              <div className="store-cover"><img src={book.cover} alt={"Cover of " + book.title} /></div>
              <div className="store-copy">
                <p className="book-tag">{book.tag}</p>
                <h3>{book.title}</h3>
                <p className="edition">{book.edition}</p>
                <p className="book-desc">{book.description}</p>
                <p className="author-line">Eric J. Finkley · Consonance Publishing</p>
              </div>
              <div className="buy-panel">
                <strong>{book.price}</strong>
                <small>Live Lulu Direct checkout</small>
                <a
                  className="direct-buy"
                  href={book.checkout}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    setOpening(true);
                    window.setTimeout(() => setOpening(false), 1400);
                  }}
                >
                  Buy direct
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="next-strip">
          <b>NEXT</b>
          <div className="next-marquee"><span>Before the Bullet: Target Black Messiah → A Dream Observed → Malcolm X &nbsp;&nbsp;&nbsp; Before the Bullet: Target Black Messiah → A Dream Observed → Malcolm X</span></div>
        </div>
      </section>

      <section className="store-shell about-section" id="about">
        <div>
          <p className="store-eyebrow">WHY THIS IMPRINT</p>
          <h2>Connection, not claim.</h2>
          <p>Consonance Publishing is an imprint of EJFinkley Holdings Inc. The throughline is simple: preserve evidence, widen context, respect the person, and leave the reader with more ability to choose — not less.</p>
        </div>
        <blockquote>“Language should increase the reader’s ability to see, not reduce the reader’s ability to choose.”</blockquote>
      </section>

      <footer className="store-footer">
        <div className="store-shell"><span>© 2026 Consonance Publishing · EJFinkley Holdings Inc.</span><a href="https://consonanceintelligence.com/" target="_blank" rel="noreferrer">consonanceintelligence.com ↗</a></div>
      </footer>

      <div className={opening ? "store-toast show" : "store-toast"}>Opening secure direct checkout…</div>
    </main>
  );
}
