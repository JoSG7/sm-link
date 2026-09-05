"use client"

import { PolarAngleAxis, PolarGrid, RadialBar, RadialBarChart } from "recharts"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/shadcn/chart"
import type { AnalyticsBreakdown } from "@/types/analytics"

const browserColors = ["#a855f7", "#c084fc", "#8b5cf6", "#d8b4fe", "#7e22ce"]

const chartConfig = {
	value: {
		label: "Visits",
	},
} satisfies ChartConfig

export function BrowserRadialChart({ browsers }: { browsers: AnalyticsBreakdown[] }) {
	const data = browsers
		.filter(browser => browser.name && browser.value > 0)
		.map((browser, index) => ({
			name: browser.name,
			value: browser.value,
			fill: browserColors[index % browserColors.length],
		}))
		.sort((first, second) => second.value - first.value)

	const total = data.reduce((sum, browser) => sum + browser.value, 0)

	return (
		<article className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
      
			<header className="border-b border-neutral-800/80 p-5 sm:p-6">
				<h2 className="text-xl font-semibold text-neutral-100">Browsers</h2>
				<p className="mt-1 text-sm text-neutral-400">Successful visits by browser</p>
			</header>

			{data.length === 0 ? (
				<p className="p-8 text-center text-sm text-neutral-400">No browser data available.</p>
			) : (
				<div className="p-5 sm:p-6">
					<ChartContainer config={chartConfig} className="mx-auto h-64 w-full max-w-88 [&_.recharts-radial-bar-background-sector]:fill-neutral-700!">
						<RadialBarChart
							accessibilityLayer
							data={data}
							innerRadius="28%"
							outerRadius="92%"
							startAngle={90}
							endAngle={-270}
							barSize={12}
						>
							<PolarGrid gridType="circle" radialLines={false} />
							<PolarAngleAxis type="number" domain={[0, "dataMax"]} tick={false} />
							<ChartTooltip
								cursor={false}
								content={
									<ChartTooltipContent
										labelFormatter={(_, payload) => String(payload[0]?.payload?.name ?? "")}
										formatter={(value) => (
											<>
												<span className="text-muted-foreground">Visits</span>
												<span className="font-mono font-medium text-foreground tabular-nums">{value}</span>
											</>
										)}
									/>
								}
							/>
							<RadialBar dataKey="value" background={{ fill: "#262626" }} cornerRadius={8} />
						</RadialBarChart>
					</ChartContainer>

					<div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
						{data.map(browser => (
							<div key={browser.name} className="flex min-w-0 items-center gap-2 text-sm text-neutral-300">
								<span className="size-2.5 shrink-0 rounded-sm" style={{ backgroundColor: browser.fill }} />
								<span className="truncate capitalize">{browser.name}</span>
								<span className="ml-auto text-neutral-500">{browser.value}</span>
							</div>
						))}
					</div>
					<p className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-neutral-500">{total} total visits</p>
				</div>
			)}
		</article>
	)
}
