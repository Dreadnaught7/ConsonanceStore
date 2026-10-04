import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Consonance Publishing", template: "%s | Consonance Publishing" },
  description: "Consonance Publishing is the independent publishing imprint of EJFinkley Holdings Inc., founded by Eric J. Finkley. It publishes documentary history, archival research, New York history, methodology, speculative fiction, and contemporary American fiction.",
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
  authors: [{ name: "Eric J. Finkley" }],
  creator: "Eric J. Finkley",
  publisher: "Consonance Publishing",
  alternates: { canonical: "https://consonanceintelligence.com/store" },
  icons: {
    icon: [{ url: "/store/consonance-favicon.svg", type: "image/svg+xml" }],
    shortcut: "/store/consonance-favicon.svg",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://consonanceintelligence.com/#organization",
  name: "Consonance",
  legalName: "EJFinkley Holdings Inc.",
  url: "https://consonanceintelligence.com/",
  founder: {
    "@type": "Person",
    "@id": "https://consonanceintelligence.com/#eric-j-finkley",
    name: "Eric J. Finkley",
  },
  department: {
    "@type": "Organization",
    "@id": "https://consonanceintelligence.com/store#publishing",
    name: "Consonance Publishing",
    url: "https://consonanceintelligence.com/store",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://consonanceintelligence.com/store#website",
  name: "Consonance Publishing",
  url: "https://consonanceintelligence.com/store",
  publisher: { "@id": "https://consonanceintelligence.com/store#publishing" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1432183163557-d2779f981bd3?auto=format&fit=crop&q=88&w=2400" fetchPriority="high" />
        <Script
          id="consonance-organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="consonance-publishing-site-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        {children}
        <Script src="/store/consonance-attribution.js" strategy="afterInteractive" />
        <Script src="https://js.lulu.com/lulu-buy.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
