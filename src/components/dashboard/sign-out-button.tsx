"use client"

import { signOut } from "@/logic/client-functions";

export function SignOutButton () {

  return(

    <button onClick={signOut}>Cerrar Sesion</button>

  )

}