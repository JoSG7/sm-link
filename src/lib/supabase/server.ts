import { createServerClient, } from '@supabase/ssr'
import { cookies } from 'next/headers'


export async function createSupabaseServer() {

  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      }
    }
  )
}





// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

// export const serverAuthSupabase = createServerComponentClient({ cookies })

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