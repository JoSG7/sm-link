import { IconChartBar, IconEye, IconLock, IconWorld } from "@tabler/icons-react"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { AnalyticsStatCard } from "../components/StatCard"
import { LinkViewsAreaChart } from "./components/LinkViewsAreaChart"
import { AnalyticsLogsTable } from "./components/AnalyticsLogsTable"
import { BrowserRadialChart } from "./components/BrowserRadialChart"
import { DeviceBarChart } from "./components/DeviceBarChart"
import type { AnalyticsSummary } from "@/types/analytics"
import type { LinkDetails } from "@/types/global"


export async function LinkAnalyticsOverview({ short }: { short: string }) {

  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase.rpc("get_link_by_short", {
    x_short: short,
  }).maybeSingle()

  const link = data as LinkDetails | null

  if (error) return <p className="py-8 text-red-300">Unable to load analytics.</p>
  if (!link) return <p className="py-8 text-red-300">Link not found.</p>

  const { data: summary, error: summaryError } = await supabase.rpc("get_link_metrics", {
    x_short: short,
  }).single()

  // console.log(summary)

  if (summaryError) return <p className="py-8 text-red-300">Unable to load analytics.</p>

  const analyticsSummary = summary as AnalyticsSummary
  
  const countries = analyticsSummary.country_views.length
  const dailyViews = analyticsSummary.daily_status_views

  return (
    <section className="flex min-h-screen flex-col gap-7 py-7 xl:py-8">
      <header>
        <p className="text-sm text-neutral-500">Analytics for link</p>
        <h1 className="mt-1 text-3xl font-semibold text-neutral-100">/{short}</h1>
        <p className="mt-2 max-w-3xl truncate text-neutral-300">{link.original}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsStatCard
          title="Total visits"
          value={analyticsSummary.total_views}
          icon={IconChartBar}
          iconClass="bg-green-500/15 text-green-300 ring-green-400/20"
          countClass="text-green-200"
          glowClass="from-green-500/10" />

        <AnalyticsStatCard
          title="Successful visits"
          value={analyticsSummary.successful_views}
          icon={IconEye}
          iconClass="bg-blue-500/15 text-blue-300 ring-blue-400/20"
          countClass="text-blue-200"
          glowClass="from-blue-500/10" />

        <AnalyticsStatCard
          title="Unique visitors"
          value={analyticsSummary.unique_visitors}
          icon={IconWorld}
          iconClass="bg-amber-500/15 text-amber-300 ring-amber-400/20"
          countClass="text-amber-200" glowClass="from-amber-500/10" />

        <AnalyticsStatCard
          title="Countries"
          value={countries}
          icon={IconLock}
          iconClass="bg-purple-500/15 text-purple-300 ring-purple-400/20"
          countClass="text-purple-200"
          glowClass="from-purple-500/10" />
      </div>

      <LinkViewsAreaChart views={dailyViews} />

      {/* Falta mostrar device y browser en wrong_password logs */}

      <div className="grid gap-7 lg:grid-cols-2">
        <BrowserRadialChart browsers={analyticsSummary.browser_views} />
        <DeviceBarChart devices={analyticsSummary.device_views} />
      </div>

      <AnalyticsLogsTable linkId={link.id} />

    </section>
  )
}