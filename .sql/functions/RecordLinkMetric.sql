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
begin
  if x_status not in ('success', 'wrong_password', 'expired') then
    raise exception 'Invalid metric status';
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
  select
    x_link_id,
    x_visitor_hash,
    x_country,
    x_device_type,
    x_browser,
    x_operating_system,
    x_referer,
    x_status,
    x_is_bot
  where exists (
    select 1
    from public.links
    where id = x_link_id
  );

  return found;
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
