drop policy if exists "Allow guests and users to view their own links" on links;

create policy "Allow guests and users to view their own links" on links for 
select
to anon, authenticated
using (
  (
    auth.uid () is not null
    and user_id = auth.uid ()
  )
  or (
    auth.uid () is null
    and guest_id = (
      current_setting('request.headers', true)::json ->> 'x-guest-id'::text
    )::uuid
  )
);