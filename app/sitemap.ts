import type { MetadataRoute } from "next";
import { getStoreProducts } from "@/lib/store-products";

const BASE = "https://consonanceintelligence.com/store";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: BASE + "/press", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: BASE + "/institutions", lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    ...getStoreProducts().map((book) => ({
      url: BASE + "/books/" + book.slug,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}