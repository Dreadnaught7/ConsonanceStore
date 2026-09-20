import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Consonance Publishing — Store",
  description: "Direct editions from Consonance Publishing by Eric J. Finkley.",
  authors: [{ name: "EJFinkley Holdings Inc." }],
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
