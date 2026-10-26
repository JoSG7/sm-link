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
  hoverClassName: string
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
      hoverClassName: "hover:border-red-500/40 hover:bg-red-500/15 hover:text-red-300",
      onClick: () => openModal("delete"),
      disabled: data.has_user_id
    },
    {
      icon: <IconClockCheck className="size-5" />,
      hoverClassName: "hover:border-amber-400/40 hover:bg-amber-400/15 hover:text-amber-300",
      onClick: () => openModal("expiration"),
      disabled: data.has_user_id || Boolean(data.expires_at)
    },
    {
      icon: <IconShieldLockFilled className="size-5" />,
      hoverClassName: "hover:border-green-400/40 hover:bg-green-400/15 hover:text-green-300",
      onClick: () => openModal("password"),
      disabled: data.has_user_id || data.has_password
    },
    {
      icon: <IconExternalLink className="size-5" />,
      hoverClassName: "hover:border-sky-400/40 hover:bg-sky-400/15 hover:text-sky-300",
      onClick: () => window.open(`https://sm-link.vercel.app/${data.short}`, "_blank", "noopener,noreferrer"),
      disabled: false
    },
    {
      icon: <IconCopy className="size-5" />,
      hoverClassName: "hover:border-neutral-600 hover:bg-neutral-700 hover:text-white",
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
              className={`rounded-xl border border-neutral-700/70 bg-neutral-800/70 p-2 text-neutral-300 transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-auto disabled:opacity-50 ${action.hoverClassName}`}
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