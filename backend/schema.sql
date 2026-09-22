-- Consonance Render Engine v0.3
-- Free-phase storage: queue + evidence intake.

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

alter table public.consonance_jobs enable row level security;
alter table public.evidence_sources enable row level security;

-- No public RLS policies are created intentionally.
-- Render uses the Supabase service-role key.
