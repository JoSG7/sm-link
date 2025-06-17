import { createBrowserClient } from '@supabase/ssr'

export function createSupabase(guessID?: string) {
  
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          'x-guess-id': guessID ? guessID : "",
        },
      },
    }
  );
}


