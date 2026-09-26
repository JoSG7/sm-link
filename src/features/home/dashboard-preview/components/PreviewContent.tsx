import { IconAlarm, IconArrowUpRight, IconCalendarOff, IconClockCheck, IconClockExclamation, IconLink, IconShieldCheckFilled } from "@tabler/icons-react"
import { analyticsStats, links, PreviewView, stats } from "../preview-data"

const statIconClasses: Record<string, string> = {
  "text-green-300": "bg-green-500/15 text-green-300 ring-green-400/20",
  "text-blue-300": "bg-blue-500/15 text-blue-300 ring-blue-400/20",
  "text-purple-300": "bg-purple-500/15 text-purple-300 ring-purple-400/20",
  "text-amber-200": "bg-amber-500/15 text-amber-300 ring-amber-400/20",
}

function StatCards({ items = stats }: { items?: typeof stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ label, value, color, icon: Icon }) => (
        <article key={label} className="rounded-xl border border-neutral-800/80 bg-neutral-950 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-neutral-300">{label}</p>
              <p className={`mt-3 text-2xl font-semibold tracking-tight ${color}`}>{value}</p>
            </div>
            <span className={`rounded-xl p-2 ring-1 ${statIconClasses[color]}`}>
              <Icon className="size-5" stroke={1.8} />
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
          <div key={link.short} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
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
      <div className="grid gap-4 p-4 sm:p-5">
        <div className="flex items-center gap-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-3">
          <span className="flex size-8 items-center justify-center rounded-lg bg-red-400/10 text-red-300">!</span>
          <span className="flex-1">
            <span className="block text-xs text-neutral-400">Expired links</span>
            <span className="mt-1 block text-lg font-semibold text-neutral-100">2</span>
          </span>
          <span className="text-[10px] text-neutral-500">Review</span>
        </div>
        <div className="flex items-center gap-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-3">
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
    <div className="grid gap-4">
      <StatCards />
      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.85fr]">
        <TopLinks />
        <AtAGlance />
      </div>
    </div>
  )
}

function AnalyticsContent() {
  return (
    <div className="grid gap-4">
      <StatCards items={analyticsStats} />
      <article className="rounded-xl border border-neutral-800/80 bg-neutral-950 p-4 sm:p-5">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-neutral-100">Successful visits by link</h3>
            <p className="mt-1 text-xs text-neutral-400">Visits, excluding bots</p>
          </div>
          <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-[10px] font-semibold text-amber-200">1 / 1</span>
        </div>
        <div className="flex h-44 items-end gap-4 border-b border-neutral-800/80 px-2 pb-6 pt-3 sm:gap-6 sm:px-6">
          {[
            { height: 72, label: "/launch" },
            { height: 48, label: "/guide" },
            { height: 90, label: "/social" },
            { height: 58, label: "/docs" },
            { height: 38, label: "/pricing" },
            { height: 66, label: "/api" },
            { height: 82, label: "/newsletter" },
          ].map(({ height, label }) => (
            <div key={label} className="flex h-full flex-1 flex-col items-center justify-end gap-3">
              <div className="w-full max-w-14 rounded-t-md bg-green-400/80" style={{ height: `${height}%` }} />
              <span className="max-w-16 truncate text-[10px] text-neutral-500">{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {["Last 30 days", "Successful", "All devices", "Search links"].map((filter) => (
            <span key={filter} className="rounded-md border border-neutral-800 bg-neutral-900/50 px-2.5 py-1.5 text-[10px] text-neutral-400">
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
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total links", value: "24", color: "text-green-200", Icon: IconLink, iconClasses: "bg-green-500/15 text-green-300 ring-green-400/20" },
          { label: "Protected", value: "8", color: "text-blue-200", Icon: IconShieldCheckFilled, iconClasses: "bg-blue-500/15 text-blue-300 ring-blue-400/20" },
          { label: "With expiration", value: "11", color: "text-amber-200", Icon: IconAlarm, iconClasses: "bg-yellow-500/15 text-yellow-200 ring-yellow-400/20" },
          { label: "Expired", value: "2", color: "text-red-200", Icon: IconClockExclamation, iconClasses: "bg-red-500/15 text-red-300 ring-red-400/20" },
        ].map(({ label, value, color, Icon, iconClasses }) => (
          <article key={label} className="rounded-xl border border-neutral-800/80 bg-neutral-950 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-neutral-300">{label}</p>
                <p className={`mt-3 text-2xl font-semibold ${color}`}>{value}</p>
              </div>
              <span className={`rounded-xl p-2 ring-1 ${iconClasses}`}>
                <Icon className="size-5" stroke={1.8} />
              </span>
            </div>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-neutral-900">
              <div className={`h-full w-3/5 rounded-full bg-current opacity-70 ${color}`} />
            </div>
          </article>
        ))}
      </div>
      <article className="overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-950">
        <div className="flex items-center justify-between border-b border-neutral-800/80 px-4 py-4 sm:px-5">
          <div>
            <h3 className="text-sm font-semibold text-neutral-100">Your links</h3>
            <p className="mt-1 text-xs text-neutral-400">Manage and monitor every short link</p>
          </div>
          <span className="rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-300">24 active</span>
        </div>
        <div className="hidden grid-cols-[minmax(0,1.3fr)_minmax(110px,0.9fr)_minmax(110px,0.8fr)_minmax(120px,0.9fr)_minmax(100px,0.7fr)] gap-4 border-b border-neutral-800/80 px-4 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-600 sm:grid sm:px-5">
          <span>Original</span>
          <span>Short link</span>
          <span>Created at</span>
          <span>Expires at</span>
          <span>Status</span>
        </div>
        <div className="divide-y divide-neutral-900">
          {links.map((link, index) => (
            <div key={link.short} className="grid gap-4 px-4 py-4 sm:grid-cols-[minmax(0,1.3fr)_minmax(110px,0.9fr)_minmax(110px,0.8fr)_minmax(120px,0.9fr)_minmax(100px,0.7fr)] sm:items-center sm:gap-4 sm:px-5">
              <p className="truncate text-xs text-neutral-300">{link.original}</p>
              <p className="truncate text-sm font-medium text-neutral-100">{link.short}</p>
              <p className="text-xs text-neutral-400">{["Sep 12, 2026", "Sep 18, 2026", "Sep 22, 2026"][index]}</p>
              <div className="ml-11 text-xs text-neutral-400 sm:m-0">
                {index === 1 ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-amber-200">
                    <IconClockCheck className="size-3.5" />
                    Expires Sep 30, 2026
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full border border-neutral-800 px-2.5 py-1 text-neutral-400">
                    <IconCalendarOff className="size-3.5 text-neutral-500" />
                    No expiration
                  </span>
                )}
              </div>
              <div className="ml-11 flex flex-wrap gap-3 text-xs font-medium sm:m-0">
                <span className="inline-flex items-center gap-1 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-1 text-green-200">
                  <IconLink className="size-3.5" />
                  Public
                </span>
                {index === 2 && <span className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-red-300">Expired</span>}
              </div>
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