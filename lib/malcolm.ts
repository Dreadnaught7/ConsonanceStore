import type { StoreProduct } from "@/lib/catalog";

const MALCOLM_COVER_PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">
    <rect width="600" height="900" fill="#090909"/>
    <rect x="0" y="0" width="600" height="12" fill="#8f1d1d"/>
    <text x="48" y="105" fill="#d8d0c2" font-family="Arial,Helvetica,sans-serif" font-size="30" font-weight="700" letter-spacing="3">BEFORE THE BULLET</text>
    <line x1="48" y1="135" x2="552" y2="135" stroke="#8f1d1d" stroke-width="3"/>
    <text x="48" y="250" fill="#d8d0c2" font-family="Arial,Helvetica,sans-serif" font-size="64" font-weight="800">THE MEANS</text>
    <text x="48" y="322" fill="#d8d0c2" font-family="Arial,Helvetica,sans-serif" font-size="64" font-weight="800">THEY FEARED</text>
    <text x="48" y="390" fill="#b9b1a5" font-family="Arial,Helvetica,sans-serif" font-size="22">MALCOLM X AND THE RECORD BEFORE</text>
    <text x="48" y="424" fill="#b9b1a5" font-family="Arial,Helvetica,sans-serif" font-size="22">FEBRUARY 21, 1965</text>
    <rect x="48" y="520" width="504" height="180" fill="#171717" stroke="#8f1d1d" stroke-width="2"/>
    <text x="300" y="615" text-anchor="middle" fill="#8f1d1d" font-family="Arial,Helvetica,sans-serif" font-size="24" font-weight="700">DOCUMENTARY NARRATIVE</text>
    <text x="48" y="810" fill="#d8d0c2" font-family="Arial,Helvetica,sans-serif" font-size="25" font-weight="700">ERIC J. FINKLEY</text>
  </svg>`);

export const MALCOLM_PRODUCT: StoreProduct = {
  slug: "before-the-bullet-the-means-they-feared",
  name: "Before the Bullet: The Means They Feared",
  subtitle: "Malcolm X and the Record Before February 21, 1965",
  format: "Paperback · 6 × 9 · 240 pages · Direct edition",
  priceLabel: "$18.99",
  category: "history",
  coverImage: MALCOLM_COVER_PLACEHOLDER,
  description:
    "Before the Bullet: The Means They Feared reconstructs Malcolm X through the documented record that existed before February 21, 1965. The book follows his transformation, organizing, international travel, government surveillance, rupture with the Nation of Islam, and the accelerating pressure of his final months while keeping the historical record sovereign. Post-assassination investigations, later testimony, disputed evidence, and competing theories are reserved for Before the Bullet: Codex.",
  checkoutUrl:
    "https://svc.lulu.com/?items=4571577e-afab-488d-9a02-3fcfc68b4d54",
  buyButtonId: "4571577e-afab-488d-9a02-3fcfc68b4d54",
  buyButtonVariant: "product-showcase",
  provider: "lulu",
  pageCount: 240,
  availableForDirectCheckout: true,
};
