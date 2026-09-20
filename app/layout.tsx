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
      <body>
        {children}
        <Script src="https://js.lulu.com/lulu-buy.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
