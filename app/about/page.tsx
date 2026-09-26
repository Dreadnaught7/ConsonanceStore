import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Canonical information about Consonance Publishing, the independent publishing imprint of EJFinkley Holdings Inc., founded by Eric J. Finkley.",
  alternates: { canonical: "https://consonanceintelligence.com/store/about" },
};

const publishingSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://consonanceintelligence.com/store#publishing",
  name: "Consonance Publishing",
  url: "https://consonanceintelligence.com/store",
  parentOrganization: {
    "@type": "Organization",
    name: "EJFinkley Holdings Inc.",
    url: "https://consonanceintelligence.com/",
  },
  founder: {
    "@type": "Person",
    "@id": "https://consonanceintelligence.com/#eric-j-finkley",
    name: "Eric J. Finkley",
  },
  description:
    "Independent publishing imprint focused on documentary history, archival research, New York history, methodology, speculative fiction, and contemporary American fiction.",
};

export default function AboutPage() {
  return (
    <main className="product-page">
      <Link href="/" className="back-link">← Back to store</Link>

      <section className="product-direct">
        <span className="product-kicker">CANONICAL PUBLISHING PROFILE</span>
        <h1>Consonance Publishing</h1>
        <p className="product-subtitle">
          The independent publishing imprint of EJFinkley Holdings Inc., founded by Eric J. Finkley.
        </p>

        <div className="product-description">
          <p>
            Consonance Publishing creates books that connect documentary evidence, lived experience,
            technology, culture, memory, and story. Its nonfiction work is built to keep sources,
            uncertainty, contradictions, and the limits of the record visible. Its fiction carries
            many of the same questions into imagined worlds and contemporary lives.
          </p>

          <h2>Publishing lanes</h2>
          <p>
            Documentary and archival history includes <em>WHO ARE WE? — Slavery, Its Descendants,
            and the Making of America</em>, the GROUNDS place-history books, and records-based
            investigations such as <em>The Air Was Safe</em>.
          </p>
          <p>
            The <em>Before the Bullet</em> series follows major historical figures through the
            documented record before their assassinations. Its core volumes include
            <em> Target: Black Messiah</em> on Fred Hampton, <em>A Dream Observed</em> on Martin
            Luther King Jr., and <em>The Means They Feared</em> on Malcolm X. <em>The Assassins
            Codex</em> is the final companion volume, where post-assassination investigations,
            later testimony, declassified material, disputed evidence, contradictions, and
            unresolved questions can be examined together.
          </p>
          <p>
            The V’Nari trilogy consists of <em>A World Awake</em>, <em>A World Revealed</em>, and
            <em>A World Remembered</em>. The current catalog also includes the
            <em> Resonance Method</em>, contemporary American fiction, and additional Consonance
            Publishing projects.
          </p>

          <h2>Founder</h2>
          <p>
            Eric J. Finkley founded EJFinkley Holdings Inc., doing business as Consonance, and is
            the author behind Consonance Publishing. His work spans history, technology, culture,
            archival reconstruction, fiction, and the development of the Resonance Method.
          </p>

          <h2>Relationship to Consonance Intelligence</h2>
          <p>
            The books are one expression of a larger Consonance system. Consonance also develops
            research systems, archives, evidence-oriented tools, and intelligence products. The
            publishing program turns parts of that work into accessible narratives and documented
            demonstrations while the broader intelligence platform handles research, evidence,
            and data products.
          </p>

          <h2>Fulfillment</h2>
          <p>
            Titles displayed in the Consonance Publishing catalog may be fulfilled through Lulu
            Direct or other clearly identified external purchase links. Consonance Publishing is
            the imprint and catalog owner; fulfillment providers handle printing and order
            processing for applicable editions.
          </p>

          <p>
            For current titles, editions, descriptions, and purchase links, the authoritative
            catalog is this site.
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(publishingSchema) }}
      />
    </main>
  );
}
