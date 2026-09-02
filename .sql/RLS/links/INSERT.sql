drop policy if exists "Allow guests and users to insert a new link, only 7 links per guest" on links;

create policy "Allow guests and users to insert a new link, only 7 links per guest "
on links
for insert
to anon, authenticated
with check (
  (
    user_id is null
    and guest_id is not null
    and guest_id::text = nullif(
      current_setting('request.headers', true)::json ->> 'x-guest-id',
      ''
    )
    and (
      select count(*)
      from public.links l
      where l.guest_id = (
        current_setting('request.headers', true)::json ->> 'x-guest-id'
      )::uuid
    ) < 7
  )
  or
  (
    guest_id is null
    and user_id is not null
    and user_id = (select auth.uid())
  )
);
