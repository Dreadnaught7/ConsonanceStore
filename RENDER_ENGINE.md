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
        "authentication_state": "institutionally_sourced",
        "visibility": "internal",
        "tags": ["who-we-are", "observatory"]
      }
    }

The worker retrieves the source, computes SHA-256, and writes directly into the existing governed Observatory architecture:

SOURCE -> obs_sources
INGEST -> consonance_jobs
PROVENANCE -> obs_provenance_events

It does not create a parallel evidence-source table. Evidence, claims, typed links, contradictions, lineage, permissions and confidence continue through the existing Observatory/Historical Reconstruction Engine tables.

## Before deployment

1. Apply backend/schema.sql to the Consonance Intel Supabase project.
2. Create a Render Blueprint from this repository and select the render-engine branch.
3. Provide SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY when Render prompts for secrets.
4. Render generates CONSONANCE_API_KEY for the API service.
5. Verify GET /health.
6. Queue a system_heartbeat job.
7. Queue one controlled ingest_source job and confirm:
   - consonance_jobs -> completed
   - obs_sources -> 1 source row
   - obs_provenance_events -> 1 provenance row

## Cost boundary

The web API is configured on Render's free plan. The worker and cron are configured as starter services and can create Render charges when provisioned. Do not provision those paid services unless the account owner accepts that cost.

## Security boundary

Never commit Supabase service-role credentials or API keys to GitHub. The Blueprint uses sync: false for Supabase secrets and generateValue: true for the API key.
