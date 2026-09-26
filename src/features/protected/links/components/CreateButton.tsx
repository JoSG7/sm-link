'use client'

import { IconPlus } from "@tabler/icons-react"
import { useState } from "react"
import { CreateSmLinkModal } from "../modals/CreateLink"

export function CreateButton({ isAuthenticated }: { isAuthenticated: boolean }) {

  const [isOpen, setIsOpen] = useState(false)

  return (

    <>
      <button
        type="button"
        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-linear-to-r from-green-500 to-sky-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-950/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-sky-900/30 sm:size-10 sm:flex-none sm:gap-0 sm:px-0 md:h-auto md:w-auto md:gap-2 md:px-4 md:py-2.5"
        onClick={() => setIsOpen(true)}
      >
        <IconPlus className="size-4" />
        <span className="sm:hidden md:inline">Create Link</span>
      </button>

      <CreateSmLinkModal
        isOpen={isOpen}
        isAuthenticated={isAuthenticated}
        onClose={() => setIsOpen(false)}
      />

    </>

  )

}