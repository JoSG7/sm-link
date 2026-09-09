import { Suspense } from "react"
import { LinksFallback } from "@/components/fallbacks/LinksFallback"
import { LinksOverview } from "@/features/protected/links/LinksOverview"

export default function AdminLinks() {
  return (
    <section className="flex min-h-screen flex-col gap-7 md:py-7 xl:py-8">
      <header>
        <h1 className="text-3xl font-semibold">
          <span className="bg-linear-to-r from-green-400 to-sky-500 bg-clip-text text-transparent">SmLinks </span>
          Overview
        </h1>
        <p className="pt-2 text-neutral-300">Manage and track all your shortened links</p>
      </header>
      <Suspense fallback={<LinksFallback />}>
        <LinksOverview />
      </Suspense>
    </section>
  )
}