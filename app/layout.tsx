import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Consonance Publishing — Store",
  description: "Direct editions from Consonance Publishing by Eric J. Finkley.",
  authors: [{ name: "EJFinkley Holdings Inc." }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
