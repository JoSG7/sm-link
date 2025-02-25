'use client'

import { createClientComponentClient, type User } from "@supabase/auth-helpers-nextjs"
import Image from "next/image"

export function AuthButtonClient ({ session }: { session: User | null }) {

  const supabase = createClientComponentClient()

  const handleSignIn = async () => {

    await supabase.auth.signInWithOAuth({

      provider: 'github',
      options: {

        redirectTo: "http://localhost:3000/auth/callback"

      }

    })

  }

  const handleSignOut = async () => {

    await supabase.auth.signOut()

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