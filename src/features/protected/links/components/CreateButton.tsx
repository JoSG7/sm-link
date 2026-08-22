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
        className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-linear-to-r from-green-500 to-sky-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-950/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-sky-900/30"
        onClick={() => setIsOpen(true)}
      >
        <IconPlus className="size-4" />
        Create Link
      </button>

      <CreateSmLinkModal
        isOpen={isOpen}
        isAuthenticated={isAuthenticated}
        onClose={() => setIsOpen(false)}
      />

    </>

  )

}