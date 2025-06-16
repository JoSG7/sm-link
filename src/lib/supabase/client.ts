import { createBrowserClient } from '@supabase/ssr'

// import { cre } from '@supabase/ssr'
 
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    global: {
      headers: {
        'x-guess-id': typeof window !== 'undefined'
          ? localStorage.getItem('guessID') ?? ''
          : ''
      }
    }
  }
)




// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { createClient } from "@supabase/supabase-js"

// const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// if (!supabaseURL || !supabaseKEY) {
    
//   throw new Error("Faltan variables de entorno para Supabase");
// }

// export const supabase = createClient(supabaseURL, supabaseKEY)

// export const clientAuthSupabase = createClientComponentClient()