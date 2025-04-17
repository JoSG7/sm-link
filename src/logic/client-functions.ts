import { clientAuthSupabase } from "@/lib/supabase/client"
import type { Provider } from "@supabase/supabase-js"
import { redirect } from "next/navigation"

// Auth and SignOut on client Component

export async function signInWithOAuth (provider : Provider) {

  await clientAuthSupabase.auth.signInWithOAuth({

    provider,
    options: {
      redirectTo: "https://sm-link.vercel.app/auth/callback"
    }

  })

}

export async function signOut () {

  await clientAuthSupabase.auth.signOut()

  redirect("/")

}