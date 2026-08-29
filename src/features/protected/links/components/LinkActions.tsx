"use client"

import { IconAlarmPlus, IconKey, IconTrash, IconDots, IconLock } from "@tabler/icons-react"
import { memo, useEffect, useRef, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu"
import { CreatePasswordModal } from "../modals/password/CreatePassword"
import { UpdatePasswordModal } from "../modals/password/UpdatePassword"
import { CreateExpirationModal } from "../modals/expiration/CreateExpiration"
import { UpdateExpirationModal } from "../modals/expiration/UpdateExpiration"
import { DeleteExpirationModal } from "../modals/expiration/DeleteExpiration"
import { DeletePasswordModal } from "../modals/password/DeletePassword"
import { DeleteLinkModal } from "../modals/DeleteLink"

type LinkAction = "password" | "expiration" | "delete" | "deletePassword" | "deleteExpiration"

interface LinkActionsProps {
  short: string
  hasPassword: boolean
  expirationDate: string | null
  hasUserId: boolean
  isAuthenticated: boolean
}

function LinkActionsComponent({ short, hasPassword, expirationDate, hasUserId, isAuthenticated }: LinkActionsProps) {
  const hasExpiration = expirationDate !== null
  const isClaimedGuestLink = !isAuthenticated && hasUserId
  const canUpdatePassword = !isClaimedGuestLink && (isAuthenticated || !hasPassword)
  const canUpdateExpiration = !isClaimedGuestLink && (isAuthenticated || !hasExpiration)
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
          className="min-w-36 border-neutral-800 bg-neutral-950 p-1 text-neutral-300 shadow-lg"
        >
          <DropdownMenuItem
            className="gap-2 text-neutral-300 hover:bg-neutral-800 hover:text-white focus:bg-neutral-800 focus:text-white"
            disabled={!canUpdatePassword}
            onSelect={() => openModal("password")}
          >
            <IconKey className="size-4" />
            {hasPassword ? "Update password" : "Password"}
            {!canUpdatePassword && <IconLock className="ml-auto size-4" />}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2 text-neutral-300 hover:bg-neutral-800 hover:text-white focus:bg-neutral-800 focus:text-white"
            disabled={!canUpdateExpiration}
            onSelect={() => openModal("expiration")}
          >
            <IconAlarmPlus className="size-4" />
            {hasExpiration ? "Update expiration" : "Expiration"}
            {!canUpdateExpiration && <IconLock className="ml-auto size-4" />}
          </DropdownMenuItem>

          {hasPassword && (
            <DropdownMenuItem
              className="gap-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 focus:bg-red-500/10 focus:text-red-300"
              disabled={isClaimedGuestLink}
              onSelect={() => openModal("deletePassword")}
            >
              <IconKey className="size-4" />
              Remove password
              {isClaimedGuestLink && <IconLock className="ml-auto size-4" />}
            </DropdownMenuItem>
          )}

          {hasExpiration && (
            <DropdownMenuItem
              className="gap-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 focus:bg-red-500/10 focus:text-red-300"
              disabled={isClaimedGuestLink}
              onSelect={() => openModal("deleteExpiration")}
            >
              <IconAlarmPlus className="size-4" />
              Remove expiration
              {isClaimedGuestLink && <IconLock className="ml-auto size-4" />}
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            className="gap-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 focus:bg-red-500/10 focus:text-red-300"
            disabled={isClaimedGuestLink}
            onSelect={() => openModal("delete")}
          >
            <IconTrash className="size-4" />
            Delete
            {isClaimedGuestLink && <IconLock className="ml-auto size-4" />}
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
          <UpdateExpirationModal
            isOpen={isModalOpen}
            short={short}
            date={expirationDate}
            onClose={closeModal}
          />
        )}
        {activeAction === "expiration" && !hasExpiration && (
          <CreateExpirationModal
            isOpen={isModalOpen}
            short={short}
            onClose={closeModal} />
        )}
        {activeAction === "deletePassword" && hasPassword && (
          <DeletePasswordModal
            isOpen={isModalOpen}
            short={short}
            onClose={closeModal} />
        )}
        {activeAction === "deleteExpiration" && hasExpiration && (
          <DeleteExpirationModal
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
