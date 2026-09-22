-- Consonance Render Engine v0.4
-- Free-phase storage: queue + evidence intake + provenance.

create extension if not exists pgcrypto;

create table if not exists public.consonance_jobs (
  id uuid primary key default gen_random_uuid(),
  job_type text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'queued'
    check (status in ('queued', 'running', 'completed', 'failed')),
  result jsonb,
  error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  started_at timestamptz,
  finished_at timestamptz
);

create index if not exists consonance_jobs_status_created_idx
  on public.consonance_jobs (status, created_at);

create table if not exists public.evidence_sources (
  id uuid primary key default gen_random_uuid(),
  source_url text not null,
  source_type text not null default 'web',
  title text,
  sha256 text not null,
  content_type text,
  byte_length bigint,
  retrieved_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create unique index if not exists evidence_sources_url_hash_idx
  on public.evidence_sources (source_url, sha256);

create table if not exists public.evidence_provenance_events (
  id uuid primary key default gen_random_uuid(),
  evidence_source_id uuid not null
    references public.evidence_sources(id) on delete restrict,
  event_type text not null,
  actor text not null,
  occurred_at timestamptz not null default now(),
  details jsonb not null default '{}'::jsonb
);

create index if not exists evidence_provenance_source_idx
  on public.evidence_provenance_events (evidence_source_id, occurred_at);

alter table public.consonance_jobs enable row level security;
alter table public.evidence_sources enable row level security;
alter table public.evidence_provenance_events enable row level security;

-- No public RLS policies are created intentionally.
-- Render uses the Supabase service-role key.
