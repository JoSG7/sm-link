import Link from "next/link"
import { IconArrowUpRight, IconLink } from "@tabler/icons-react"
import type { LinkDetails } from "@/types/global"

type DashboardTopLinksProps = {
  links: LinkDetails[]
  visitsByLink: Record<string, number>
}

export function TopLinks({ links, visitsByLink }: DashboardTopLinksProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between border-b border-neutral-800/80 p-5 sm:p-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-100">Top links</h2>
          <p className="mt-1 text-sm text-neutral-400">Your most visited links by successful visits</p>
        </div>
        <Link href="/dashboard/links" className="text-sm font-medium text-green-300 hover:text-green-200">See all</Link>
      </div>
      {links.length === 0 ? (
        <p className="p-8 text-center text-sm text-neutral-400">Create your first link to see it here.</p>
      ) : (
        <div className="divide-y divide-neutral-900">
          {links.map(link => (
            <Link key={link.id} href={`/dashboard/analytics/${link.short}`} className="flex items-center gap-4 px-5 py-4 transition hover:bg-neutral-900/60 sm:px-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-300"><IconLink className="size-5" /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-neutral-100">/{link.short}</span>
                <span className="mt-1 block truncate text-sm text-neutral-500">{link.original}</span>
              </span>
              <span className="text-right">
                <span className="block font-semibold text-neutral-200">{visitsByLink[link.id] ?? 0}</span>
                <span className="text-xs text-neutral-500">visits</span>
              </span>
              <IconArrowUpRight className="size-4 shrink-0 text-neutral-600" />
            </Link>
          ))}
        </div>
      )}
    </article>
  )
}
