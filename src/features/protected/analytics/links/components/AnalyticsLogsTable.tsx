import { createSupabaseServerClient } from "@/lib/supabase/server"
import { IconActivity, IconCircleCheck, IconClock, IconLock } from "@tabler/icons-react"
import type { LinkMetrics } from "@/types/analytics"
import { formatAnalyticsTimestamp } from "../../utils/formatDate"

interface AnalyticsLogsTableProps {
  linkId: string
}

export async function AnalyticsLogsTable({ linkId }: AnalyticsLogsTableProps) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("link_metrics")
    .select("*")
    .eq("link_id", linkId)
    .order("visited_at", { ascending: false })

  if (error) {
    console.error("Could not load link analytics logs", error)
    return <p className="p-8 text-center text-sm text-red-300">Unable to load visits.</p>
  }

  const metrics = data as LinkMetrics[]

  if (metrics.length === 0) {
    return (
      <article className="rounded-2xl border border-neutral-800/80 bg-neutral-950 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:p-7">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-sky-500/25 bg-sky-500/10 p-2.5 text-sky-300">
            <IconActivity className="size-5" stroke={1.8} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-100">Visit logs</h2>
            <p className="mt-1 text-sm text-neutral-400">A detailed history of activity for this link.</p>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-neutral-400">No visits recorded for this link yet.</p>
      </article>
    )
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">

      <header className="flex flex-col gap-4 border-b border-neutral-800/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-xl font-semibold text-neutral-100">Visit logs</h2>
            <p className="mt-1 text-sm text-neutral-400">A detailed history of activity for this link.</p>
          </div>
        </div>
        <span className="w-fit rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-xs font-semibold text-neutral-300">
          {metrics.length} {metrics.length === 1 ? "visit" : "visits"}
        </span>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-180 text-left text-sm">
          <thead className="border-b border-neutral-800/80 bg-neutral-900/30 text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-5 py-4 font-medium sm:px-7">Visited at</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Location</th>
              <th className="px-5 py-4 font-medium">Device</th>
              <th className="px-5 py-4 font-medium">Browser</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map(metric => {
              const status = metric.status === "success"
                ? { label: "Success", className: "border-green-500/25 bg-green-500/10 text-green-300", icon: IconCircleCheck }
                : metric.status === "expired"
                  ? { label: "Expired", className: "border-amber-500/25 bg-amber-500/10 text-amber-200", icon: IconClock }
                  : { label: "Wrong password", className: "border-red-500/25 bg-red-500/10 text-red-300", icon: IconLock }
              const StatusIcon = status.icon

              return (
                <tr key={metric.id} className="border-b border-neutral-900 text-neutral-300 transition-colors last:border-0 hover:bg-neutral-900/45">
                  <td className="whitespace-nowrap px-5 py-4 text-neutral-200 sm:px-7">{formatAnalyticsTimestamp(metric.visited_at)}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${status.className}`}>
                      <StatusIcon className="size-3.5" stroke={2} />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-neutral-300">{metric.country ?? "Unknown"}</td>
                  <td className="px-5 py-4 capitalize text-neutral-300">{metric.device_type ?? "Unknown"}</td>
                  <td className="px-5 py-4 text-neutral-300">{metric.browser ?? "Unknown"}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </article>
  )
}