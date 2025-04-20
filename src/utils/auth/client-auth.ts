import { clientAuthSupabase } from "@/lib/supabase/client";
import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

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