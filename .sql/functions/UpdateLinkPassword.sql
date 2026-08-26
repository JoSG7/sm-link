drop function if exists update_link_password(x_short, x_current_password, x_new_password);

create or replace function update_link_password(
  x_short text,
  x_current_password text,
  x_new_password text
)
returns void
security definer
language plpgsql
as $$
begin
  -- 1. Verificar ownership (solo users)
  if not exists (
    select 1
    from links l
    where l.short = x_short
      and l.user_id = auth.uid()
  ) then
    raise exception 'Unauthorized';
  end if;

  -- 2. Verificar contraseña actual
  if not exists (
    select 1
    from protected_link pl
    where pl.link_id = (select id from links where links.short = x_short )::uuid
      and pl.password = crypt(x_current_password, pl.password)
  ) then
    raise exception 'Invalid current password';
  end if;

  -- 3. Actualizar contraseña
  update protected_link
  set password = crypt(x_new_password, gen_salt('bf'))
  where link_id = (select id from links where links.short = x_short )::uuid;
end;
$$;
