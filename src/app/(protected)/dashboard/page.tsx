
import Link from "next/link"
import { Suspense } from "react"
import { IconArrowUpRight, IconChartBar } from "@tabler/icons-react"
import { DashboardFallback } from "@/components/fallbacks/DashboardFallback"
import { DashboardOverview } from "@/features/protected/dashboard/DashboardOverview"

export default function Dashboard() {

  return (
    <section className="flex min-h-screen flex-col gap-6 py-5 md:py-7 xl:py-8">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
            <span className="bg-linear-to-r from-green-400 to-sky-500 bg-clip-text text-transparent">SmLinks </span>
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-neutral-400 sm:text-base">A quick read on your links and their performance.</p>
        </div>
        <div className="grid grid-cols-2 md:flex gap-4">
          <Link href="/dashboard/links" className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-neutral-800 px-4 py-2.5 text-xs font-medium text-neutral-200 transition hover:border-neutral-600 hover:bg-neutral-900 md:w-auto md:text-sm">
            Manage links <IconArrowUpRight className="size-5" />
          </Link>
          <Link href="/dashboard/analytics" className="inline-flex w-full items-center justify-between gap-2 rounded-lg bg-linear-to-r from-green-500 to-blue-700 px-4 py-2.5 text-xs font-semibold transition hover:from-green-400 hover:to-sky-600 md:w-auto md:text-sm">
            Analytics <IconChartBar className="size-5" />
          </Link>
        </div>
      </header>

      <Suspense fallback={<DashboardFallback />}>
        <DashboardOverview />
      </Suspense>
    </section>
  )
}