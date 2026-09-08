"use client"

import { Cell, Pie, PieChart } from "recharts"
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

export function BrowserPieChart({ browsers }: { browsers: AnalyticsBreakdown[] }) {
	const data = browsers
		.filter(browser => browser.name && browser.value > 0)
		.map((browser, index) => ({
			name: browser.name,
			value: browser.value,
			success: browser.success,
			wrong_password: browser.wrong_password,
			expired: browser.expired,
			fill: browserColors[index % browserColors.length],
		}))
		.sort((first, second) => second.value - first.value)

	const total = data.reduce((sum, browser) => sum + browser.value, 0)

	return (
		<article className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">

			<header className="border-b border-neutral-800/80 p-5 sm:p-6">
				<h2 className="text-xl font-semibold text-neutral-100">Browsers</h2>
				<p className="mt-1 text-sm text-neutral-400">Visits by browser and status</p>
			</header>

			{data.length === 0 ? (
				<p className="p-8 text-center text-sm text-neutral-400">No browser data available.</p>
			) : (
				<div className="p-5 sm:p-6">
					<ChartContainer config={chartConfig} className="relative mx-auto h-64 w-full max-w-88">
						<PieChart>
							<Pie
								data={data}
								dataKey="value"
								nameKey="name"
								innerRadius="55%"
								outerRadius="82%"
								startAngle={90}
								endAngle={-270}
								strokeWidth={0}
							>
							{data.map(browser => <Cell key={browser.name} fill={browser.fill} />)}
							</Pie>
							<ChartTooltip
								cursor={false}
								wrapperStyle={{ zIndex: 50 }}
								content={
									<ChartTooltipContent
										className="relative z-50"
										labelFormatter={(_, payload) => String(payload[0]?.payload?.name ?? "")}
										formatter={(_value, _name, _item, _index, payload) => {
											const browser = payload as unknown as AnalyticsBreakdown

											return (
												<div className="grid gap-1">
													{(browser.success ?? 0) > 0 && <div className="flex items-center justify-between gap-5">
														<span className="text-muted-foreground">Success</span>
														<span className="font-mono font-medium text-green-300 tabular-nums">{browser.success}</span>
													</div>}
													{(browser.wrong_password ?? 0) > 0 && <div className="flex items-center justify-between gap-5">
														<span className="text-muted-foreground">Wrong password</span>
														<span className="font-mono font-medium text-red-300 tabular-nums">{browser.wrong_password}</span>
													</div>}
													{(browser.expired ?? 0) > 0 && <div className="flex items-center justify-between gap-5">
														<span className="text-muted-foreground">Expired</span>
														<span className="font-mono font-medium text-amber-300 tabular-nums">{browser.expired}</span>
													</div>}
												</div>
											)
										}}
									/>
								}
							/>
						</PieChart>
						<div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center">
							<span className="text-4xl font-semibold leading-none text-neutral-100">{total}</span>
							<span className="mt-2 text-sm text-neutral-400">Visitors</span>
						</div>
					</ChartContainer>

					<div className="pt-5 grid grid-cols-2 gap-x-7 gap-y-2 sm:grid-cols-3">
						{data.map(browser => (
							<div key={browser.name} className="flex min-w-0 items-center gap-2 text-sm text-neutral-300">
								<span className="size-2.5 shrink-0 rounded-sm" style={{ backgroundColor: browser.fill }} />
								<span className="truncate capitalize">{browser.name}</span>
								<span className="ml-auto text-neutral-500">{browser.value}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</article>
	)
}
