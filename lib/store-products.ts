import { getProduct, STORE_PRODUCTS } from "@/lib/catalog";
import { MALCOLM_PRODUCT } from "@/lib/malcolm";\nimport { HAMPTON_PRODUCT } from "@/lib/hampton";

export function getStoreProduct(slug: string) {
  if (slug === MALCOLM_PRODUCT.slug) return MALCOLM_PRODUCT;\n  if (slug === HAMPTON_PRODUCT.slug) return HAMPTON_PRODUCT;\n  return getProduct(slug);
}

export function getStoreProducts() {
  return [...STORE_PRODUCTS, MALCOLM_PRODUCT, HAMPTON_PRODUCT];
}
