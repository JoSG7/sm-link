drop policy if exists "Allow guests and user to insert a new link" on public.links;

create policy "Allow guests and user to insert a new link"
on public.links
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
  )
  or
  (
    guest_id is null
    and user_id is not null
    and user_id = (select auth.uid())
  )
);
