drop policy if exists "Allow users to update password on their own links" on protected_link;

create policy "Allow users to update password on their own links"
on protected_link
for update
to authenticated
using (
  exists (
    select 1
    from links l
    where l.id = protected_link.link_id
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
    where l.id = protected_link.link_id
    and (
      (
        auth.uid() is not null
        and l.user_id = auth.uid()
      )
    )
  )
);
