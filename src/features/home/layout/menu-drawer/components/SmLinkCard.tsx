"use client"

import { IconCalendar, IconClockCheck, IconShieldLockFilled, IconUserFilled } from "@tabler/icons-react"
import { format } from "date-fns"
import { LinkDetails } from "@/types/global"
import { DomainLogo } from "@/components/ui/DomainLogo"
import { LinkActions } from "./LinkActions"


export function SmLinkCard({ data }: { data: LinkDetails }) {

  const url = new URL(data.original)
  const domain = url.hostname
  const createdAt = format(new Date(data.created_at), "MMMM d")
  return (

    <article className="relative p-4 isolate overflow-hidden rounded-2xl border border-[#ffffff1a] whitespace-normal shadow-[0_24px_70px_#00000038,inset_0_1px_#ffffff06] bg-card xl:p-5">

      <div className="pointer-events-none absolute -right-10 -top-10 -z-10 size-36 rounded-full bg-linear-to-br from-green-400/10 to-transparent blur-2xl transition duration-300 group-hover:scale-125" />

      <section className="relative flex grow items-center gap-5 lg:gap-7">
        <div className="flex flex-col grow text-sm ">

          {/* Short Link */}
          <p className="font-semibold text-nowrap text-transparent bg-clip-text 
          bg-linear-to-r from-green-400 to-blue-500 line-clamp-1 text-left
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
        <DomainLogo className="size-10 lg:size-15" 
        domain={domain} />
      </section>

      {/* Link Status */}
      <div className="my-4 flex flex-wrap items-center gap-2.5 text-xs">
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

      <LinkActions data={data} />
    </article>
  )
}


