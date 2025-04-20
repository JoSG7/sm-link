"use client"

import { signOut } from "@/utils/auth/client-auth"



export function SignOutButton () {

  return(

    <button onClick={signOut}>Cerrar Sesion</button>

  )

}