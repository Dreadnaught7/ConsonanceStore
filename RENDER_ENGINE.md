# Consonance Render Engine

This branch adds the first deployable backend layer for Consonance without changing the live Vercel storefront.

## Free-phase service

- consonance-api: public FastAPI gateway on Render's free web tier.
- /health is public.
- /ingest requires X-Consonance-Key and performs one synchronous source intake.

The paid persistent worker and cron are intentionally not provisioned yet.

## Current evidence intake

SOURCE URL -> Render /ingest -> retrieve bytes -> SHA-256 -> public.evidence_sources

The intake record stores:
- source URL
- source type
- title
- SHA-256 fingerprint
- content type
- byte length
- retrieval time
- metadata including tags, citation, repository, authentication state, visibility and ingest engine

This is the stable intake layer. Entity resolution, claims, links, contradictions, confidence and richer Observatory graph structures can build on top of these records later.

## Database tables

- public.consonance_jobs
- public.evidence_sources

## Security

Never commit Supabase service-role credentials or API keys to GitHub.
