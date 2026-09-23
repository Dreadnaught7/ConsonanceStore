export function storeAsset(src: string) {
  if (!src) return src;
  if (src.startsWith("data:") || /^https?:\/\//i.test(src)) return src;
  if (src.startsWith("/store/")) return src;
  if (src.startsWith("/")) return "/store" + src;
  return "/store/" + src;
}
