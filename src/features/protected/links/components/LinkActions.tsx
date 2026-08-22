"use client"

import { IconAlarmPlus, IconKey, IconTrash, IconDots } from "@tabler/icons-react"
import { memo, useEffect, useRef, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu"
import { CreatePasswordModal } from "../modals/protected/CreatePassword"
import { UpdatePasswordModal } from "../modals/protected/UpdatePassword"
import { CreateUserLinkExpirationModal } from "../modals/expiration/CreateExpiration"
import { UpdateUserLinkExpirationModal } from "../modals/expiration/UpdateExpiration"
import { DeleteLinkModal } from "../modals/DeleteLink"

type LinkAction = "password" | "expiration" | "delete"

interface LinkActionsProps {
  short: string
  hasPassword: boolean
  expirationDate: string | null
}

function LinkActionsComponent({ short, hasPassword, expirationDate }: LinkActionsProps) {
  const hasExpiration = expirationDate !== null
  const [activeAction, setActiveAction] = useState<LinkAction | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current)
    }
  }, [])

  const openModal = (action: LinkAction) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setActiveAction(action)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    closeTimeout.current = setTimeout(() => setActiveAction(null), 250)
  }

  return (

    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="rounded-md p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white"
            aria-label="Link actions"
          >
            <IconDots className="size-5" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="min-w-36 border-neutral-800 bg-neutral-950 p-1 text-neutral-300 shadow-lg data-[state=open]:animate-none data-[state=closed]:animate-none"
        >
          <DropdownMenuItem
            className="gap-2 text-neutral-300 hover:bg-neutral-800 hover:text-white focus:bg-neutral-800 focus:text-white"
            onSelect={() => openModal("password")}
          >
            <IconKey className="size-4" />
            {hasPassword ? "Update password" : "Password"}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2 text-neutral-300 hover:bg-neutral-800 hover:text-white focus:bg-neutral-800 focus:text-white"
            onSelect={() => openModal("expiration")}
          >
            <IconAlarmPlus className="size-4" />
            {hasExpiration ? "Update expiration" : "Expiration"}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 focus:bg-red-500/10 focus:text-red-300"
            onSelect={() => openModal("delete")}
          >
            <IconTrash className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>

        {activeAction === "password" && hasPassword && (
          <UpdatePasswordModal
            isOpen={isModalOpen}
            short={short}
            onClose={closeModal} />
        )}
        {activeAction === "password" && !hasPassword && (
          <CreatePasswordModal
            isOpen={isModalOpen}
            short={short}
            onClose={closeModal} />
        )}
        {activeAction === "expiration" && hasExpiration && (
          <UpdateUserLinkExpirationModal
            isOpen={isModalOpen}
            short={short}
            date={expirationDate}
            onClose={closeModal}
          />
        )}
        {activeAction === "expiration" && !hasExpiration && (
          <CreateUserLinkExpirationModal
            isOpen={isModalOpen}
            short={short}
            onClose={closeModal} />
        )}
        {activeAction === "delete" && (
          <DeleteLinkModal
            isOpen={isModalOpen}
            short={short}
            onClose={closeModal} />
        )}
      </DropdownMenu>
    </>
  )
}

export const LinkActions = memo(LinkActionsComponent)
