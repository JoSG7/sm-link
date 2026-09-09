import Link from "next/link"
import { IconClock, IconLink } from "@tabler/icons-react"
import type { LinkDetails } from "@/types/global"

type DashboardAtAGlanceProps = {
  expiredLinks: LinkDetails[]
  protectedLinks: LinkDetails[]
  latestLink: LinkDetails | null
  latestVisitedAt: string | null
}

const formatDate = (date: string) => new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
}).format(new Date(date))

export function AtAGlance({ expiredLinks, protectedLinks, latestLink, latestVisitedAt }: DashboardAtAGlanceProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
      <div className="border-b border-neutral-800/80 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-neutral-100">At a glance</h2>
        <p className="mt-1 text-sm text-neutral-400">Things worth checking today</p>
      </div>
      <div className="grid gap-4 p-5 sm:p-6">
        <div className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
          <span className="flex size-9 items-center justify-center rounded-lg bg-red-500/10 text-red-300"><IconClock className="size-5" /></span>
          <span className="min-w-0 flex-1"><span className="block text-sm text-neutral-400">Expired links</span><span className="mt-1 block text-xl font-semibold text-neutral-100">{expiredLinks.length}</span></span>
          <Link href="/dashboard/links" className="text-xs text-neutral-500 hover:text-neutral-200">Review</Link>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
          <span className="flex size-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300"><IconLink className="size-5" /></span>
          <span className="min-w-0 flex-1"><span className="block text-sm text-neutral-400">Protected links</span><span className="mt-1 block text-xl font-semibold text-neutral-100">{protectedLinks.length}</span></span>
          <Link href="/dashboard/links" className="text-xs text-neutral-500 hover:text-neutral-200">Manage</Link>
        </div>
        <div className="border-t border-neutral-900 pt-4">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-600">Latest activity</p>
          {latestLink && latestVisitedAt ? (
            <Link href={`/dashboard/analytics/${latestLink.short}`} className="mt-3 block truncate text-sm text-neutral-300 hover:text-green-300">/{latestLink.short} visited {formatDate(latestVisitedAt)}</Link>
          ) : <p className="mt-3 text-sm text-neutral-500">No visits recorded yet.</p>}
        </div>
      </div>
    </article>
  )
}
