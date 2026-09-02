drop policy if exists "Allow guests and users to view only their own protected_links" on protected_link;

create policy "Allow guests and users to view only their own protected_links" on protected_link for
select
to anon, authenticated
  using (
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
