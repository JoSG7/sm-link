"use client"

import { SignOutButton } from "@/features/dashboard/auth/SignOutButton"
import { RootState } from "@/store/store-config"
import { useSelector } from "react-redux"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"

export function UserProfile() {
  
  const { user } = useSelector((state: RootState) => state.user)

  return (
    <AnimatePresence>
      {user && (
        <motion.section className="flex flex-col gap-5 p-5 bottom-0 left-0 border-t-2 border-neutral-900"
          initial={{ y: 40, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          }}
          exit={{
            y: 40,
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: "easeIn",
            },
          }}
        >
          <div className="flex gap-3 items-center">

            <Image className="size-10 rounded-full"
              src={user.user_metadata.avatar_url}
              width={40}
              height={40}
              alt="user-photo"
            />

            <div className="text-sm">
              <p className="text-neutral-200">{user.user_metadata.name}</p>
              <p className="text-neutral-400">{user.email}</p>
            </div>
          </div>

          <SignOutButton />
        </motion.section>
      )}
    </AnimatePresence>
  )
}
