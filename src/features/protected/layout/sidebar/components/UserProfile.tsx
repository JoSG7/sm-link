"use client"

import { signOut } from "@/utils/auth/auth-client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/shadcn/dropdown-menu"
import { User } from "@supabase/supabase-js"
import { IconLogout } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export function UserProfile({ user }: { user: User | null }) {

  const router = useRouter()

  const handleLogOut = async () => {

    await signOut()
    router.replace("/")

  }

  return (

    <DropdownMenu>

      <DropdownMenuTrigger>

        {
          user ?
            <Image className="size-9 rounded-full cursor-pointer"
              src={user.user_metadata.avatar_url}
              width={36}
              height={36}
              alt="userPhoto"
              loading="eager"
            />
            :
            <div className="size-9 rounded-full cursor-pointer bg-neutral-900" />
        }

      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-neutral-900 text-white border border-neutral-800 translate-x-2 -translate-y-4"
        side="right" align="start">

        <DropdownMenuItem>
          {
            user ? user.email : "Guest"
          }
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-neutral-800" />

        <DropdownMenuItem className="hover:bg-neutral-800">
          {
            user ?
              <button className="w-full flex gap-1 items-center cursor-pointer"
                onClick={handleLogOut}>
                <IconLogout className="size-4" />
                Log Out
              </button>
              :
              <Link href="/" className="w-full flex gap-1 items-baseline" >
                <IconLogout className="size-4" />
                Exit
              </Link>
          }
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>

  )
}
