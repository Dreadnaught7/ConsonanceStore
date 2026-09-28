export const CONSONANCE_COMMERCE_BASE =
  "https://consonance-commerce.ericjfinkley.workers.dev";

const DIRECT_COMMERCE_SLUGS = new Set([
  "who-are-we-book-one-the-record",
  "who-are-we-book-two-the-human-ledger",
  "before-the-bullet-a-dream-observed",
  "before-the-bullet-the-means-they-feared",
  "the-resonance-method-second-edition",
  "grounds-harlem",
  "the-air-was-safe",
]);

export function hasDirectCommerce(slug: string) {
  const launchReady = true;
  return launchReady && DIRECT_COMMERCE_SLUGS.has(slug);
}

export function directCommerceUrl(slug: string) {
  return `${CONSONANCE_COMMERCE_BASE}/book/${encodeURIComponent(slug)}`;
}
