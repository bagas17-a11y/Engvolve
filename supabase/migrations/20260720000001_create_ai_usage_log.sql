-- Tracks Claude API token usage per user per edge function call, so admins
-- can see per-user API cost during testing/beta before scaling up.
create table public.ai_usage_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null,
  model text not null,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index idx_ai_usage_log_user_id on public.ai_usage_log(user_id);
create index idx_ai_usage_log_created_at on public.ai_usage_log(created_at);

alter table public.ai_usage_log enable row level security;

-- Only admins can read usage logs — this is an internal analytics table,
-- not user-facing data. Edge functions write via the service role key,
-- which bypasses RLS entirely, so no insert policy is needed.
create policy "Admins can view all ai usage logs"
  on public.ai_usage_log for select
  using (has_role(auth.uid(), 'admin'::app_role));
