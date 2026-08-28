"use client"

import { IconClockCheck, IconCopy, IconExternalLink, IconShieldLockFilled, IconTrashFilled } from "@tabler/icons-react"
import { ReactNode, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { LinkDetails } from "@/types/global"
import { CreatePasswordModal } from "@/features/home/modals/CreatePassword"
import { CreateExpirationModal } from "@/features/home/modals/CreateExpiration"
import { DeleteLinkModal } from "@/features/home/modals/DeleteLink"

type LinkAction = "password" | "expiration" | "delete"

interface ActionButton {
  icon: ReactNode
  onClick?: () => void
  disabled: boolean
}

export function LinkActions({ data }: { data: LinkDetails }) {
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`sm-link.vercel.app/${data.short}`).then(() => {
      toast.success("Copied!")
    })
  }

  const actionButtons: ActionButton[] = [
    {
      icon: <IconTrashFilled className="size-5" />,
      onClick: () => openModal("delete"),
      disabled: data.has_user_id
    },
    {
      icon: <IconClockCheck className="size-5" />,
      onClick: () => openModal("expiration"),
      disabled: data.has_user_id || Boolean(data.expires_at)
    },
    {
      icon: <IconShieldLockFilled className="size-5" />,
      onClick: () => openModal("password"),
      disabled: data.has_user_id || data.has_password
    },
    {
      icon: <IconExternalLink className="size-5" />,
      onClick: () => window.open(`https://sm-link.vercel.app/${data.short}`, "_blank", "noopener,noreferrer"),
      disabled: false
    },
    {
      icon: <IconCopy className="size-5" />,
      onClick: copyToClipboard,
      disabled: false
    }
  ]

  return (
    <div className="relative flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center justify-end gap-3">
        {actionButtons.map((action, index) => {
          return (
            <button
              type="button"
              className="cursor-pointer rounded-xl border border-transparent bg-neutral-900 p-2 text-neutral-300 transition-colors hover:border-neutral-700 hover:bg-neutral-800 hover:text-white disabled:cursor-auto disabled:opacity-50"
              key={index}
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.icon}
            </button>
          )
        })}
      </div>

      {activeAction === "password" && (
        <CreatePasswordModal
          isOpen={isModalOpen}
          short={data.short}
          onClose={closeModal}
        />
      )}
      {activeAction === "expiration" && (
        <CreateExpirationModal
          isOpen={isModalOpen}
          short={data.short}
          onClose={closeModal}
        />
      )}
      {activeAction === "delete" && (
        <DeleteLinkModal
          isOpen={isModalOpen}
          short={data.short}
          onClose={closeModal}
        />
      )}
    </div>
  )
}