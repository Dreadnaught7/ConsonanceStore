import { getProduct, STORE_PRODUCTS } from "@/lib/catalog";
import { MALCOLM_PRODUCT } from "@/lib/malcolm";
import { HAMPTON_PRODUCT } from "@/lib/hampton";

export function getStoreProduct(slug: string) {
  if (slug === MALCOLM_PRODUCT.slug) return MALCOLM_PRODUCT;
  if (slug === HAMPTON_PRODUCT.slug) return HAMPTON_PRODUCT;
  return getProduct(slug);
}

export function getStoreProducts() {
  return [...STORE_PRODUCTS, MALCOLM_PRODUCT, HAMPTON_PRODUCT];
}
