"use client"

import { signOut } from "@/utils/auth/auth-client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/shadcn/dropdown-menu"
import { User } from "@supabase/supabase-js"
import { IconLogout } from "@tabler/icons-react"
import Image from "next/image"

export function UserProfile({ user }: { user: User }) {

  const handleLogOut = async () => {
    await signOut()
  }

  return (

    <DropdownMenu>

      <DropdownMenuTrigger>
        <Image className="size-9 rounded-full cursor-pointer"
          src={user.user_metadata.avatar_url}
          width={36}
          height={36}
          alt="userPhoto"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-neutral-900 text-white border border-neutral-800 translate-x-2 -translate-y-4"
        side="right" align="start">

        <DropdownMenuItem>
          {user.email}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-neutral-800" />

        <DropdownMenuItem className="hover:bg-neutral-800">
          <button className="w-full flex gap-1 items-center cursor-pointer"
            onClick={handleLogOut}>
            <IconLogout className="size-4" />
            Log Out
          </button>
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>

  )
}
