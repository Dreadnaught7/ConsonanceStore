import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Consonance Store",
  description: "Direct editions from Consonance Publishing.",
  authors: [{ name: "EJFinkley Holdings Inc." }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="shell header-inner">
            <Link href="/" className="brand" aria-label="Consonance Store home">
              <span className="brand-mark">CONSONANCE</span>
              <span className="brand-sub">PUBLISHING · STORE</span>
            </Link>
            <nav>
              <Link href="/">Books</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="shell">
            <p>Consonance Publishing · EJFinkley Holdings Inc.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
