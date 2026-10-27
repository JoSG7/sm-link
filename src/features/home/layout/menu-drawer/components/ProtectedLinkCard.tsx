"use client"

import { LinkDetails } from "@/types/global";
import { IconCalendar, IconShieldLockFilled, IconTrashFilled, IconUserFilled } from "@tabler/icons-react";
import { format } from "date-fns";
import { useState } from "react";
import { DomainLogo } from "@/components/ui/DomainLogo";
import { DeletePasswordModal } from "@/features/home/modals/DeletePassword";


export function ProtectedLinkCard({ data }: { data: LinkDetails }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const url = new URL(data.original)
  const domain = url.hostname

  if (!data.has_password) return

  const createdAt = format(new Date(data.created_at), "MMMM d")

  return (
    <article className="relative isolate p-4 overflow-hidden rounded-2xl border border-subtle bg-card shadow-card whitespace-normal xl:p-5">

      <section className="flex items-start gap-4 pb-5">
        <div className="flex min-w-0 grow flex-col gap-2">
          <p className="truncate text-sm font-semibold text-transparent bg-clip-text bg-linear-to-r from-green-400 to-blue-500">
            sm-link.vercel.app/{data.short}
          </p>

          <p className="break-all text-sm leading-5 text-neutral-300">
            {data.original}
          </p>

          <p className="flex items-center gap-1 text-xs text-green-300">
            <IconCalendar className="size-3.5 text-green-500" />
            {createdAt}
          </p>
        </div>

        <DomainLogo className="size-12 sm:size-17" 
        domain={domain} />
      </section>

      <footer className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-blue-200">
            <IconShieldLockFilled className="size-3.5" />
            Protected
          </span>

          {data.has_user_id && (
            <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-purple-200">
              <IconUserFilled className="size-3.5 text-purple-300" />
              Claimed
            </span>
          )}
        </div>

        <button className="rounded-xl border border-neutral-700/70 bg-neutral-800/70 p-2 text-neutral-300 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
          type="button"
          onClick={() => setIsModalOpen(true)}>

          <IconTrashFilled className="size-5" />
        </button>
      </footer>

      <DeletePasswordModal
        isOpen={isModalOpen}
        short={data.short}
        onClose={() => setIsModalOpen(false)}
      />
    </article>
  )
}