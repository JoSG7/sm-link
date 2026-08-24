
Para tabla Links

- get_link_to_redirect: Obtiene la informacion necesaria para la redireccion.

- get_links: Obtiene la informacion del link de acuerdo al RLS.

- get_guest_links: Obtiene solo los links del invitado, necesario para el claim, ya que el RLS intercepta get_links y devuelve solo los links del Usuario Autenticado, Security Definer para que RLS no bloquee

- claim_guest_links: Permite claimear los links del guest al user autenticado, esto no borrara los link del guest.

Para la tabla protected_link

- insert_link_password: Permite insertar la contraseña de un link, es necesario esta funcion ya que permite el hasheo con crypt de supabase y usuarlo posteriormente para las validaciones

- validate_link_password: Valida la contraseña del request del user con la contraseña hasheada en la bd, si coincide, devuelve el original link para la redireccion.

