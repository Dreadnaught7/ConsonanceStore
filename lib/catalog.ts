export type StoreProduct = {
  slug: string;
  name: string;
  subtitle?: string;
  format: string;
  priceLabel: string;
  description: string;
  checkoutUrl: string;
  coverImage: string;
  category: "history" | "method";
  titleId?: string;
  priceCents?: number;
  currency?: "usd";
  stripeProductId?: string;
  stripePriceId?: string;
  provider?: "lulu" | "ingram_manual";
  providerProjectId?: string;
  isbn?: string;
  pageCount?: number;
  podPackageId?: string;
  availableForDirectCheckout?: boolean;
};

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    slug: "who-are-we-book-one-the-record",
    name: "WHO ARE WE?",
    subtitle: "Slavery, Its Descendants, and the Making of America — Book One: The Record",
    format: "Paperback · 8.5 × 11 · 251 pages · Direct edition",
    priceLabel: "$29.99",
    category: "history",
    coverImage: "/covers/who-are-we.svg",
    description:
      "A record-driven reconstruction of enslaved people as human beings: reconnecting records to people, people to families, families to place, and those connections to the larger history of America.",
    checkoutUrl:
      "https://svc.lulu.com/?items=d8b832c3-6f2e-44e3-890f-1bd0777d6731",
    provider: "lulu",
    pageCount: 251,
    availableForDirectCheckout: true,
  },
  {
    slug: "the-resonance-method-second-edition",
    name: "The Resonance Method",
    subtitle: "Second Edition",
    format: "Paperback · Direct edition",
    priceLabel: "$16.99",
    category: "method",
    coverImage: "/covers/resonance-method.svg",
    description:
      "A practical framework for observing clearly, aligning with what is true, acting with intention, and learning from the echo of results.",
    checkoutUrl:
      "https://svc.lulu.com/?items=c36f44ae-dc16-451e-86ad-99929d9c2186",
    availableForDirectCheckout: false,
  },
  {
    slug: "grounds-harlem",
    name: "GROUNDS: Harlem",
    subtitle: "A Place. A People. A Longer Story.",
    format: "Paperback · Documentary history",
    priceLabel: "Buy direct",
    category: "history",
    coverImage: "/covers/grounds-harlem.svg",
    description:
      "Harlem as place, evidence, argument, and inheritance — tracing the ground before the legend and the systems that shaped the people.",
    checkoutUrl:
      "https://svc.lulu.com/?items=2e105102-6127-43b3-a019-9d0d2dbf9bf1",
    buyButtonId: "2e105102-6127-43b3-a019-9d0d2dbf9bf1",
    availableForDirectCheckout: false,
  },
  {
    slug: "the-air-was-safe",
    name: "The Air Was Safe",
    subtitle: "September 11 · Records · Public Assurance",
    format: "Paperback · US Trade 6 × 9 · B&W · Matte",
    priceLabel: "$15.99",
    category: "history",
    coverImage: "/covers/air-was-safe.svg",
    description:
      "A record-driven examination of what officials knew, what the public was told, and what the evidence revealed after September 11.",
    checkoutUrl:
      "https://svc.lulu.com/?items=2fc771d6-ffc7-4421-b062-93f85aea265b",
    titleId: "CP-BK-911-001",
    priceCents: 1599,
    currency: "usd",
    stripeProductId: "prod_VI52lJDTWcUKzq",
    stripePriceId: "price_1UHUsRCo4zEKqUT5FsHieBjb",
    provider: "lulu",
    providerProjectId: "zmv7j6r",
    pageCount: 82,
    podPackageId: "0600X0900.BW.STD.PB.060UW444.MXX",
    availableForDirectCheckout: true,
  },
];

export function getProduct(slug: string) {
  return STORE_PRODUCTS.find((product) => product.slug === slug);
}
