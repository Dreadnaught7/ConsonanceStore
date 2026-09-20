import type { StoreProduct } from "@/lib/catalog";
import type { FulfillmentProvider } from "@/lib/types";
import { luluProvider } from "@/lib/lulu";

const notConfiguredProvider: FulfillmentProvider = {
  async quoteShipping() {
    return {
      ok: false,
      code: "NOT_CONFIGURED",
      message: "Direct fulfillment is not configured for this edition yet.",
    };
  },
};

export function getFulfillmentProvider(product: StoreProduct): FulfillmentProvider {
  return product.provider === "lulu" ? luluProvider : notConfiguredProvider;
}
