drop policy if exists "Limit to 7 links per guest" on public.links;

create policy "Limit to 7 links per guest"
on public.links
for insert
to anon
with check (
  guest_id is not null
  and user_id is null
  and guest_id::text = nullif(
    current_setting('request.headers', true)::json ->> 'x-guest-id'::text,
    ''
  )
  and (
    select count(*)
    from public.links l
    where l.guest_id = (
      current_setting('request.headers', true)::json ->> 'x-guest-id'::text
    )::uuid
  ) < 7
);