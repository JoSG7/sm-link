import { LinkDetails } from "@/types/global";
import { IconCalendar, IconShieldLockFilled, IconTrashFilled, IconUserFilled } from "@tabler/icons-react";
import { format } from "date-fns";
import { DomainLogo } from "../../../../../components/ui/DomainLogo";
import { useDispatch } from "react-redux";
import { toggleDeletePassword } from "@/store/modal-slice";


export function ProtectedLinkCard({ data }: { data: LinkDetails }) {
  const url = new URL(data.original)
  const domain = url.hostname

  const dispatch = useDispatch()

  if (!data.has_password) return

  const createdAt = format(new Date(data.created_at), "MMMM d")

  return (
    <article className="relative isolate overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 p-4 whitespace-normal shadow-[0_12px_40px_rgba(0,0,0,0.18)] xl:p-5">

      <div className="pointer-events-none absolute -right-10 -top-10 -z-10 size-36 rounded-full bg-linear-to-br from-blue-500/15 via-purple-500/10 to-transparent blur-2xl" />

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

        <DomainLogo domain={domain} />
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

        <button className="rounded-xl border border-transparent bg-neutral-900 p-2 text-neutral-300 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
          type="button"
          onClick={() => dispatch(toggleDeletePassword(data.short))}>

          <IconTrashFilled className="size-4" />
        </button>
      </footer>
    </article>
  )
}