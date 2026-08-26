import { createSupabase } from "@/lib/supabase/client";
import { Provider } from "@supabase/supabase-js";

export async function signInWithOAuth(provider: Provider) {

  const supabase = createSupabase()
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${location.origin}/auth/callback`
      // redirectTo: "https://sm-link.vercel.app/auth/callback"
    }
  })

}

export async function signOut() {

  const supabase = createSupabase()
  const { error } = await supabase.auth.signOut()

  if (error) throw error

}