drop function if exists public.get_link_by_short(x_short text);

create or replace function get_link_by_short(x_short text)
returns table(
  id uuid,
  short text,
  original text,
  has_password boolean,
  expires_at timestamp with time zone,
  is_expired boolean,
  has_user_id boolean,
  created_at timestamp with time zone
)
security invoker
language sql
as $$
  select
    l.id,
    l.short,
    l.original,
    pl.password is not null as has_password,
    case
      when le.expires_at is null then null
      else le.expires_at
    end as expires_at,
    le.expires_at is not null and le.expires_at <= now() as is_expired,
    l.user_id is not null as has_user_id,
    l.created_at
  from links l
  left join protected_link pl on pl.link_id = l.id
  left join link_expiration le on le.link_id = l.id
  where l.short = x_short
  order by l.created_at desc
$$;
