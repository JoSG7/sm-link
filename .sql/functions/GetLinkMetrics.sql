drop function if exists get_link_metrics (text);

create or replace function get_link_metrics (x_short text) returns table (
  total_views bigint,
	successful_views bigint,
  unique_visitors bigint,
  protected_failed_attempts bigint,
  expired_views bigint,
  device_views jsonb,
  browser_views jsonb,
  operating_system_views jsonb,
  country_views jsonb,
  referer_views jsonb,
	daily_status_views jsonb
) security invoker language sql stable as $$
	with scoped_metrics as (
		select
			lm.visited_at,
			lm.visitor_hash,
			lm.device_type,
			lm.browser,
			lm.operating_system,
			lm.country,
			lm.referer,
			lm.status,
			lm.is_bot
		from link_metrics lm
		join links l on l.id = lm.link_id
		where l.short = trim(x_short)
	),
	valid_views as (
		select *
		from scoped_metrics
		where status = 'success'
			and not is_bot
	),
	breakdown_views as (
		select *
		from scoped_metrics
		where not is_bot
	),
	device_counts as (
		select
			device_type as name,
			count(*)::bigint as value,
			count(*) filter (where status = 'success')::bigint as success,
			count(*) filter (where status = 'wrong_password')::bigint as wrong_password,
			count(*) filter (where status = 'expired')::bigint as expired
		from breakdown_views
		group by device_type
		order by value desc, name
	),
	browser_counts as (
		select
			browser as name,
			count(*)::bigint as value,
			count(*) filter (where status = 'success')::bigint as success,
			count(*) filter (where status = 'wrong_password')::bigint as wrong_password,
			count(*) filter (where status = 'expired')::bigint as expired
		from breakdown_views
		group by browser
		order by value desc, name
	),
	operating_system_counts as (
		select operating_system as name, count(*)::bigint as value
		from valid_views
		group by operating_system
		order by value desc, name
	),
	country_counts as (
		select country as name, count(*)::bigint as value
		from valid_views
		where country is not null
		group by country
		order by value desc, name
	),
	referer_counts as (
		select referer as name, count(*)::bigint as value
		from valid_views
		where referer is not null
		group by referer
		order by value desc, name
	),
	metric_days as (
		select generate_series(
			(select min(visited_at::date) from scoped_metrics where not is_bot),
			current_date,
			interval '1 day'
		)::date as date
	),
	daily_status_counts as (
		select
			d.date,
			count(*) filter (where sm.status = 'success')::bigint as success,
			count(*) filter (where sm.status = 'expired')::bigint as expired,
			count(*) filter (where sm.status = 'wrong_password')::bigint as wrong_password
		from metric_days d
		left join scoped_metrics sm
			on sm.visited_at::date = d.date
			and not sm.is_bot
		group by d.date
		order by d.date
	)
	select
		count(*) filter (where not is_bot)::bigint as total_views,
		count(*) filter (where status = 'success' and not is_bot)::bigint as successful_views,
		count(distinct visitor_hash) filter (
			where status = 'success' and not is_bot and visitor_hash is not null
		)::bigint as unique_visitors,
		count(*) filter (where status = 'wrong_password' and not is_bot)::bigint as protected_failed_attempts,
		count(*) filter (where status = 'expired' and not is_bot)::bigint as expired_views,
		coalesce((select jsonb_agg(to_jsonb(device_counts)) from device_counts), '[]'::jsonb) as device_views,
		coalesce((select jsonb_agg(to_jsonb(browser_counts)) from browser_counts), '[]'::jsonb) as browser_views,
		coalesce((select jsonb_agg(to_jsonb(operating_system_counts)) from operating_system_counts), '[]'::jsonb) as operating_system_views,
		coalesce((select jsonb_agg(to_jsonb(country_counts)) from country_counts), '[]'::jsonb) as country_views,
		coalesce((select jsonb_agg(to_jsonb(referer_counts)) from referer_counts), '[]'::jsonb) as referer_views,
		coalesce((select jsonb_agg(to_jsonb(daily_status_counts) order by date) from daily_status_counts), '[]'::jsonb) as daily_status_views
	from scoped_metrics
$$;

revoke
execute on function get_link_metrics (text)
from
  public;

grant
execute on function get_link_metrics (text) to anon,
authenticated;