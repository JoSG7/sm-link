"use client"

import { signOut } from "@/features/shared/auth/auth-client"

export function SignOutButton () {
  return(
    <button onClick={signOut}>Cerrar Sesion</button>
  )
}