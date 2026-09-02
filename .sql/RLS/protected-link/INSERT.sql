drop policy if exists "Allow guest and users to insert password on their own links" on protected_link;

create policy "Allow guest and users to insert password on their own links" on protected_link for insert
to anon, authenticated
with
  check (
    exists (
      select
        1
      from
        links l
      where
        protected_link.link_id = l.id
        and (
          (
            auth.uid () is not null
            and l.user_id = auth.uid ()
          )
          or (
            auth.uid () is null
            and l.guest_id = (
              current_setting('request.headers', true)::json ->> 'x-guest-id'
            )::uuid
          )
        )
    )
  )