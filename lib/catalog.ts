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
  interiorUrl?: string;
  coverUrl?: string;
  availableForDirectCheckout?: boolean;
};

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    slug: "who-are-we-book-two-the-human-ledger",
    name: "WHO ARE WE?",
    subtitle: "Slavery, Its Descendants, and the Making of America — Book Two: The Human Ledger",
    format: "Paperback · 6 × 9 · 143 pages · Direct edition",
    priceLabel: "$29.99",
    category: "history",
    coverImage: "/store/api/book-two-cover",
    description: "What happens when the historical record does not simply describe a human being—but assigns that person a price?\n\nWHO ARE WE? — Book Two: The Human Ledger examines the economic machinery of American slavery through the records it left behind: valuations, mortgages, insurance policies, sales, inheritance documents, hiring agreements, compensation claims, shipping manifests, land records, and family archives. But this is not a book about numbers with people attached. It is about people whose lives were forced into systems of value—and what becomes visible when those records are reconstructed around the human being instead of the transaction.\n\nFrom Tobias Henson and Venture Smith to families divided by estates, people used as collateral, workers hiring out their labor, freed people purchasing land, and descendants rebuilding wealth and continuity, The Human Ledger follows the record beyond enslavement and into freedom, property, wages, inheritance, family, and memory.\n\nEach chapter treats the ledger as evidence, not truth. Prices reveal what institutions attempted to extract from human lives. They do not measure human worth. The ledger is evidence. The human being is the subject. No price will be allowed to stand in for the person.",
    checkoutUrl:
      "https://svc.lulu.com/?items=04519192-4cf0-464a-9a41-863e6db8dbea",
    buyButtonId: "04519192-4cf0-464a-9a41-863e6db8dbea",
    buyButtonVariant: "product-showcase",
    priceCents: 2999,
    currency: "usd",
    provider: "lulu",
    titleId: "CP-BK-WAW-002",
    pageCount: 143,
    podPackageId: "0600X0900.BW.STD.PB.060UW444.MXX",
    interiorUrl: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/WHO_ARE_WE_Book_Two_The_Human_Ledger_FINAL_MANUSCRIPT_FULL_BLEED.pdf",
    coverUrl: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/WHO_ARE_WE_Book_Two_The_Human_Ledger_LULU_FULL_COVER_300PPI_QA.pdf",
    availableForDirectCheckout: false,
  },
  {
    slug: "before-the-bullet-a-dream-observed",
    name: "Before the Bullet: A Dream Observed",
    subtitle: "Martin Luther King Jr. and the America That Watched Him",
    format: "Paperback · 6 × 9 · 230 pages · Direct edition",
    priceLabel: "$24.99",
    category: "history",
    coverImage: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/Before_the_Bullet_A_Dream_Observed_FRONT_COVER.jpg",
    description: "Before the Bullet: A Dream Observed returns to Martin Luther King Jr. before memory turned him into a monument. It follows the public figure, the organizer, the strategist, the minister, and the man moving through an America that celebrated his moral language while institutions also watched, recorded, challenged, and surveilled him.\n\nThe book traces the evolution of King’s work from the civil-rights campaigns that made him internationally known through his widening focus on voting rights, economic inequality, poverty, and the Vietnam War. Rather than treating his final years as a footnote to the “I Have a Dream” speech, A Dream Observed places those years at the center of the story and asks what changed as King’s critique expanded beyond segregation.\n\nBuilt as documentary history, the narrative follows speeches, public records, government files, archival material, and the chronology of the period. It separates what can be established from what has been repeated, and it keeps attention on the pressure surrounding King while he was still alive rather than allowing the assassination to swallow the life that came before it.\n\nThis is a book about what America heard, what it resisted, what its institutions recorded, and what King continued to say anyway. Before the bullet, there was a voice. Before the monument, there was movement. A Dream Observed stays with that movement long enough to see the man before history froze the image.",
    checkoutUrl:
      "https://svc.lulu.com/?items=13ddeb0c-1c42-4a02-9f4d-ce20520b6ad8",
    buyButtonId: "13ddeb0c-1c42-4a02-9f4d-ce20520b6ad8",
    buyButtonVariant: "product-showcase",
    priceCents: 2499,
    currency: "usd",
    stripeProductId: "prod_VIit77Na9Ss6CX",
    stripePriceId: "price_1UI7U3Co4zEKqUT5OPNH0fx7",
    provider: "lulu",
    titleId: "CP-BK-BTB-ADO-001",
    pageCount: 230,
    podPackageId: "0600X0900.BW.STD.PB.060UW444.MXX",
    interiorUrl: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/Before_the_Bullet_A_Dream_Observed_LULU_INTERIOR_FULL_BLEED_6.25x9.25_230pp.pdf",
    coverUrl: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/Before_the_Bullet_A_Dream_Observed_LULU_FULL_COVER_6x9_230pp.pdf",
    availableForDirectCheckout: true,
  },
  {
    slug: "who-are-we-book-one-the-record",
    name: "WHO ARE WE?",
    subtitle: "Slavery, Its Descendants, and the Making of America — Book One: The Record",
    format: "Paperback · 8.5 × 11 · 251 pages · Direct edition",
    priceLabel: "$29.99",
    category: "history",
    coverImage: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/who-are-we-front.jpg",
    description: "WHO ARE WE? — Slavery, Its Descendants, and the Making of America begins with a simple problem: records often preserve the transaction more clearly than the person. Book One: The Record works in the opposite direction. It starts with the surviving evidence and asks how much of the human story can be reconstructed without allowing a price, inventory entry, census line, estate file, or legal category to stand in for a life.\n\nThe book follows enslaved people through court records, probate files, bills of sale, petitions, advertisements, census material, family records, land documents, military records, and archival collections. Each source is treated as evidence with limits. Names are connected cautiously. Family relationships are distinguished from hypotheses. Contradictions, missingness, and uncertainty remain visible instead of being smoothed away.\n\nAt the center of the project is a larger question of American identity. Slavery was not an isolated institution sitting outside the nation’s development. Its records intersect with law, finance, inheritance, land, labor, migration, family formation, and public memory. Book One reconstructs those intersections while refusing to reduce descendants to a single historical experience or to turn genealogy into spectacle.\n\nWHO ARE WE? is both a history book and a demonstration of the larger Consonance archival method: trace the claim, preserve the source, reconnect the person, widen the frame, and leave room for correction. The goal is not to tell readers what they must conclude. It is to put more of the record back in front of them — with the people inside it.",
    checkoutUrl:
      "https://svc.lulu.com/?items=d8b832c3-6f2e-44e3-890f-1bd0777d6731",
    priceCents: 2999,
    currency: "usd",
    stripeProductId: "prod_VIitez3GG2A7Lo",
    stripePriceId: "price_1UI7RqCo4zEKqUT5eB5jhYYR",
    provider: "lulu",
    titleId: "CP-BK-WAW-001",
    pageCount: 251,
    podPackageId: "0850X1100.BW.STD.PB.060UW444.MXX",
    interiorUrl: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/WHO_ARE_WE_Book_One_The_Record_FINAL.pdf",
    coverUrl: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/WHO_ARE_WE_Book_One_The_Record_LULU_FULL_WRAP_251pp.pdf",
    availableForDirectCheckout: true,
  },
  {
    slug: "the-resonance-method-second-edition",
    name: "The Resonance Method",
    subtitle: "Second Edition",
    format: "Paperback · Direct edition",
    priceLabel: "$16.99",
    category: "method",
    coverImage: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/resmethod.jpg",
    description: "Most bad decisions begin before the action. We mistake a signal for a conclusion, react to the story already in our heads, and call the result certainty. The Resonance Method offers another way.\n\nDrawing from Eric J. Finkley’s life across Brooklyn, institutional environments, Airborne training, track inspection, welding, field service, family responsibility, and the development of Resonance itself, this book turns observation into a repeatable practice for real life. It is built around a simple discipline: notice what is happening before deciding what it means.\n\nThe method teaches readers to observe before interpreting, treat dissonance as information, use a Buffer before consequential action, anchor what must remain true, choose proportionate action, and let outcomes answer back through Echo. RE Life carries the same practice into the body through stillness, breath, movement, martial awareness, recovery, and reflection. The framework is meant to be used — in work, conflict, relationships, planning, creativity, and ordinary decisions where reaction often outruns understanding.\n\nThis is not a system for forcing calm, eliminating conflict, or pretending certainty. It is a disciplined way to stay in contact with reality while deciding what to do next. The Second Edition includes practical exercises, founder-life examples, applications across work and relationships, a 30-day practice program, and a plain-language back index for the Resonance vocabulary. The aim is coherence, not perfection: observe clearly, act deliberately, listen to the echo, and adjust.",
    checkoutUrl:
      "https://svc.lulu.com/?items=c36f44ae-dc16-451e-86ad-99929d9c2186",
    priceCents: 1699,
    currency: "usd",
    stripeProductId: "prod_VIitghHTjiYtJl",
    stripePriceId: "price_1UI7RsCo4zEKqUT5c5wMpzoh",
    provider: "lulu",
    titleId: "CP-BK-RM2-001",
    pageCount: 128,
    podPackageId: "0600X0900.BW.STD.PB.060UW444.MXX",
    interiorUrl: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/The_Resonance_Method_Second_Edition_PRINT_INTERIOR_6x9_128pp.pdf",
    coverUrl: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/The_Resonance_Method_Second_Edition_LULU_COVER_6x9_128pp.pdf",
    availableForDirectCheckout: true,
  },
  {
    slug: "grounds-harlem",
    name: "GROUNDS: Harlem",
    subtitle: "A Place. A People. A Longer Story.",
    format: "Paperback · Documentary history",
    priceLabel: "$19.99",
    category: "history",
    coverImage: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/grounds%20harlem.png",
    description: "Harlem was Harlem before America figured out what it wanted Harlem to mean. Before the Apollo lights, before Malcolm, before the Harlem Renaissance became history, the Ground was already changing — through migration, housing, transit, culture, politics, business, disinvestment, survival, reinvestment, and memory.\n\nGROUNDS: Harlem follows the neighborhood across generations, from its earlier land and transit history through the Great Migration, the Harlem Renaissance, 125th Street, the Apollo, Black political power, the drug era, fashion, redevelopment, gentrification, and the living Harlem of today. The book treats the neighborhood not as a backdrop for famous names but as a place with its own systems, pressures, routes, institutions, blocks, businesses, and memory.\n\nThe story moves between documented history and lived observation. Eric J. Finkley writes from connection, not claim: Harlem is not presented as a single community with one voice, and the book does not flatten competing experiences into one clean narrative. The point is to keep the Ground visible — who built on it, who moved through it, who was displaced from it, who protected it, who profited from it, and who kept making culture there.\n\nThis is not postcard Harlem and not a classroom summary. It is Harlem as place, evidence, argument, and inheritance: lived, argued over, built, broken, protected, bought, remembered, and remade. History walks here.",
    checkoutUrl:
      "https://svc.lulu.com/?items=2e105102-6127-43b3-a019-9d0d2dbf9bf1",
    buyButtonId: "2e105102-6127-43b3-a019-9d0d2dbf9bf1",
    buyButtonVariant: "button-only",
    priceCents: 1999,
    currency: "usd",
    stripeProductId: "prod_VI7s2XuZA7y9UI",
    stripePriceId: "price_1UI7RtCo4zEKqUT5BflH0lgj",
    provider: "lulu",
    titleId: "CP-BK-GRH-001",
    pageCount: 50,
    podPackageId: "0550X0850.BW.STD.PB.060UW444.MXX",
    interiorUrl: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/GROUNDS_Harlem_Lulu_5.5x8.5_Interior_FINAL.pdf",
    coverUrl: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/GROUNDS_Harlem_Lulu_5.5x8.5_Full_Wrap_50pp.pdf",
    availableForDirectCheckout: true,
  },
  {
    slug: "the-air-was-safe",
    name: "The Air Was Safe",
    subtitle: "What Officials Knew, What the Public Was Told, and What the Records Reveal",
    format: "Paperback · US Trade 6 × 9 · B&W · Matte",
    priceLabel: "$15.99",
    category: "history",
    coverImage: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/the-air-was-safe-front.jpg",
    description: "The Air Was Safe examines one of the most consequential questions left by the aftermath of September 11, 2001: what did government agencies know about environmental hazards in Lower Manhattan, what did they tell the public, and when?\n\nDrawing on public records, environmental data, oversight reports, archival material, and municipal documents, Eric J. Finkley reconstructs the relationship between the information being collected after the World Trade Center collapse and the public assurances being issued at the same time. The book follows the record closely, including the limits and qualifications that did — and did not — appear in official communications.\n\nThe investigation is not built around a conspiracy claim. It is built around documentation. EPA Office of Inspector General reports later examined whether available monitoring data supported major public communications and found that EPA’s broad reassurance to the public did not always convey important qualifications about exposure, population, indoor versus outdoor conditions, and particular pollutants. The book places those official findings alongside the developing environmental record and the decisions made under extraordinary pressure.\n\nThe Air Was Safe asks readers to look at how institutions communicate risk when certainty is incomplete, how language can narrow or widen public understanding, and what accountability looks like when the consequences unfold over years. It is a records-based investigation into government knowledge, public reassurance, environmental health, and the long memory of New York after September 11.",
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
    interiorUrl: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/The_Air_Was_Safe_Lulu_US_Trade_6x9_Interior_UPLOAD%20(1).pdf",
    coverUrl: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/The_Air_Was_Safe_Lulu_Paperback_Cover_6x9_82pp_UPLOAD%20(1).pdf",
    availableForDirectCheckout: true,
  },
];

export function getProduct(slug: string) {
  return STORE_PRODUCTS.find((product) => product.slug === slug);
}
