import { createBrowserClient } from '@supabase/ssr'

/**
 * Browser client for Supabase
 * Used in Client Components to interact with Supabase API
 * Handles authentication via session cookies (refreshed by middleware)
 * @param guestID - Optional guest ID for tracking
 * @returns Supabase client
 */

export function createSupabase(guestID?: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseKey,
    {
      global: {
        headers: {
          'x-guest-id': guestID || '',
        },
      },
    }
  )
}


