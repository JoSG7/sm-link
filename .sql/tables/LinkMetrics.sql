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
