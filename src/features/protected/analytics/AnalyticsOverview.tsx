import { IconChartBar, IconLink, IconPercentage, IconUsers } from "@tabler/icons-react"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { ErrorMessage } from "@/components/ui/ErrorMessage"
import { AnalyticsStatCard } from "./components/StatCard"
import { GlobalViewsBarChart } from "./components/GlobalViewsBarChart"
import { LinkDetails } from "@/types/global"



export async function AnalyticsOverview() {

  const supabase = await createSupabaseServerClient()
  const [{ data, error }, { data: links, error: linksError }] = await Promise.all([
    supabase.rpc("get_global_metrics"),
    supabase.rpc("get_links"),
  ])

  if (error || linksError) {
    return <ErrorMessage title="Analytics unavailable" description="We couldn't load your global performance data. Please try again in a moment." actionHref="/dashboard/analytics" actionLabel="Try analytics again" />
  }

  const overview = data?.[0] ?? {
    successful_visits: 0,
    unique_visitors: 0,
    active_links: 0,
    success_rate: 0,
  }

  const linkRows = links as LinkDetails[]
  const linkIds = linkRows.map(link => link.id)

  let analyticsLinks: { short: string; original: string; id: string; has_password: boolean; is_expired: boolean }[] = []
  let analyticsMetrics: { link_id: string; visited_at: string; status: "success" | "wrong_password" | "expired"; device_type: string | null }[] = []

  if (linkIds.length) {

    const { data: metrics, error: metricsError } = await supabase
      .from("link_metrics")
      .select("link_id, visited_at, status, device_type")
      .eq("is_bot", false)
      .in("link_id", linkIds)

    if (metricsError) {
      return <ErrorMessage title="Analytics unavailable" description="Your links loaded, but visit data could not be retrieved." actionHref="/dashboard/analytics" actionLabel="Try analytics again" />
    }

    analyticsMetrics = metrics ?? []

    analyticsLinks = linkRows
      .map(link => ({
        short: link.short,
        original: link.original,
        id: link.id,
        has_password: link.has_password,
        is_expired: link.is_expired,
      }))
  }

  return (
    <div className="flex flex-col gap-7">
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
          title="Success rate"
          value={overview.success_rate}
          icon={IconPercentage}
          iconClass="bg-amber-500/15 text-amber-300 ring-amber-400/20"
          countClass="text-amber-200"
          glowClass="from-amber-500/10"
          suffix="%"
        />
      </div>

      <GlobalViewsBarChart
        links={analyticsLinks}
        metrics={analyticsMetrics} />
    </div>
  )
}