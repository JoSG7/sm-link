import { Suspense } from "react"
import { AnalyticsFallback } from "@/components/fallbacks/AnalyticsFallback"
import { AnalyticsOverview } from "@/features/protected/analytics/AnalyticsOverview"

export default function AnalyticsPage() {
  return (
    <section className="flex min-h-screen flex-col gap-7 md:py-7 xl:py-8">
      <header>
        <h1 className="text-3xl font-semibold">
          <span className="bg-linear-to-r from-green-400 to-sky-500 bg-clip-text text-transparent">SmLinks </span>
          Analytics
        </h1>
        <p className="pt-2 text-neutral-300">A global summary of your link performance</p>
      </header>
      <Suspense fallback={<AnalyticsFallback />}>
        <AnalyticsOverview />
      </Suspense>
    </section>
  )
}