import Link from "next/link"
import { IconArrowUpRight, IconChartBar, IconLink, IconPercentage, IconUsers } from "@tabler/icons-react"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { ErrorMessage } from "@/components/ui/ErrorMessage"
import { AnalyticsStatCard } from "@/features/protected/analytics/components/StatCard"
import type { LinkDetails } from "@/types/global"
import { AtAGlance } from "./components/AtAGlance"
import { TopLinks } from "./components/TopLinks"

type DashboardMetric = {
  link_id: string
  visited_at: string
  status: "success" | "wrong_password" | "expired"
}

type DashboardSummary = {
  successful_visits: number
  unique_visitors: number
  active_links: number
  success_rate: number
}

export async function DashboardOverview() {
  const supabase = await createSupabaseServerClient()
  const [{ data: overviewRows, error: overviewError }, { data: links, error: linksError }] = await Promise.all([
    supabase.rpc("get_global_metrics").maybeSingle(),
    supabase.rpc("get_links"),
  ])

  if (overviewError || linksError) {
    return <ErrorMessage title="Dashboard unavailable" description="We couldn't load your workspace overview. Please try again in a moment." actionHref="/dashboard" actionLabel="Back to dashboard" />
  }

  const overview: DashboardSummary = (overviewRows as DashboardSummary | null) ?? {
    successful_visits: 0,
    unique_visitors: 0,
    active_links: 0,
    success_rate: 0,
  }
  const linkRows = (links ?? []) as LinkDetails[]
  const linkIds = linkRows.map(link => link.id)
  let metrics: DashboardMetric[] = []

  if (linkIds.length) {
    const { data, error } = await supabase
      .from("link_metrics")
      .select("link_id, visited_at, status")
      .eq("is_bot", false)
      .in("link_id", linkIds)

    if (error) {
      return <ErrorMessage title="Dashboard unavailable" description="Your links loaded, but activity data could not be retrieved." actionHref="/dashboard" actionLabel="Try dashboard again" />
    }
    metrics = data ?? []
  }

  const visitsByLink = metrics.reduce<Record<string, number>>((counts, metric) => {
    if (metric.status === "success") counts[metric.link_id] = (counts[metric.link_id] ?? 0) + 1
    return counts
  }, {})
  const topLinks = [...linkRows]
    .sort((first, second) => (visitsByLink[second.id] ?? 0) - (visitsByLink[first.id] ?? 0))
    .slice(0, 5)
  const expiredLinks = linkRows.filter(link => link.is_expired)
  const protectedLinks = linkRows.filter(link => link.has_password)
  const latestMetric = [...metrics].sort((first, second) => new Date(second.visited_at).getTime() - new Date(first.visited_at).getTime())[0]
  const latestLink = latestMetric ? linkRows.find(link => link.id === latestMetric.link_id) ?? null : null

  return (
    <section className="flex min-h-screen flex-col gap-7 md:py-7 xl:py-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="mt-1 text-3xl font-semibold text-neutral-100">
            <span className="bg-linear-to-r from-green-400 to-sky-500 bg-clip-text text-transparent">SmLinks </span>
            Dashboard
          </h1>
          <p className="mt-2 text-neutral-400">A quick read on your links and their performance.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/links" className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 px-4 py-2 text-sm font-medium text-neutral-200 transition hover:border-neutral-600 hover:bg-neutral-900">
            Manage links <IconArrowUpRight className="size-4" />
          </Link>
          <Link href="/dashboard/analytics" className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-green-400 to-sky-500 px-4 py-2 text-sm font-semibold transition hover:from-green-300 hover:to-sky-400">
            View analytics <IconChartBar className="size-4" />
          </Link>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsStatCard title="Successful visits" value={overview.successful_visits} icon={IconChartBar} iconClass="bg-green-500/15 text-green-300 ring-green-400/20" countClass="text-green-200" glowClass="from-green-500/10" />

        <AnalyticsStatCard title="Unique visitors" value={overview.unique_visitors} icon={IconUsers} iconClass="bg-blue-500/15 text-blue-300 ring-blue-400/20" countClass="text-blue-200" glowClass="from-blue-500/10" />

        <AnalyticsStatCard title="Active links" value={overview.active_links} icon={IconLink} iconClass="bg-purple-500/15 text-purple-300 ring-purple-400/20" countClass="text-purple-200" glowClass="from-purple-500/10" />

        <AnalyticsStatCard title="Success rate" value={overview.success_rate} icon={IconPercentage} iconClass="bg-amber-500/15 text-amber-300 ring-amber-400/20" countClass="text-amber-200" glowClass="from-amber-500/10" suffix="%" />
      </div>

      <div className="grid gap-7 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.85fr)]">
        <TopLinks links={topLinks} visitsByLink={visitsByLink} />
        <AtAGlance expiredLinks={expiredLinks} protectedLinks={protectedLinks} latestLink={latestLink} latestVisitedAt={latestMetric?.visited_at ?? null} />
      </div>
    </section>
  )
}
