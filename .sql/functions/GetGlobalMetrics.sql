drop function if exists get_global_metrics ();

create or replace function get_global_metrics () returns table (
  successful_visits bigint,
  unique_visitors bigint,
  active_links bigint,
  average_visits bigint
) security invoker language sql stable as $$
  with successful_metrics as (
    select
      lm.link_id,
      lm.visitor_hash
    from link_metrics lm
    join links l on l.id = lm.link_id
    where lm.status = 'success'
      and not lm.is_bot
  ),
  aggregates as (
    select
      count(*)::bigint as successful_visits,
      count(distinct sm.visitor_hash)::bigint as unique_visitors,
      count(distinct sm.link_id)::bigint as active_links
    from successful_metrics sm
  )
  select
    a.successful_visits,
    a.unique_visitors,
    a.active_links,
    case
      when count(l.id) = 0 then 0::bigint
      else round(a.successful_visits::numeric / count(l.id))::bigint
    end as average_visits
  from aggregates a
  left join links l on true
  group by a.successful_visits, a.unique_visitors, a.active_links
$$;

revoke
execute on function get_global_metrics ()
from
  public;

grant
execute on function get_global_metrics () to anon,
authenticated;