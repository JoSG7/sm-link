"use client"

import { SignOutButton } from "@/features/dashboard/components/SignOutButton";
import { RootState } from "@/store/store-config";
import Image from "next/image";
import { useSelector } from "react-redux";


export function UserProfile() {

  const { user } = useSelector(
    (state: RootState) => state.user
  )

  if (!user) return null

  return (

    <section className="absolute w-full flex flex-col gap-5 p-5 bottom-0 left-0 border-t-2 border-neutral-900">

      <div className="flex gap-3 items-center">
        <Image className="size-10 rounded-full"
          src={user.user_metadata.avatar_url}
          width={40} height={40}
          alt="user-photo" />

        <div className="text-sm">
          <p className="text-neutral-200">{user.user_metadata.user_name}</p>
          <p className="text-neutral-400">{user.email}</p>
        </div>
      </div>

      <SignOutButton />

    </section>

  )
}