# Consonance Render Engine

This branch adds the first deployable backend layer for Consonance without changing the live Vercel storefront.

## Free-phase service

- consonance-api: public FastAPI gateway on Render's free web tier.
- /health is public.
- /ingest requires X-Consonance-Key and performs one synchronous source intake.
- The paid persistent worker and cron are intentionally not provisioned yet.

## Evidence intake

SOURCE URL -> Render /ingest -> retrieve bytes -> SHA-256 -> evidence_sources -> evidence_provenance_events

The intake record stores source identity, fingerprint, retrieval metadata, provenance, authentication state, visibility and tags.

## Observatory routing

An ingest can optionally bind the resulting source directly into an existing Observatory investigation.

Use either:

- investigation_id

or the human-readable pair:

- thread_slug
- investigation_title

Optional investigation_role values:

- primary
- supporting
- context
- contradictory
- background

No Observatory routing is inferred. If routing fields are omitted, the source is preserved in the evidence engine without being attached to an investigation.

## Current WHO WE ARE seed

The NARA Freedmen's Bureau / Record Group 105 source and its first atomic claim are bound to the existing WHO ARE WE? / WHO WE ARE Observatory thread through:

Freedmen's Bureau / Record Group 105 — Evidence Reconstruction Seed

## Security

The evidence and Observatory bridge tables have RLS enabled. No public policies are created for the free-phase engine; Render uses the Supabase service-role key. Never commit service-role credentials or API keys to GitHub.
