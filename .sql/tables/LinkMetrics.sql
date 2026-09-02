create table link_metrics (
  id bigint generated always as identity primary key,
  link_id uuid not null references public.links(id) on delete cascade,
  visited_at timestamptz not null default now(),
  visitor_hash text,
  country text,
  device_type text,
  browser text,
  operating_system text,
  referer text,
  status text not null default 'success'
    check (status in ('success', 'wrong_password', 'expired')),
  is_bot boolean not null default false
);

create index link_metrics_link_date_idx
  on public.link_metrics (link_id, visited_at desc);

alter table public.link_metrics enable row level security;

drop policy if exists "Users can view metrics for their own links" on public.link_metrics;

create policy "Users can view metrics for their own links"
on public.link_metrics
for select
to authenticated
using (
  exists (
    select 1
    from public.links
    where links.id = link_metrics.link_id
      and links.user_id = (select auth.uid())
  )
);