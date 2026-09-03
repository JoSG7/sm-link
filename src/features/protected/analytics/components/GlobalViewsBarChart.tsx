"use client"

import { useState } from "react"
import Link from "next/link"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { IconChartBar, IconChevronLeft, IconChevronRight, IconPlus } from "@tabler/icons-react"
import { DomainLogo } from "@/components/ui/DomainLogo"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/shadcn/chart"
import { Button } from "@/components/shadcn/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select"

interface LinkViews {
  id: string
  short: string
  original: string
}

interface VisitMetric {
  link_id: string
  visited_at: string
}

type DateRange = "today" | "yesterday" | "week" | "month"

interface LinkChartView extends LinkViews {
  successful_visits: number
}

interface GlobalViewsBarChartProps {
  links: LinkViews[]
  metrics: VisitMetric[]
}

const PAGE_SIZE = 7

const chartConfig = {
  successful_visits: {
    label: "Successful visits",
    color: "#4ade80",
  },
} satisfies ChartConfig

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
      <div className="flex flex-col items-center gap-1 text-[10px] text-neutral-300" title={short}>
        <DomainLogo domain={domain} className="size-5 rounded-full" />
        <span className="max-w-20 truncate">{short}</span>
      </div>
    </foreignObject>
  )
}


export function GlobalViewsBarChart({ links, metrics }: GlobalViewsBarChartProps) {
  const [page, setPage] = useState(0)
  const [dateRange, setDateRange] = useState<DateRange>("month")
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
    if (visitedAt >= start && visitedAt < end) {
      visitsByLink.set(metric.link_id, (visitsByLink.get(metric.link_id) ?? 0) + 1)
    }
  }

  const data: LinkChartView[] = links
    .map(link => ({
      ...link,
      successful_visits: visitsByLink.get(link.id) ?? 0,
    }))
    .sort((first, second) => second.successful_visits - first.successful_visits)
  const pageCount = Math.max(1, Math.ceil(data.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount - 1)
  const visibleLinks = data.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)

  return (
    <article className="rounded-2xl border border-neutral-800/80 bg-neutral-950 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-neutral-100">Successful visits by link</h2>
          <p className="mt-1 text-sm text-neutral-400">Successful visits, excluding bots</p>
        </div>
        {pageCount > 1 && (
          <span className="shrink-0 text-sm text-neutral-500">
            {currentPage + 1} / {pageCount}
          </span>
        )}
      </div>

      {links.length === 0 ? (
        <div className="relative isolate flex min-h-72 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-neutral-800 bg-neutral-900/40 px-6 py-10 text-center">

          <div className="pointer-events-none absolute -right-12 -top-12 -z-10 size-36 rounded-full bg-linear-to-br from-green-500/15 via-sky-500/10 to-transparent blur-2xl" />
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-green-400/20 bg-green-400/10 text-green-300 shadow-lg shadow-green-950/20">
            <IconChartBar className="size-7" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-100">Your analytics are waiting</h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">
            Create your first link to start tracking visits and see its performance here.
          </p>

          <Link
            href="/dashboard/links"
            className="mt-6 flex items-center gap-2 rounded-lg bg-linear-to-r from-green-500 to-sky-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-950/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-sky-900/30"
          >
            <IconPlus className="size-4" />
            Create your first link
          </Link>
        </div>
      ) : (
        <>
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
              <Bar dataKey="successful_visits" fill="var(--color-successful_visits)" radius={4} />
            </BarChart>
          </ChartContainer>

          <div className="mt-5 flex items-center justify-end gap-3">
            <Select
              value={dateRange}
              onValueChange={(value: DateRange) => {
                setDateRange(value)
                setPage(0)
              }}
            >
              <SelectTrigger size="sm" className="w-36 border-neutral-800 bg-neutral-900 text-neutral-200">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent className="border-neutral-800 bg-neutral-900 text-neutral-200">
                <SelectItem value="today" className="text-neutral-300 focus:bg-neutral-800 focus:text-green-300">Today</SelectItem>
                <SelectItem value="yesterday" className="text-neutral-300 focus:bg-neutral-800 focus:text-green-300">Yesterday</SelectItem>
                <SelectItem value="week" className="text-neutral-300 focus:bg-neutral-800 focus:text-green-300">Last 7 days</SelectItem>
                <SelectItem value="month" className="text-neutral-300 focus:bg-neutral-800 focus:text-green-300">Last 30 days</SelectItem>
              </SelectContent>
            </Select>

            {pageCount > 1 && (
              <>
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
              </>
            )}
          </div>
        </>
      )}
    </article>
  )
}