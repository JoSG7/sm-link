drop function if exists claim_guest_links(x_links_id uuid[]);

create function claim_guest_links(x_links_id uuid[])
returns integer
security definer
language plpgsql
as $$

declare
  claimed_count integer;

begin

  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  update links

  set user_id = auth.uid()
  where id = any(x_links_id)
  and user_id is null;

  get diagnostics claimed_count = row_count;
  return claimed_count;

end $$