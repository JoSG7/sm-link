create table public.link_expiration (
  link_id uuid not null default gen_random_uuid (),
  expires_at timestamp with time zone not null,
  max_visits integer null,
  current_visits integer null default 0,
  created_at timestamp with time zone not null default now(),
  constraint link_expiration_pkey primary key (link_id),
  constraint link_expiration_link_id_key unique (link_id),
  constraint link_expiration_link_id_fkey foreign KEY (link_id) references links (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;