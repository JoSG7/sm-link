import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const serverAuthSupabase = createServerComponentClient({ cookies })

// import { createServerClient } from '@supabase/ssr'
// import { cookies, headers } from 'next/headers'

// export const serverAuthSupabase = () => {

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: cookies(),
//       headers: headers(),
//     }
//   )

// }