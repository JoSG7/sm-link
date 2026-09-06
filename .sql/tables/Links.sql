create table public.links (
  id uuid not null default gen_random_uuid (),
  original text not null,
  short text not null,
  user_id uuid null,
  guest_id uuid null,
  created_at timestamp with time zone not null default now(),
  constraint link_pkey primary key (id),
  constraint link_short_key unique (short),
  constraint link_user_original_unique unique (user_id, original),
  constraint link_user_id_fkey foreign KEY (user_id) references "user" (id) on update CASCADE on delete set null,
  constraint link_short_check check ((length(short) < 20))
) TABLESPACE pg_default;