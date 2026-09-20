export type StoreProduct = {
  slug: string;
  name: string;
  subtitle?: string;
  format: string;
  priceLabel: string;
  description: string;
  checkoutUrl: string;
  buyButtonId?: string;
  buyButtonVariant?: "button-only" | "product-showcase";
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
    coverImage: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/who-are-we-front.jpg",
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
    coverImage: "/covers/resonance-method.jpg",
    description: "Most bad decisions begin before the action. We mistake a signal for a conclusion, react to the story already in our heads, and call the result certainty. The Resonance Method offers another way.\n\nDrawing from Eric J. Finkley’s life across Brooklyn, institutional environments, Airborne training, track inspection, welding, field service, family responsibility, and the development of Resonance itself, this book turns observation into a repeatable practice for real life.\n\nThe method teaches readers to observe before interpreting, treat dissonance as information, use a Buffer before consequential action, anchor what must remain true, choose proportionate action, and let outcomes answer back through Echo. RE Life carries the same practice into the body through stillness, breath, movement, martial awareness, recovery, and reflection.\n\nThis is not a system for forcing calm, eliminating conflict, or pretending certainty. It is a disciplined way to stay in contact with reality while deciding what to do next. The book includes practical exercises, founder-life examples, applications across work and relationships, a 30-day practice program, and a plain-language back index for the Resonance vocabulary.",
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
    coverImage: "/covers/grounds-harlem.jpg",
    description: "Harlem was Harlem before America figured out what it wanted Harlem to mean. Before the Apollo lights, before Malcolm, before the Harlem Renaissance became history, the Ground was already changing—through migration, housing, transit, culture, politics, business, disinvestment, survival, reinvestment, and memory.\n\nGROUNDS: Harlem follows the neighborhood across generations, from its early land and transit history through the Great Migration, the Harlem Renaissance, 125th Street, the Apollo, Black political power, the drug era, fashion, gentrification, redevelopment, and the living Harlem of today.\n\nThis is not a postcard Harlem and not a classroom summary. It is Harlem as Ground: lived, argued over, built, broken, protected, bought, remembered, and remade. Eric J. Finkley writes from connection, not claim, bringing documentary history and lived observation together without flattening Harlem into one clean story.\n\nHistory walks here.",
    checkoutUrl:
      "https://svc.lulu.com/?items=2e105102-6127-43b3-a019-9d0d2dbf9bf1",
    buyButtonId: "2e105102-6127-43b3-a019-9d0d2dbf9bf1",
    buyButtonVariant: "button-only",
    availableForDirectCheckout: false,
  },
  {
    slug: "the-air-was-safe",
    name: "The Air Was Safe",
    subtitle: "What Officials Knew, What the Public Was Told, and What the Records Reveal",
    format: "Paperback · US Trade 6 × 9 · B&W · Matte",
    priceLabel: "$15.99",
    category: "history",
    coverImage: "/covers/air-was-safe.jpg",
    description: "The Air Was Safe examines one of the most consequential questions left by the aftermath of September 11, 2001: what did government agencies know about environmental hazards in Lower Manhattan, what did they tell the public, and when?\n\nDrawing on public records, environmental data, oversight reports, archival material, and newly released municipal documents, Eric J. Finkley reconstructs the gap between official reassurance and the evidence being collected behind the scenes.\n\nThe book follows the record rather than the mythology, separating documented fact from inference and showing how public communication, institutional decision-making, and environmental risk intersected in the days, weeks, and years after the attacks.\n\nThis is not a conspiracy narrative. It is a records-based investigation into government knowledge, public assurances, accountability, and the long consequences of decisions made under extraordinary pressure. For readers of investigative journalism, public-health history, government accountability, environmental policy, and modern New York history.",
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
