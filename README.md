# Consonance Store

Public storefront for Consonance Publishing.

## Live shelf

- The Resonance Method — Second Edition
- GROUNDS: Harlem
- The Air Was Safe

The storefront uses a compact animated Next.js interface with direct Lulu checkout links.

## Stack

Next.js 14 · GitHub · direct Lulu fulfillment

The store repository remains separate from the Founder Dashboard.


## Publishing standards

### Interior QR catalog standard

Every new or revised Consonance Publishing book must include a tested QR code in the back matter linking to the public catalog at `https://consonanceintelligence.com/store`, with the printed URL shown as an alternative.

See `docs/INTERIOR_QR_CATALOG_STANDARD.md` for the production requirements.


## Cloudflare storefront deployment

Production storefront builds are configured for Cloudflare Workers from the `main` branch.
