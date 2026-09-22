import type { StoreProduct } from "@/lib/catalog";

const MALCOLM_COVER = "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/Before_the_Bullet_The_Means_They_Feared_FRONT_COVER.jpg";

export const MALCOLM_PRODUCT: StoreProduct = {
  slug: "before-the-bullet-the-means-they-feared",
  name: "Before the Bullet: The Means They Feared",
  subtitle: "Malcolm X and the Record Before February 21, 1965",
  format: "Paperback · 6 × 9 · 240 pages · Direct edition",
  priceLabel: "$24.99",
  category: "history",
  coverImage: MALCOLM_COVER,
  description: "Before the Bullet: The Means They Feared reconstructs Malcolm X through the documented record that existed before February 21, 1965. It follows the man before the mythology hardened: Malcolm Little, prisoner, minister, organizer, national spokesman, dissenter, traveler, institution-builder, and an increasingly independent political voice.\n\nThe book traces his rise within the Nation of Islam, the public speaking and organizing that made him one of the most recognizable Black leaders in the country, his break with Elijah Muhammad and the Nation, and the organizations he built afterward. It also follows his international travel and the widening language of human rights that marked his final year.\n\nGovernment records are part of that story because government surveillance was part of that story. FBI files and other archival material document sustained official attention to Malcolm X, his organizations, his speeches, his travel, and the threats and tensions surrounding him. The Means They Feared uses those records as evidence, not as narration from an all-knowing state. Every file has a maker, a purpose, a frame, and limits.\n\nThis volume deliberately stops at the boundary of February 21, 1965. It does not use the assassination to explain backward, and it does not collapse every unresolved question into a theory. Post-assassination investigations, later testimony, disputed evidence, and competing explanations belong to the later Codex. Here, the task is narrower and harder: stay with Malcolm while he is alive, follow what the record can actually support, and understand the pressure building before the bullet.",
  checkoutUrl:
    "https://svc.lulu.com/?items=4571577e-afab-488d-9a02-3fcfc68b4d54",
  buyButtonId: "4571577e-afab-488d-9a02-3fcfc68b4d54",
  buyButtonVariant: "product-showcase",
  priceCents: 2499,
  currency: "usd",
  stripeProductId: "prod_VIitadQhuLTQ96",
  stripePriceId: "price_1UI7RcCo4zEKqUT5QVLjaowj",
  provider: "lulu",
  titleId: "CP-BK-BTB-MX-001",
  pageCount: 240,
  podPackageId: "0600X0900.BW.STD.PB.060UW444.MXX",
  interiorUrl: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/Before_the_Bullet_The_Means_They_Feared_LULU_INTERIOR_6x9_240pp.pdf",
  coverUrl: "https://gvpbolcmawwjufuvjmqa.supabase.co/storage/v1/object/public/lulu-print-files/Before_the_Bullet_The_Means_They_Feared_LULU_COVER_240pp.pdf",
  availableForDirectCheckout: true,
};
