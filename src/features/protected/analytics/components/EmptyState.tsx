import Link from "next/link"
import { IconChartBar, IconPlus } from "@tabler/icons-react"

type AnalyticsEmptyStateType = "links" | "protected" | "expired"

interface AnalyticsEmptyStateProps {
  type: AnalyticsEmptyStateType
}

const content = {
  links: {
    title: "Your analytics are waiting",
    description: "Create your first link to start tracking visits and see its performance here.",
  },
  protected: {
    title: "No protected links yet",
    description: "Wrong password attempts are only available for protected links.",
  },
  expired: {
    title: "No expired links yet",
    description: "Expired link visits will appear here when one of your links expires.",
  },
} satisfies Record<AnalyticsEmptyStateType, { title: string; description: string }>

export function AnalyticsEmptyState({ type }: AnalyticsEmptyStateProps) {
  const { title, description } = content[type]

  return (
    <div className="relative isolate flex min-h-72 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-neutral-800 bg-neutral-900/40 px-6 py-10 text-center">

      <div className="pointer-events-none absolute -right-12 -top-12 -z-10 size-36 rounded-full bg-linear-to-br from-green-500/15 via-sky-500/10 to-transparent blur-2xl" />
      
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-green-400/20 bg-green-400/10 text-green-300 shadow-lg shadow-green-950/20">
        <IconChartBar className="size-7" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-100">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">{description}</p>

      {type === "links" && (
        <Link
          href="/dashboard/links"
          className="mt-6 flex items-center gap-2 rounded-lg bg-linear-to-r from-green-500 to-sky-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-950/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-sky-900/30"
        >
          <IconPlus className="size-4" />
          Create your first link
        </Link>
      )}
    </div>
  )
}