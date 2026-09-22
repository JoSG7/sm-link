drop function if exists record_link_metric(
  uuid,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  boolean
);

create or replace function record_link_metric(
  x_link_id uuid,
  x_visitor_hash text default null,
  x_country text default null,
  x_device_type text default null,
  x_browser text default null,
  x_operating_system text default null,
  x_referer text default null,
  x_status text default 'success',
  x_is_bot boolean default false
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  link_exists boolean;
begin
  if x_status not in ('success', 'wrong_password', 'expired') then
    raise exception 'Invalid metric status';
  end if;

  select exists (
    select 1
    from public.links
    where id = x_link_id
  )
  into link_exists;

  if not link_exists then
    return false;
  end if;

  if x_visitor_hash is not null then
    perform pg_advisory_xact_lock(
      hashtextextended(x_link_id::text || ':' || x_visitor_hash, 0)
    );

    if exists (
      select 1
      from public.link_metrics
      where link_id = x_link_id
        and visitor_hash = x_visitor_hash
        and visited_at > now() - interval '10 seconds'
    ) then
      return true;
    end if;
  end if;

  insert into public.link_metrics (
    link_id,
    visitor_hash,
    country,
    device_type,
    browser,
    operating_system,
    referer,
    status,
    is_bot
  )
  values (
    x_link_id,
    x_visitor_hash,
    x_country,
    x_device_type,
    x_browser,
    x_operating_system,
    x_referer,
    x_status,
    x_is_bot
  );

  return true;
end;
$$;

revoke execute on function record_link_metric(
  uuid,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  boolean
) from public;

grant execute on function record_link_metric(
  uuid,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  boolean
) to anon, authenticated;
