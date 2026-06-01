create type capsule_status as enum ('locked', 'unlocked');
create type capsule_visibility as enum ('private', 'anonymous_public');

create table public.capsules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  message text not null,
  unlock_at timestamptz not null,
  status capsule_status not null default 'locked',
  visibility capsule_visibility not null default 'private',
  media_type text,
  media_path text,
  created_at timestamptz not null default now(),
  unlocked_at timestamptz
);

create table public.ai_reports (
  id uuid primary key default gen_random_uuid(),
  capsule_id uuid not null references public.capsules(id) on delete cascade,
  mood text not null,
  themes text[] not null default '{}',
  present_self text not null,
  future_advice text not null,
  reveal_summary text not null,
  created_at timestamptz not null default now()
);

create table public.public_archive_entries (
  id uuid primary key default gen_random_uuid(),
  capsule_id uuid not null unique references public.capsules(id) on delete cascade,
  anonymous_title text not null,
  published_at timestamptz not null default now()
);

alter table public.capsules enable row level security;
alter table public.ai_reports enable row level security;
alter table public.public_archive_entries enable row level security;

create policy "Users can read own capsules"
  on public.capsules for select
  using (auth.uid() = user_id);

create policy "Users can create own capsules"
  on public.capsules for insert
  with check (auth.uid() = user_id);

create policy "Users can read own reports"
  on public.ai_reports for select
  using (
    exists (
      select 1 from public.capsules
      where capsules.id = ai_reports.capsule_id
      and capsules.user_id = auth.uid()
    )
  );

create policy "Anyone can read anonymous archive"
  on public.public_archive_entries for select
  using (true);

create index capsules_unlock_at_idx on public.capsules (unlock_at, status);
create index capsules_user_id_idx on public.capsules (user_id);
