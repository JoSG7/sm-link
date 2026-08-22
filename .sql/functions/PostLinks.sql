drop function if exists insert_user_link;

create or replace function insert_user_link(
  x_original text,
  x_short text
)
returns text
language plpgsql
security definer
as $$
declare
  v_short text;
  v_constraint_name text;
begin

  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  insert into links (
    original,
    short,
    user_id
  )
  values (
    x_original,
    x_short,
    auth.uid()
  )
  returning short into v_short;

  return v_short;

exception
  when unique_violation then
    get stacked diagnostics v_constraint_name = CONSTRAINT_NAME;

    if v_constraint_name = 'link_short_key' then
      raise exception 'Short already used';
    elsif v_constraint_name = 'link_user_original_unique' then
      raise exception 'Original already exists for this user';
    else
      raise;
    end if;

end;
$$;
