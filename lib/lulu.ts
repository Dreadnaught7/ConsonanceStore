import type { FulfillmentProvider, ShippingAddress, ShippingOption } from "@/lib/types";

const DEFAULT_BASE_URL = "https://api.lulu.com";

function baseUrl() {
  return (process.env.LULU_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, "");
}

function normalizeQuoteAddress(address: ShippingAddress) {
  return {
    country: address.country.toUpperCase(),
    city: address.city,
    is_business: Boolean(address.isBusiness),
    is_postbox: false,
    name: address.name,
    organization: address.organization || "",
    phone_number: address.phone || "",
    postcode: address.postcode,
    state: address.state || "",
    street1: address.street1,
    street2: address.street2 || "",
  };
}

export const luluProvider: FulfillmentProvider = {
  async quoteShipping(product, quantity, address) {
    if (!product.pageCount || !product.podPackageId) {
      return {
        ok: false,
        code: "NOT_CONFIGURED",
        message: "This edition is missing its Lulu production configuration.",
      };
    }

    try {
      const response = await fetch(`${baseUrl()}/shipping-options/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currency: "USD",
          line_items: [
            {
              page_count: product.pageCount,
              pod_package_id: product.podPackageId,
              quantity,
            },
          ],
          shipping_address: normalizeQuoteAddress(address),
        }),
        cache: "no-store",
      });

      if (!response.ok) {
        console.error("[Lulu shipping quote]", response.status, await response.text());
        return {
          ok: false,
          code: "PROVIDER_ERROR",
          message: "Shipping could not be quoted for that destination.",
        };
      }

      const raw = (await response.json()) as Array<{
        id?: string | number;
        level?: string;
        cost_excl_tax?: string;
        currency?: string;
        min_delivery_date?: string;
        max_delivery_date?: string;
      }>;

      const options = raw
        .map((option): ShippingOption | null => {
          const amount = Number.parseFloat(option.cost_excl_tax || "");
          if (!Number.isFinite(amount)) return null;
          return {
            id: String(option.id ?? option.level ?? crypto.randomUUID()),
            level: option.level || "MAIL",
            label: option.level || "Shipping",
            amountCents: Math.round(amount * 100),
            currency: (option.currency || "USD").toUpperCase(),
            minDeliveryDate: option.min_delivery_date,
            maxDeliveryDate: option.max_delivery_date,
            raw: option,
          };
        })
        .filter((option): option is ShippingOption => option !== null)
        .sort((a, b) => a.amountCents - b.amountCents);

      if (!options.length) {
        return {
          ok: false,
          code: "PROVIDER_ERROR",
          message: "No shipping options were returned for that destination.",
        };
      }

      return { ok: true, options };
    } catch (error) {
      console.error("[Lulu shipping quote]", error);
      return {
        ok: false,
        code: "PROVIDER_ERROR",
        message: error instanceof Error ? error.message : "Shipping quote failed.",
      };
    }
  },
};
