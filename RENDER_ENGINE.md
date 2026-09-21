# Consonance Render Engine

This branch adds the first deployable backend layer for Consonance without changing the live Vercel storefront.

## Services

- consonance-api: public FastAPI gateway. /health is public; job endpoints require X-Consonance-Key.
- consonance-worker: persistent background worker that claims queued jobs from Supabase.
- consonance-scheduler: daily cron producer that verifies the scheduler -> queue -> worker path.

## First supported workflow

ingest_source

Example request body:

    {
      "job_type": "ingest_source",
      "payload": {
        "url": "https://example.org/archive-record",
        "source_type": "archive",
        "title": "Example archival record",
        "tags": ["who-we-are", "observatory"]
      }
    }

The worker retrieves the source, computes SHA-256, records retrieval metadata, and writes the source fingerprint into evidence_sources.

This is the intake layer. Entity resolution, atomic claims, typed evidence links, contradictions, lineage, permissions, and confidence scoring are the next Evidence Engine stages.

## Before deployment

1. Run backend/schema.sql in the Supabase SQL Editor.
2. Create a Render Blueprint from this repository and select the render-engine branch.
3. Provide SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY when Render prompts for secrets.
4. Render generates CONSONANCE_API_KEY for the API service.
5. Verify GET /health.
6. Queue a system_heartbeat or ingest_source job.

## Cost boundary

The web API is configured on Render's free plan. The worker and cron are configured as starter services and can create Render charges when provisioned. Do not create the Blueprint until that cost is acceptable.

## Security boundary

Never commit Supabase service-role credentials or API keys to GitHub. The Blueprint uses sync: false for Supabase secrets and generateValue: true for the API key.
