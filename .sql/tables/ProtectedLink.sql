create table public.protected_link (
  link_id uuid not null default gen_random_uuid (),
  password text not null,
  created_at timestamp with time zone not null default now(),
  constraint protected_link_pkey primary key (link_id),
  constraint protected_link_link_id_fkey foreign KEY (link_id) references links (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;