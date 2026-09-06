drop policy if exists "Allow users to update expiration on their own links" on link_expiration;

create policy "Allow users to update expiration on their own links" on link_expiration for update
to authenticated
using (
  exists (
    select 1
    from links l
    where l.id = link_expiration.link_id
    and (
      (
        auth.uid() is not null
        and l.user_id = auth.uid()
      )
    )
  )
)
with check (
  exists (
    select 1
    from links l
    where l.id = link_expiration.link_id
    and (
      (
        auth.uid() is not null
        and l.user_id = auth.uid()
      )
    )
  )
);
