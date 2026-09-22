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
  description:
    "Before the Bullet: The Means They Feared reconstructs Malcolm X through the documented record that existed before February 21, 1965. The book follows his transformation, organizing, international travel, government surveillance, rupture with the Nation of Islam, and the accelerating pressure of his final months while keeping the historical record sovereign. Post-assassination investigations, later testimony, disputed evidence, and competing theories are reserved for Before the Bullet: Codex.",
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
