"use client"

import { IconCalendar, IconClockCheck, IconCopy, IconExternalLink, IconShieldLockFilled, IconTrashFilled, IconUserFilled } from "@tabler/icons-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { LinkDetails } from "@/types/global"
import { DomainLogo } from "@/components/ui/DomainLogo"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { toggleDeleteLink, toggleSetExpiration, toggleSetPassword } from "@/store/modal-slice"
import { ReactNode } from "react"

interface ActionButtons {
  icon: ReactNode
  onClick?: () => void
  disabled: boolean
  anchor?: {
    href: string
  }
}


export function SmLinkCard({ data }: { data: LinkDetails }) {

  const url = new URL(data.original)
  const domain = url.hostname
  const createdAt = format(new Date(data.created_at), "MMMM d")
  const dispatch = useDispatch()

  const actionButtons: ActionButtons[] = [
    {
      icon: <IconTrashFilled className="size-5 " />,
      onClick: () => { dispatch(toggleDeleteLink(data.short)) },
      disabled: data.has_user_id
    },
    {
      icon: <IconClockCheck className="size-5 " />,
      onClick: () => { dispatch(toggleSetExpiration(data.short)) },
      disabled: data.has_user_id || data.expires_at ? true : false
    },
    {
      icon: <IconShieldLockFilled className="size-5 " />,
      onClick: () => { dispatch(toggleSetPassword(data.short)) },
      disabled: data.has_user_id || data.has_password
    },
    {
      icon: <IconExternalLink className="size-5" />,
      anchor: { href: `https://sm-link.vercel.app/${data.short}` },
      disabled: false
    },
    {
      icon: <IconCopy className="size-5 " />,
      onClick: () => { copyToClipboard() },
      disabled: false
    }
  ]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`sm-link.vercel.app/${data.short}`).then(() => { toast.success("Copied!") })
  }

  return (

    <article className="relative isolate overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 p-4 whitespace-normal shadow-[0_12px_40px_rgba(0,0,0,0.18)] xl:p-5">

      <div className="pointer-events-none absolute -right-10 -top-10 -z-10 size-36 rounded-full bg-linear-to-br from-blue-500/15 via-green-500/15 to-transparent blur-2xl" />

      <section className="relative flex grow items-center gap-5 pb-4 lg:gap-7">

        <div className="flex flex-col grow text-sm ">

          {/* Short Link */}
          <p className="font-semibold text-nowrap text-transparent bg-clip-text 
          bg-linear-to-r from-green-400 to-blue-500 
          sm:text-base lg:text-sm">
            sm-link.vercel.app/{data.short}
          </p>

          {/* Original Link */}
          <p className="max-h-10.5 mt-1 mb-2 break-all overflow-y-auto text-neutral-200 ">
            {data.original}
          </p>

          {/* Creation date */}
          <p className="flex items-center gap-1 text-green-300">
            <IconCalendar className="size-4 text-green-500" />
            {createdAt}
          </p>
        </div>

        {/* Link Logo */}
        <DomainLogo domain={domain} />
      </section>

      {/* Buttons section */}
      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {data.expires_at && (
            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 ${data.is_expired ? "border-red-500/30 bg-red-500/10 text-red-300" : "border-amber-500/30 bg-amber-500/10 text-amber-200"}`}>
              <IconClockCheck className="size-3.5" />
              {data.is_expired ? "Expired" : "Expires"} {format(new Date(data.expires_at), "MMM d, yyyy")}
            </span>
          )}

          {data.has_password && (
            <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-blue-200">
              <IconShieldLockFilled className="size-3.5" />
              Protected
            </span>
          )}

          {data.has_user_id && (
            <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-purple-200">
              <IconUserFilled className="size-3.5 text-purple-300" />
              Claimed
            </span>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          {
          actionButtons.map((el, i) => {

            if (el.anchor) {
              return (
                <Link className="rounded-xl border border-transparent bg-neutral-900 p-2 text-neutral-300 transition-colors hover:border-neutral-700 hover:bg-neutral-800 hover:text-white"
                  key={i}
                  href={el.anchor.href}
                  target="_blank"
                >
                  {el.icon}
                </Link>
              )
            }

            return(
              <button className="cursor-pointer rounded-xl border border-transparent bg-neutral-900 p-2 text-neutral-300 transition-colors hover:border-neutral-700 hover:bg-neutral-800 hover:text-white disabled:cursor-auto disabled:opacity-50"
                key={i}
                onClick={el.onClick}
                disabled={el.disabled}>
                  {el.icon}
              </button>
            )

          })
          }
        </div>
      </div>
    </article>
  )
}


