"use client"

import { useState } from "react"
import Link from "next/link"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { DomainLogo } from "@/components/ui/DomainLogo"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/shadcn/chart"
import { Button } from "@/components/shadcn/button"
import { AnalyticsEmptyState } from "./EmptyState"
import {
  AnalyticsChartFilters,
  type DateRange,
  type DeviceType,
  type VisitStatus,
} from "./ChartFilters"

interface LinkViews {
  id: string
  short: string
  original: string
  has_password: boolean
  is_expired: boolean
}

interface VisitMetric {
  link_id: string
  visited_at: string
  status: "success" | "wrong_password" | "expired"
  device_type: string | null
}

interface LinkChartView extends LinkViews {
  visits: number
}

interface GlobalViewsBarChartProps {
  links: LinkViews[]
  metrics: VisitMetric[]
}

const PAGE_SIZE = 7

const chartConfig = {
  visits: {
    label: "Visits",
    color: "#4ade80",
  },
} satisfies ChartConfig

const visitStatusColors: Record<VisitStatus, string> = {
  success: "#4ade80",
  wrong_password: "#f87171",
  expired: "#c084fc",
}

function LinkTick({ x, y, payload, links }: {
  x?: number
  y?: number
  payload?: { value?: string }
  links: LinkViews[]
}) {

  if (x === undefined || y === undefined || !payload) return null

  const short = payload.value
  if (!short) return null

  const link = links.find(item => item.short === short)
  if (!link) return null

  let domain = link.original
  try {
    domain = new URL(link.original).hostname
  } catch {
    domain = link.original
  }

  return (
    <foreignObject x={x - 42} y={y + 4} width={84} height={42}>
      <Link
        href={`/dashboard/analytics/${encodeURIComponent(link.short)}`}
        className="flex flex-col items-center gap-1 rounded-sm text-[10px] text-neutral-300 outline-none transition hover:text-white focus-visible:ring-1 focus-visible:ring-green-400"
        title="Click to see more details about this link"
        aria-label={`Click to see more details about ${link.short}`}
      >
        <DomainLogo domain={domain} className="size-5 rounded-full" />
        <span className="max-w-20 truncate">{short}</span>
      </Link>
    </foreignObject>
  )
}


export function GlobalViewsBarChart({ links, metrics }: GlobalViewsBarChartProps) {
  const [page, setPage] = useState(0)
  const [dateRange, setDateRange] = useState<DateRange>("month")
  const [visitStatus, setVisitStatus] = useState<VisitStatus>("success")
  const [deviceType, setDeviceType] = useState<DeviceType>("all")
  const [search, setSearch] = useState("")
  const now = new Date()
  const start = new Date(now)

  if (dateRange === "today") {
    start.setHours(0, 0, 0, 0)
  } else if (dateRange === "yesterday") {
    start.setDate(start.getDate() - 1)
    start.setHours(0, 0, 0, 0)
  } else if (dateRange === "week") {
    start.setDate(start.getDate() - 7)
  } else {
    start.setDate(start.getDate() - 30)
  }

  const end = dateRange === "yesterday"
    ? new Date(start.getTime() + 24 * 60 * 60 * 1000)
    : now
  const visitsByLink = new Map<string, number>()

  for (const metric of metrics) {
    const visitedAt = new Date(metric.visited_at)
    const matchesDevice = deviceType === "all" || metric.device_type === deviceType
    if (metric.status === visitStatus && matchesDevice && visitedAt >= start && visitedAt < end) {
      visitsByLink.set(metric.link_id, (visitsByLink.get(metric.link_id) ?? 0) + 1)
    }
  }

  const normalizedSearch = search.trim().toLowerCase()
  const filteredLinks = links.filter(link => {
    const matchesStatus = visitStatus === "wrong_password"
      ? link.has_password
      : visitStatus === "expired"
        ? link.is_expired
        : true
    const matchesSearch = !normalizedSearch || link.original.toLowerCase().includes(normalizedSearch)

    return matchesStatus && matchesSearch
  })
  const data: LinkChartView[] = filteredLinks
    .map(link => ({
      ...link,
      visits: visitsByLink.get(link.id) ?? 0,
    }))
    .sort((first, second) => second.visits - first.visits)
  const pageCount = Math.max(1, Math.ceil(data.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount - 1)
  const visibleLinks = data.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
  const barSize = visibleLinks.length <= 2 ? 96 : undefined

  return (
    <article className="rounded-2xl border border-neutral-800/80 bg-neutral-950 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-neutral-100">
            {visitStatus === "success" ? "Successful visits" : visitStatus === "wrong_password" ? "Wrong password attempts" : "Expired link visits"} by link
          </h2>
          <p className="mt-1 text-sm text-neutral-400">Visits, excluding bots</p>
        </div>
        {pageCount > 1 && (
          <span className="inline-flex h-9 shrink-0 items-center rounded-full border border-amber-400/25 bg-amber-400/10 px-3 text-xs font-semibold tracking-wide text-amber-200 shadow-[0_0_18px_rgba(251,191,36,0.08)]">
            {currentPage + 1} <span className="mx-1 text-amber-400/50">/</span> {pageCount}
          </span>
        )}
      </div>

      {filteredLinks.length === 0 ? (
        <AnalyticsEmptyState
          type={visitStatus === "wrong_password" ? "protected" : visitStatus === "expired" ? "expired" : "links"}
        />
      ) : (
        <ChartContainer config={chartConfig} className="h-72 w-full aspect-auto">
          <BarChart accessibilityLayer data={visibleLinks} margin={{ left: 8, right: 12, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="short"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={<LinkTick links={visibleLinks} />}
              height={58}
            />
            <YAxis tickLine={false} axisLine={false} allowDecimals={false} width={28} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="min-w-40" />}
            />
            <Bar dataKey="visits" barSize={barSize} fill={visitStatusColors[visitStatus]} radius={4} />
          </BarChart>
        </ChartContainer>
      )}

      <div className="mt-5 flex justify-between">
        <AnalyticsChartFilters
          search={search}
          dateRange={dateRange}
          visitStatus={visitStatus}
          deviceType={deviceType}
          onSearchChange={value => {
            setSearch(value)
            setPage(0)
          }}
          onDateRangeChange={value => {
            setDateRange(value)
            setPage(0)
          }}
          onVisitStatusChange={value => {
            setVisitStatus(value)
            setPage(0)
          }}
          onDeviceTypeChange={value => {
            setDeviceType(value)
            setPage(0)
          }}
        />

        {pageCount > 1 && (
          <div className="flex items-center gap-2">
            <Button
              className="bg-neutral-900 border-neutral-800 size-9"
              aria-label="Previous links"
              variant="outline"
              size="icon-sm"
              disabled={currentPage === 0}
              onClick={() => setPage(currentPage - 1)}
            >
              <IconChevronLeft />
            </Button>
            <Button
              className="bg-neutral-900 border-neutral-800 size-9"
              aria-label="Next links"
              variant="outline"
              size="icon-sm"
              disabled={currentPage === pageCount - 1}
              onClick={() => setPage(currentPage + 1)}
            >
              <IconChevronRight />
            </Button>
          </div>
        )}
      </div>
    </article>
  )
}