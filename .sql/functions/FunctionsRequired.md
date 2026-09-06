
# Funciones RPC requeridas

> Catálogo de funciones PostgreSQL utilizadas por SmLink para enlaces, analítica, invitados y protección con contraseña.

## Vista rápida

| Dominio | Funciones | Propósito principal |
| --- | --- | --- |
| Enlaces | `get_link_to_redirect`, `get_links` | Consultar enlaces y resolver redirecciones |
| Analítica | `get_global_metrics`, `get_link_metrics` | Obtener métricas globales y por enlace |
| Guest flow | `get_guest_links`, `claim_guest_links` | Recuperar y reclamar enlaces creados como invitado |
| Protección | `insert_link_password`, `validate_link_password` | Guardar y validar contraseñas de enlaces |

## Tabla `links`

### Consultas de enlaces

| Función | Descripción |
| --- | --- |
| `get_link_to_redirect` | Obtiene la información necesaria para resolver una redirección. |
| `get_links` | Obtiene los enlaces visibles para el usuario de acuerdo con las políticas RLS. |

### Analítica

| Función | Descripción |
| --- | --- |
| `get_global_metrics` | Devuelve los agregados de analítica de los enlaces del usuario autenticado. |
| `get_link_metrics` | Devuelve el resumen, las distribuciones y la serie temporal diaria de un enlace identificado por su `short`. |

### Flujo de invitado

| Función | Descripción |
| --- | --- |
| `get_guest_links` | Obtiene únicamente los enlaces del invitado para hacer posible el claim. Se utiliza porque `get_links` queda limitado por el RLS al usuario autenticado. Esta función requiere `SECURITY DEFINER` para consultar esos enlaces sin que el RLS bloquee el flujo. |
| `claim_guest_links` | Asocia los enlaces del invitado al usuario autenticado. Los enlaces originales del invitado no se eliminan. |

## Tabla `protected_link`

| Función | Descripción |
| --- | --- |
| `insert_link_password` | Inserta la contraseña de un enlace usando el hash `crypt` de Supabase, que después se utiliza durante las validaciones. |
| `validate_link_password` | Compara la contraseña enviada por el usuario con el hash almacenado. Si coincide, devuelve el enlace original para la redirección. |

## Notas de seguridad

- Las funciones que consultan datos de usuario deben respetar el modelo de acceso definido por RLS.
- `SECURITY DEFINER` solo debe utilizarse cuando el flujo necesite atravesar RLS de forma explícita, como en la recuperación de enlaces guest.
- Las contraseñas nunca deben almacenarse en texto plano; la validación debe realizarse contra el hash persistido.

