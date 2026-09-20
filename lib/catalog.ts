export type Provider = "lulu" | "ingram_manual";

export type StoreProduct = {
  slug: string;
  titleId: string;
  name: string;
  subtitle?: string;
  format: string;
  priceCents: number;
  currency: "usd";
  stripeProductId: string;
  stripePriceId: string;
  provider: Provider;
  providerProjectId?: string;
  isbn?: string;
  pageCount?: number;
  podPackageId?: string;
  description: string;
  availableForDirectCheckout: boolean;
};

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    slug: "the-air-was-safe",
    titleId: "CP-BK-911-001",
    name: "The Air Was Safe",
    subtitle: "How Government Certainty Outran the Evidence After September 11",
    format: "Paperback · US Trade 6 × 9 · B&W · Matte",
    priceCents: 1599,
    currency: "usd",
    stripeProductId: "prod_VI52lJDTWcUKzq",
    stripePriceId: "price_1UHUsRCo4zEKqUT5FsHieBjb",
    provider: "lulu",
    providerProjectId: "zmv7j6r",
    pageCount: 82,
    podPackageId: "0600X0900.BW.STD.PB.060UW444.MXX",
    description:
      "A documentary examination of how government certainty about lower Manhattan air quality outran the evidence after September 11.",
    availableForDirectCheckout: true,
  },
  {
    slug: "before-the-bullet-target-black-messiah",
    titleId: "CP-BK-BTB-001",
    name: "Before the Bullet: Target: Black Messiah",
    format: "Hardcover",
    priceCents: 3499,
    currency: "usd",
    stripeProductId: "prod_VI52OVkh01igDW",
    stripePriceId: "price_1UHV87Co4zEKqUT5XA4GzH9u",
    provider: "ingram_manual",
    isbn: "9798182772709",
    pageCount: 242,
    description:
      "A documentary narrative on Fred Hampton, coalition-building, surveillance, infiltration, and the documented machinery that moved against him.",
    availableForDirectCheckout: false,
  },
];

export function getProduct(slug: string) {
  return STORE_PRODUCTS.find((product) => product.slug === slug);
}

export function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
