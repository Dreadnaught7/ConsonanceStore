export type StoreProduct = {
  slug: string;
  name: string;
  subtitle?: string;
  format: string;
  priceLabel: string;
  description: string;
  checkoutUrl: string;
  category: "history" | "method";
};

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    slug: "the-resonance-method-second-edition",
    name: "The Resonance Method",
    subtitle: "Second Edition",
    format: "Paperback · Direct edition",
    priceLabel: "$16.99",
    category: "method",
    description:
      "A practical framework for observing clearly, aligning with what is true, acting with intention, and learning from the echo of results.",
    checkoutUrl:
      "https://svc.lulu.com/?items=c36f44ae-dc16-451e-86ad-99929d9c2186",
  },
  {
    slug: "grounds-harlem",
    name: "GROUNDS: Harlem",
    subtitle: "A Place. A People. A Longer Story.",
    format: "Paperback · Documentary history",
    priceLabel: "Buy direct",
    category: "history",
    description:
      "Harlem as place, evidence, argument, and inheritance — tracing the ground before the legend and the systems that shaped the people.",
    checkoutUrl:
      "https://svc.lulu.com/?items=2e105102-6127-43b3-a019-9d0d2dbf9bf1",
  },
  {
    slug: "the-air-was-safe",
    name: "The Air Was Safe",
    subtitle: "September 11 · Records · Public Assurance",
    format: "Paperback · US Trade 6 × 9 · B&W · Matte",
    priceLabel: "$15.99",
    category: "history",
    description:
      "A record-driven examination of what officials knew, what the public was told, and what the evidence revealed after September 11.",
    checkoutUrl:
      "https://svc.lulu.com/?items=2fc771d6-ffc7-4421-b062-93f85aea265b",
  },
];

export function getProduct(slug: string) {
  return STORE_PRODUCTS.find((product) => product.slug === slug);
}
