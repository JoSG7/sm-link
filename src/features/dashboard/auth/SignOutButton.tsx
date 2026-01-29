"use client"

import { signOut } from "@/features/shared/auth/auth-client"
import { IconDoorExit, IconLoader } from "@tabler/icons-react"
import { useState } from "react"

export function SignOutButton() {

  const [loading, setLoading] = useState(false)

  const handleLogOut = () => {
    setLoading(true)
    signOut().finally(() => setLoading(false))
  }

  return (

    <button className="w-full flex gap-2 justify-center items-center text-sm py-2 rounded-lg cursor-pointer bg-red-600 disabled:opacity-50 "
      onClick={handleLogOut}
      disabled={loading}>
      {loading ? <IconLoader className="animate-spin size-4" /> : <IconDoorExit className="size-4" />}
      Log Out
    </button>

  )
}