'use client'

import { createClientComponentClient, type User } from "@supabase/auth-helpers-nextjs"
import Image from "next/image"

export function AuthButtonClient ({ session }: { session: User | null }) {

  const clientAuthSupabase = createClientComponentClient()

  const handleSignIn = async () => {

    await clientAuthSupabase.auth.signInWithOAuth({

      provider: 'github',
      options: {

        redirectTo: "https://sm-link.vercel.app/auth/callback"

      }

    })

  }

  const handleSignOut = async () => {

    await clientAuthSupabase.auth.signOut()

  }

  return(

    <div className="mt-3">

      {
        session == null ? 
        <button type="button" className="p-2 rounded-lg bg-green-400 mr-3"
        onClick={handleSignIn}
        >Inicar sesion con github</button>
        :
        <div className="flex flex-col gap-2">

          <button type="button" className="p-2 rounded-lg bg-green-400"
          onClick={handleSignOut}
          >Cerrar Sesion</button>

          <span>{session.user_metadata.full_name}</span>
          <span>{session.user_metadata.email}</span>

        </div>

      }

    </div>

  )

}