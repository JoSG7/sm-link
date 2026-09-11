import { Suspense } from "react"
import { LinkAnalyticsFallback } from "@/components/fallbacks/LinkAnalyticsFallback"
import { LinkAnalyticsOverview } from "@/features/protected/analytics/links/LinkAnalyticsOverview"

export default async function LinkAnalyticsPage({ params }: { params: Promise<{ short: string }> }) {
  const { short } = await params
  return (
    <Suspense fallback={<LinkAnalyticsFallback />}>
      <LinkAnalyticsOverview short={short} />
    </Suspense>
  )
}