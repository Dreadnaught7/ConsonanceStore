import { getProduct, STORE_PRODUCTS } from "@/lib/catalog";
import { MALCOLM_PRODUCT } from "@/lib/malcolm";

export function getStoreProduct(slug: string) {
  return slug === MALCOLM_PRODUCT.slug ? MALCOLM_PRODUCT : getProduct(slug);
}

export function getStoreProducts() {
  return [...STORE_PRODUCTS, MALCOLM_PRODUCT];
}
