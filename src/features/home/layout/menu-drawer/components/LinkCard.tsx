"use client"

import { IconCalendar, IconClockCheck, IconCopy, IconExternalLink, IconShieldLockFilled, IconTrashFilled } from "@tabler/icons-react"
import { months } from "@/consts"
import { toast } from "sonner"
import { LinkDetails } from "@/global"
import { DomainLogo } from "../../../components/ui/DomainLogo"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { toggleDeleteLink, toggleSetExpiration, toggleSetPassword } from "@/store/modal-slice"


export function LinkCard({ data }: { data: LinkDetails }) {

  const url = new URL(data.original)
  const domain = url.hostname
  const date = new Date(data.created_at)
  const day = date.getDate()
  const month = months[date.getMonth()]
  const dispatch = useDispatch()


  const copyToClipboard = () => {
    navigator.clipboard.writeText(`sm-link.vercel.app/${data.short}`).then(() => { toast.success("Copiado Correctamente") })
  }


  return (

    <article className="p-4 rounded-lg border border-graphite whitespace-normal border-l-2 ">

      <section className="grow flex items-center pb-4 gap-5 ">

        <div className="flex flex-col grow text-sm ">

          {/* Short Link */}
          <p className="font-semibold text-nowrap text-transparent bg-clip-text 
          bg-gradient-to-r from-green-400 to-blue-500 ">
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
      <div className="flex justify-end gap-3 ">

        {/* Delete button */}
        <button className="p-2 rounded-xl bg-neutral-900 cursor-pointer "
          onClick={() => { dispatch(toggleDeleteLink(data.short)) }}>

          <IconTrashFilled className="size-5 " />
        </button>

        {/* Expiration Button */}
        <button className="p-2 rounded-xl bg-neutral-900 cursor-pointer disabled:opacity-50 disabled:cursor-auto "
          onClick={() => { dispatch(toggleSetExpiration(data.short)) }}
          disabled={data.has_expiration}>

          <IconClockCheck className="size-5 " />
        </button>

        {/* Protected Button */}
        <button className="p-2 rounded-xl bg-neutral-900 cursor-pointer disabled:opacity-50 disabled:cursor-auto "
          onClick={() => { dispatch(toggleSetPassword(data.short)) }}
          disabled={data.has_password}>

          <IconShieldLockFilled className="size-5 " />
        </button>

        {/* Visit button */}
        <Link className="p-2 rounded-xl bg-neutral-900 "
          href={`https://sm-link.vercel.app/${data.short}`}
          target="_blank"
        >
          <IconExternalLink className="size-5 " />
        </Link>

        {/* Copy button */}
        <button className="p-2 rounded-xl bg-neutral-900 cursor-pointer "
          onClick={copyToClipboard}>

          <IconCopy className="size-5 " />
        </button>
      </div>
    </article>
  )
}


