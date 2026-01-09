"use client"

import { IconCalendar, IconClockCheck, IconCopy, IconExclamationCircle, IconExternalLink, IconShieldLockFilled, IconTrashFilled } from "@tabler/icons-react"
import { months } from "@/consts"
import { toast } from "sonner"
import { LinkDetails } from "@/global"
import { DomainLogo } from "../../../../shared/components/DomainLogo"
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


export function LinkCard({ data }: { data: LinkDetails }) {

  const url = new URL(data.original)
  const domain = url.hostname
  const date = new Date(data.created_at)
  const day = date.getDate()
  const month = months[date.getMonth()]
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
      disabled: data.has_user_id || data.has_expiration
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
      onClick: () => copyToClipboard,
      disabled: false
    }
  ]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`sm-link.vercel.app/${data.short}`).then(() => { toast.success("Copiado Correctamente") })
  }


  return (

    <article className="p-4 rounded-lg border border-graphite whitespace-normal border-l-2 xl:p-5">

      <section className="grow flex items-center pb-4 gap-5 lg:gap-7">

        <div className="flex flex-col grow text-sm ">

          {/* Short Link */}
          <p className="font-semibold text-nowrap text-transparent bg-clip-text 
          bg-gradient-to-r from-green-400 to-blue-500 
          sm:text-base lg:text-sm">
            sm-link.vercel.app/{data.short}
          </p>

          {/* Original Link */}
          <p className="max-h-[42px] mt-1 mb-2 break-all overflow-y-auto text-neutral-200 ">
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
            <div className="absolute left-0 py-2 px-3 flex gap-2 items-center rounded-lg text-sm 
            bg-gradient-to-r from-green-400/80 to-sky-500/80">
              <IconExclamationCircle className="size-4" />
              On your Account
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


