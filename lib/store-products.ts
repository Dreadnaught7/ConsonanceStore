import { getProduct, STORE_PRODUCTS } from "@/lib/catalog";
import { MALCOLM_PRODUCT } from "@/lib/malcolm";
import { HAMPTON_PRODUCT } from "@/lib/hampton";
import { REEDS_PRODUCT } from "@/lib/reeds";

export function getStoreProduct(slug: string) {
  if (slug === MALCOLM_PRODUCT.slug) return MALCOLM_PRODUCT;
  if (slug === HAMPTON_PRODUCT.slug) return HAMPTON_PRODUCT;
  if (slug === REEDS_PRODUCT.slug) return REEDS_PRODUCT;
  return getProduct(slug);
}

export function getStoreProducts() {
  return [...STORE_PRODUCTS, REEDS_PRODUCT, MALCOLM_PRODUCT, HAMPTON_PRODUCT];
}
