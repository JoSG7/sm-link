
import Link from "next/link"
import { Suspense } from "react"
import { IconArrowUpRight, IconChartBar } from "@tabler/icons-react"
import { DashboardFallback } from "@/components/fallbacks/DashboardFallback"
import { DashboardOverview } from "@/features/protected/dashboard/DashboardOverview"

export default function Dashboard() {
  
  return (
    <section className="flex min-h-screen flex-col gap-7 md:py-7 xl:py-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-100">
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

      <Suspense fallback={<DashboardFallback />}>
        <DashboardOverview />
      </Suspense>
    </section>
  )
}