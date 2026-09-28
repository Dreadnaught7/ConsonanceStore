export type PublishingBundle = {
  slug: string;
  name: string;
  description: string;
  productSlugs: string[];
  regularTotalCents: number;
  bundlePriceCents: number;
  live: boolean;
};

export const PUBLISHING_BUNDLES: PublishingBundle[] = [
  {
    slug: "who-are-we-set",
    name: "WHO ARE WE? Books One + Two",
    description: "The Record and The Human Ledger together.",
    productSlugs: ["who-are-we-book-one-the-record", "who-are-we-book-two-the-human-ledger"],
    regularTotalCents: 4798,
    bundlePriceCents: 4299,
    live: false,
  },
  {
    slug: "before-the-bullet-set",
    name: "Before the Bullet — Three-Book Set",
    description: "Target: Black Messiah, A Dream Observed, and The Means They Feared.",
    productSlugs: ["before-the-bullet-target-black-messiah", "before-the-bullet-a-dream-observed", "before-the-bullet-the-means-they-feared"],
    regularTotalCents: 5997,
    bundlePriceCents: 5399,
    live: false,
  },
  {
    slug: "vnari-trilogy",
    name: "The Seven Suns of the V’Nari Trilogy",
    description: "A World Awake, A World Revealed, and A World Remembered.",
    productSlugs: ["the-seven-suns-of-the-vnari-a-world-awake-second-edition", "the-seven-suns-of-the-vnari-a-world-revealed-second-edition", "the-seven-suns-of-the-vnari-a-world-remembered-second-edition"],
    regularTotalCents: 5697,
    bundlePriceCents: 5099,
    live: false,
  },
  {
    slug: "grounds-set",
    name: "GROUNDS — Harlem + Bed-Stuy",
    description: "The first two GROUNDS place histories together.",
    productSlugs: ["grounds-harlem", "grounds-bed-stuy"],
    regularTotalCents: 3598,
    bundlePriceCents: 3199,
    live: false,
  },
  {
    slug: "consonance-fiction-set",
    name: "Consonance Fiction — Three-Book Set",
    description: "MATRIARCH: BF1, UNCROSSED, and Among the Reeds.",
    productSlugs: ["matriarch-bf1", "uncrossed", "among-the-reeds"],
    regularTotalCents: 5097,
    bundlePriceCents: 4599,
    live: false,
  },
];

export function getPublishingBundle(slug: string) {
  return PUBLISHING_BUNDLES.find((bundle) => bundle.slug === slug);
}
