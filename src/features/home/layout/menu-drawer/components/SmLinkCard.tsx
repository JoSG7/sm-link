"use client"

import { IconCalendar, IconClockCheck, IconCopy, IconExternalLink, IconShieldLockFilled, IconTrashFilled, IconUserFilled } from "@tabler/icons-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { LinkDetails } from "@/global"
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
  const date = new Date(data.created_at)
  const day = date.getDate()
  const month = format(date, "MMMM")
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

    <article className="p-4 rounded-lg border border-graphite whitespace-normal border-l-2 xl:p-5">

      <section className="grow flex items-center pb-4 gap-5 lg:gap-7">

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
          <p className=" flex gap-1 text-green-300 items-center ">
            <IconCalendar className="size-5 text-green-500 " />
            {month} {day}
          </p>
        </div>

        {/* Link Logo */}
        <DomainLogo domain={domain} />
      </section>

      {/* Buttons section */}
      <div className="flex justify-end items-center gap-3 relative">
        {
          data.has_user_id && (
            <div className="absolute left-0 p-2.5 rounded-full border border-neutral-800">
              <IconUserFilled className="size-4" />
            </div>
          )
        }
        {
          actionButtons.map((el, i) => {

            if (el.anchor) {
              return (
                <Link className="p-2 rounded-xl bg-neutral-900 disabled:opacity-50 disabled:cursor-auto"
                  key={i}
                  href={el.anchor.href}
                  target="_blank"
                >
                  {el.icon}
                </Link>
              )
            }

            return(
              <button className="p-2 rounded-xl bg-neutral-900 cursor-pointer disabled:opacity-50 disabled:cursor-auto"
                key={i}
                onClick={el.onClick}
                disabled={el.disabled}>
                  {el.icon}
              </button>
            )

          })
        }
      </div>
    </article>
  )
}


