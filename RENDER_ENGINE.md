# Consonance Render Engine

## Free-phase service

- consonance-api: FastAPI gateway on Render's free web tier.
- /health is public.
- All mutation and extraction routes require X-Consonance-Key.
- Paid worker and cron remain intentionally disabled.

## Evidence intake

SOURCE -> /ingest -> retrieval -> SHA-256 -> evidence_sources -> evidence_provenance_events -> optional Observatory investigation binding

## Claim extraction

POST /extract-claims with evidence_source_id.

The extractor:
1. Re-fetches the preserved source URL.
2. Treats source text as untrusted input.
3. Uses GPT-5.6 Luna by default for low-cost structured extraction.
4. Produces atomic claims only.
5. Stores every new AI claim with review_state=proposed.
6. Creates a typed evidence link and claim_provenance event.
7. Carries proposed claims into any Observatory investigations already bound to the source.
8. Never assigns a numeric confidence score.
9. Never promotes a proposed claim to accepted automatically.

OPENAI_API_KEY must be configured in Render before /extract-claims is usable.
OPENAI_EXTRACTION_MODEL can optionally override the default gpt-5.6-luna model.

## Human review

POST /claims/{claim_id}/review supports:
- accepted
- rejected
- needs_review

Every review creates a claim provenance event.

## Security

Evidence, extraction, provenance and Observatory bridge tables have RLS enabled with no public policies for the free-phase engine. Render uses the Supabase service-role key. Never expose service-role or Consonance API credentials in frontend code.
