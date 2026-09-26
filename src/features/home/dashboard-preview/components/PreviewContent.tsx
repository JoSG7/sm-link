import { IconArrowUpRight, IconLink } from "@tabler/icons-react"
import { analyticsStats, links, PreviewView, stats } from "../preview-data"

const statIconClasses: Record<string, string> = {
  "text-green-300": "bg-green-500/15 text-green-300 ring-green-400/20",
  "text-blue-300": "bg-blue-500/15 text-blue-300 ring-blue-400/20",
  "text-purple-300": "bg-purple-500/15 text-purple-300 ring-purple-400/20",
  "text-amber-300": "bg-amber-500/15 text-amber-300 ring-amber-400/20",
}

function StatCards({ items = stats }: { items?: typeof stats }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ label, value, color, icon: Icon }) => (
        <article key={label} className="rounded-xl border border-neutral-800/80 bg-neutral-950 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-neutral-300">{label}</p>
              <p className={`mt-3 text-2xl font-semibold tracking-tight ${color}`}>{value}</p>
            </div>
            <span className={`rounded-xl p-2.5 ring-1 ${statIconClasses[color]}`}>
              <Icon className="size-6" stroke={1.8} />
            </span>
          </div>
          <div className="mt-4 h-1 overflow-hidden rounded-full bg-neutral-900">
            <div className={`h-full w-3/5 rounded-full bg-current opacity-70 ${color}`} />
          </div>
        </article>
      ))}
    </div>
  )
}

function TopLinks() {
  return (
    <article className="rounded-xl border border-neutral-800/80 bg-neutral-950 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-100">Top links</h3>
          <p className="mt-1 text-xs text-neutral-400">Most visited this month</p>
        </div>
        <IconArrowUpRight className="size-4 text-neutral-600" />
      </div>
      <div className="mt-4 divide-y divide-neutral-900">
        {links.map((link) => (
          <div key={link.short} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-300">
              <IconLink className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-medium text-neutral-200">{link.short}</span>
              <span className="mt-1 block truncate text-[10px] text-neutral-500">{link.original}</span>
            </span>
            <span className="text-xs font-semibold text-neutral-300">{link.visits}</span>
          </div>
        ))}
      </div>
    </article>
  )
}

function AtAGlance() {
  return (
    <article className="overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-950">
      <div className="border-b border-neutral-800/80 p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-neutral-100">At a glance</h3>
        <p className="mt-1 text-xs text-neutral-400">Things worth checking today</p>
      </div>
      <div className="grid gap-3 p-4 sm:p-5">
        <div className="flex items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/50 p-3">
          <span className="flex size-8 items-center justify-center rounded-lg bg-red-400/10 text-red-300">!</span>
          <span className="flex-1">
            <span className="block text-xs text-neutral-400">Expired links</span>
            <span className="mt-1 block text-lg font-semibold text-neutral-100">2</span>
          </span>
          <span className="text-[10px] text-neutral-500">Review</span>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/50 p-3">
          <span className="flex size-8 items-center justify-center rounded-lg bg-blue-400/10 text-blue-300">
            <IconLink className="size-4" />
          </span>
          <span className="flex-1">
            <span className="block text-xs text-neutral-400">Protected links</span>
            <span className="mt-1 block text-lg font-semibold text-neutral-100">8</span>
          </span>
          <span className="text-[10px] text-neutral-500">Manage</span>
        </div>
        <div className="border-t border-neutral-900 pt-3">
          <p className="text-[10px] uppercase tracking-[0.16em] text-neutral-600">Latest activity</p>
          <p className="mt-2 truncate text-xs text-neutral-300">/launch visited Aug 30, 2026</p>
        </div>
      </div>
    </article>
  )
}

function DashboardContent() {
  return (
    <div className="grid gap-3">
      <StatCards />
      <div className="grid gap-3 xl:grid-cols-[1.5fr_0.85fr]">
        <TopLinks />
        <AtAGlance />
      </div>
    </div>
  )
}

function AnalyticsContent() {
  return (
    <div className="grid gap-3">
      <StatCards items={analyticsStats} />
      <article className="rounded-xl border border-moss-border bg-moss-850 p-4 sm:p-5">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-neutral-100">Successful visits by link</h3>
            <p className="mt-1 text-xs text-moss-muted">Visits, excluding bots</p>
          </div>
          <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-[10px] font-semibold text-amber-200">1 / 1</span>
        </div>
        <div className="flex h-44 items-end gap-3 border-b border-moss-border px-2 pb-6 pt-3 sm:gap-6 sm:px-6">
          {[72, 48, 90, 58, 38].map((height, index) => (
            <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <div className="w-full max-w-14 rounded-t-md bg-green-400/80" style={{ height: `${height}%` }} />
              <span className="max-w-16 truncate text-[10px] text-moss-muted">{links[index % links.length].short}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Last 30 days", "Successful", "All devices", "Search links"].map((filter) => (
            <span key={filter} className="rounded-md border border-moss-border bg-moss-800 px-2.5 py-1.5 text-[10px] text-moss-copy">
              {filter}
            </span>
          ))}
        </div>
      </article>
    </div>
  )
}

function LinksContent() {
  return (
    <div className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total links", "24", "text-green-300"],
          ["Protected", "8", "text-blue-300"],
          ["With expiration", "11", "text-amber-300"],
          ["Expired", "2", "text-red-300"],
        ].map(([label, value, color]) => (
          <article key={label} className="rounded-xl border border-moss-border bg-moss-850 p-4">
            <p className="text-xs text-moss-muted">{label}</p>
            <p className={`mt-3 text-2xl font-semibold ${color}`}>{value}</p>
          </article>
        ))}
      </div>
      <article className="overflow-hidden rounded-xl border border-moss-border bg-moss-850">
        <div className="flex items-center justify-between border-b border-moss-border px-4 py-4 sm:px-5">
          <div>
            <h3 className="text-sm font-semibold text-neutral-100">Your links</h3>
            <p className="mt-1 text-xs text-moss-muted">Manage and monitor every short link</p>
          </div>
          <span className="rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-300">24 active</span>
        </div>
        <div className="divide-y divide-moss-rule">
          {links.map((link, index) => (
            <div key={link.short} className="flex items-center gap-3 px-4 py-4 sm:px-5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-300">
                <IconLink className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-neutral-100">{link.short}</p>
                <p className="mt-1 truncate text-xs text-moss-dim">{link.original}</p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-neutral-200">{link.visits}</p>
                <p className="text-[10px] text-moss-muted">visits</p>
              </div>
              <span className={`size-2 rounded-full ${index === 2 ? "bg-amber-300" : "bg-green-400"}`} />
            </div>
          ))}
        </div>
      </article>
    </div>
  )
}

export function PreviewContent({ view }: { view: PreviewView }) {
  if (view === "analytics") return <AnalyticsContent />
  if (view === "links") return <LinksContent />
  return <DashboardContent />
}