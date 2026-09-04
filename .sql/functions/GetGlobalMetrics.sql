drop function if exists get_global_metrics ();

create or replace function get_global_metrics () returns table (
  successful_visits bigint,
  unique_visitors bigint,
  active_links bigint,
  success_rate numeric
) security invoker language sql stable as $$
  with metrics as (
    select
      lm.link_id,
      lm.visitor_hash,
      lm.status
    from link_metrics lm
    join links l on l.id = lm.link_id
    where not lm.is_bot
  ),
  aggregates as (
    select
      count(*) filter (where m.status = 'success')::bigint as successful_visits,
      count(distinct m.visitor_hash)::bigint as unique_visitors,
      count(distinct m.link_id) filter (where m.status = 'success')::bigint as active_links,
      count(*)::numeric as total_attempts
    from metrics m
  )
  select
    a.successful_visits,
    a.unique_visitors,
    a.active_links,
    case when a.total_attempts = 0 then 0::numeric
      else round(a.successful_visits::numeric * 100 / a.total_attempts, 1)
    end as success_rate
  from aggregates a
$$;

revoke
execute on function get_global_metrics ()
from
  public;

grant
execute on function get_global_metrics () to anon,
authenticated;