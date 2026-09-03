import { IconActivity, IconChartBar, IconLink, IconUsers } from "@tabler/icons-react"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { AnalyticsStatCard } from "./components/AnalyticsStatCard"
import { GlobalViewsBarChart } from "./components/GlobalViewsBarChart"
import { LinkDetails } from "@/types/global"



export async function AnalyticsOverview() {

  const supabase = await createSupabaseServerClient()
  const [{ data, error }, { data: links, error: linksError }] = await Promise.all([
    supabase.rpc("get_global_metrics"),
    supabase.rpc("get_links"),
  ])

  if (error || linksError) {
    return <p className="py-8 text-red-300">Unable to load analytics.</p>
  }

  const overview = data?.[0] ?? {
    successful_visits: 0,
    unique_visitors: 0,
    active_links: 0,
    average_visits: 0,
  }

  const linkRows = links as LinkDetails[]
  const linkIds = linkRows.map(link => link.id)

  let successfulVisitsByLink: { short: string; original: string; id: string }[] = []
  let successfulVisitMetrics: { link_id: string; visited_at: string }[] = []

  if (linkIds.length) {

    const { data: metrics, error: metricsError } = await supabase
      .from("link_metrics")
      .select("link_id, visited_at")
      .eq("status", "success")
      .eq("is_bot", false)
      .in("link_id", linkIds)

    if (metricsError) {
      return <p className="py-8 text-red-300">Unable to load analytics.</p>
    }

    successfulVisitMetrics = metrics ?? []

    successfulVisitsByLink = linkRows
      .map(link => ({
        short: link.short,
        original: link.original,
        id: link.id,
      }))
  }

  return (
    <section className="flex min-h-screen flex-col gap-7 md:py-7 xl:py-8">
      <header>
        <h1 className="text-3xl font-semibold">
          <span className="bg-linear-to-r from-green-400 to-sky-500 bg-clip-text text-transparent">SmLinks </span>
          Analytics
        </h1>
        <p className="pt-2 text-neutral-300">A global summary of your link performance</p>
      </header>

      <div className="flex flex-col gap-4 lg:flex-row">
        <AnalyticsStatCard
          title="Successful visits"
          value={overview.successful_visits}
          icon={IconChartBar}
          iconClass="bg-green-500/15 text-green-300 ring-green-400/20"
          countClass="text-green-200"
          glowClass="from-green-500/10"
        />
        <AnalyticsStatCard
          title="Unique visitors"
          value={overview.unique_visitors}
          icon={IconUsers}
          iconClass="bg-blue-500/15 text-blue-300 ring-blue-400/20"
          countClass="text-blue-200"
          glowClass="from-blue-500/10"
        />
        <AnalyticsStatCard
          title="Active links"
          value={overview.active_links}
          icon={IconLink}
          iconClass="bg-purple-500/15 text-purple-300 ring-purple-400/20"
          countClass="text-purple-200"
          glowClass="from-purple-500/10"
        />
        <AnalyticsStatCard
          title="Average visits"
          value={overview.average_visits}
          icon={IconActivity}
          iconClass="bg-amber-500/15 text-amber-300 ring-amber-400/20"
          countClass="text-amber-200"
          glowClass="from-amber-500/10"
        />
      </div>

      <GlobalViewsBarChart
        links={successfulVisitsByLink}
        metrics={successfulVisitMetrics} />
    </section>
  )
}