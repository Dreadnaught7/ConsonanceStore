import type { StoreProduct } from "@/lib/catalog";

export type ShippingAddress = {
  name: string;
  email: string;
  phone: string;
  organization?: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  isBusiness?: boolean;
};

export type ShippingOption = {
  id: string;
  level: string;
  label: string;
  amountCents: number;
  currency: string;
  minDeliveryDate?: string;
  maxDeliveryDate?: string;
  raw?: unknown;
};

export type QuoteResult =
  | { ok: true; options: ShippingOption[] }
  | { ok: false; code: "NOT_CONFIGURED" | "PROVIDER_ERROR"; message: string };

export type FulfillmentProvider = {
  quoteShipping(
    product: StoreProduct,
    quantity: number,
    address: ShippingAddress
  ): Promise<QuoteResult>;
};
