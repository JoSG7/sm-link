drop function if exists validate_link_password(x_short, x_password);

create or replace function validate_link_password(x_short text, x_password text)
returns text
language plpgsql
security definer
as $$
declare
  stored_hash text;
  result text;
begin
  select pl.password, l.original
  into stored_hash, result
  from links l
  join protected_link pl on pl.link_id = l.id
  where l.short = x_short;

  if stored_hash is null then
    return null;
  end if;

  if crypt(x_password, stored_hash) = stored_hash then
    return result; -- contraseña correcta, devolvemos el original
  else
    return null; -- contraseña incorrecta
  end if;
end;
$$;