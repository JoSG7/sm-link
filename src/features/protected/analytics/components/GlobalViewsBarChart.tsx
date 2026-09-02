"use client"

import { useState } from "react"
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

interface LinkViews {
  short: string
  original: string
  successful_visits: number
}

interface GlobalViewsBarChartProps {
  data: LinkViews[]
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


export function GlobalViewsBarChart({ data }: GlobalViewsBarChartProps) {
  const [page, setPage] = useState(0)
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

      {pageCount > 1 && (
        <div className="mt-4 flex justify-end gap-2">
          <Button
            className="bg-neutral-900 border-neutral-800"
            aria-label="Previous links"
            variant="outline"
            size="icon-sm"
            disabled={currentPage === 0}
            onClick={() => setPage(currentPage - 1)}
          >
            <IconChevronLeft />
          </Button>
          <Button
            className="bg-neutral-900 border-neutral-800"
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
    </article>
  )
}