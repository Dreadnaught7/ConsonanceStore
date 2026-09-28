# Commerce Accounting Map

QuickBooks is the accounting system of record for Consonance Publishing commerce.

## Revenue

Use title-level non-inventory products for book revenue. Every current reader-price title should have a matching QuickBooks product/SKU.

Recommended revenue lane:

- Book Sales — Consonance Publishing

## Cost lanes

Record transaction costs separately from gross book revenue so title margin remains measurable.

Recommended expense / cost categories:

- Lulu Print Production
- Lulu Fulfillment / Shipping
- Square Processing Fees
- Refunds and Chargebacks
- Packaging / Handling
- Promotional / Review Copies
- Merchant Adjustments

## Reconciliation fields

Every direct order record should preserve:

- internal order ID;
- title SKU;
- quantity;
- gross book subtotal;
- shipping charged;
- tax collected;
- Square order ID;
- Square payment ID;
- Square processing fee;
- refund amount/status;
- Lulu print-job ID;
- Lulu production charge;
- Lulu shipping charge;
- final order status.

## Margin formula

Net title contribution =
book revenue
- print production
- Square processing fee
- absorbed shipping/handling
- refunds/chargebacks

Customer-paid sales tax is not book revenue.

Customer-paid shipping should be reported separately from book revenue when practical.

## Posting discipline

Do not net payment-processing fees directly against title revenue in the source order record. Preserve gross revenue and post fees separately so QuickBooks can report both sales and transaction cost.

## Current implementation state

QuickBooks products have been created for the active reader-price catalog. Automated posting of Square fees, Lulu production expense, shipping expense, and refunds still requires a transaction-sync layer or an approved bookkeeping workflow.
