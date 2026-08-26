drop function if exists insert_link_password(x_password text, x_short text)

create function insert_link_password (x_password text, x_short text) 
returns void 
security invoker 
language plpgsql 
as $$

begin

  INSERT INTO protected_link (password, link_id)
  VALUES (crypt(x_password, gen_salt('bf')), (select id from link l where l.short = x_short));

end; 

$$;