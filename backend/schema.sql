-- Consonance Render Engine v0.2
-- Queue only. Evidence/provenance writes use the existing Observatory tables:
-- public.obs_sources and public.obs_provenance_events.

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

alter table public.consonance_jobs enable row level security;

-- No public RLS policy is created intentionally.
-- Render services use the Supabase service-role key.
