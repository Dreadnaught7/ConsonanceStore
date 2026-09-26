import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Consonance Publishing", template: "%s | Consonance Publishing" },
  description: "Independent books in documentary history, archival reconstruction, New York history, method, speculative fiction, and contemporary American fiction.",
  keywords: ["Consonance Publishing", "Eric J. Finkley", "documentary history", "Black history", "genealogy", "New York history", "independent publishing", "speculative fiction"],
  metadataBase: new URL("https://consonanceintelligence.com/store"),
  openGraph: {
    title: "Consonance Publishing",
    description: "Books, research, memory, culture, and ideas for a more human tomorrow.",
    type: "website",
    siteName: "Consonance Publishing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Consonance Publishing",
    description: "Books, research, memory, culture, and ideas for a more human tomorrow.",
  },
  authors: [{ name: "EJFinkley Holdings Inc." }],
  icons: {
    icon: [{ url: "/store/consonance-favicon.svg", type: "image/svg+xml" }],
    shortcut: "/store/consonance-favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1432183163557-d2779f981bd3?auto=format&fit=crop&q=88&w=2400" fetchPriority="high" />
      </head>
      <body>
        {children}
        <Script src="https://js.lulu.com/lulu-buy.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
