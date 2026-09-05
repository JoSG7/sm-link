import { LinkAnalyticsOverview } from "@/features/protected/analytics/links/LinkAnalyticsOverview"

export default async function LinkAnalyticsPage({ params }: { params: Promise<{ short: string }> }) {
  const { short } = await params
  return <LinkAnalyticsOverview short={short} />
}