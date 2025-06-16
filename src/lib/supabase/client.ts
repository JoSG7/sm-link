import { createBrowserClient } from '@supabase/ssr'
 
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



