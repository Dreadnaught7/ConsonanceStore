# Square Commerce Integration

Consonance Publishing uses Square as the direct-sales payment processor and Lulu as the print fulfillment provider.

## Flow

1. Storefront collects the shipping address and quantity.
2. Lulu returns the available shipping methods and cost.
3. The storefront creates a Square-hosted checkout link.
4. The book line item uses its Square Catalog variation so Square is the transaction-side price source.
5. The checkout route rejects the sale if Square's catalog price and the Consonance reader price do not match.
6. Square payment webhooks update the internal order record.
7. Lulu fulfillment remains gated until payment webhook verification and production credentials are confirmed.
8. QuickBooks is the accounting system of record for title-level revenue and costs.

## Production environment

Required server-side values:

- SQUARE_ACCESS_TOKEN
- SQUARE_LOCATION_ID
- SQUARE_WEBHOOK_SIGNATURE_KEY
- SQUARE_WEBHOOK_NOTIFICATION_URL
- SQUARE_API_VERSION=2026-09-16

Never commit credentials to the repository.

Webhook endpoint:

https://consonanceintelligence.com/store/api/square-webhook

Subscribe to:

- payment.updated

## Tax gate

Square checkout is configured to request automatic catalog taxes. Direct checkout must not be enabled until the seller's Square Catalog tax configuration has been reviewed and tested for the intended sales jurisdictions.

## Launch gate

Do not replace a Lulu purchase link with Square direct checkout until all of the following pass:

- Square catalog title/variation exists.
- Reader price matches Square catalog price.
- Lulu production package and print files are complete.
- Shipping quote succeeds.
- Square credentials are present in the production runtime.
- Webhook signature validation succeeds.
- A completed payment updates the order record.
- Fulfillment behavior is tested.
- QuickBooks product price matches the reader price.
