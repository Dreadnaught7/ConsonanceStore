# Square Sandbox Validation

Validation date: 2026-09-28

Environment: Square Sandbox

## Catalog

The complete 15-title Consonance Publishing reader-price catalog was mirrored into Square Sandbox.

Result:
- 15 items requested
- 30 Square object mappings created (item + paperback variation per title)

## Checkout

A Square-hosted Checkout payment link was created successfully from a sandbox catalog variation.

Result: PASS

## Successful card payment

Square test payment source: sandbox success token.

Result:
- payment status: COMPLETED

## Declined card

Square's sandbox declined-card test source was submitted.

Result:
- Square returned an error as expected
- no successful payment was created

## Refund

A full sandbox refund was issued against the completed test payment.

Result:
- initial refund state: PENDING
- subsequent refund state: COMPLETED

## What this proves

The Square credentials and permissions currently support:
- Catalog API writes
- Checkout payment-link creation
- Payments API success handling
- Payments API decline handling
- Refunds API

This does not by itself validate Consonance's production Square webhook -> order ledger -> Lulu fulfillment chain. Production direct book checkout remains gated pending the New York sales-tax approval/configuration and a controlled end-to-end live transaction.
