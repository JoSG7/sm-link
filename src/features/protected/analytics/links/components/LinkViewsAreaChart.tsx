"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/shadcn/chart"
import { formatAnalyticsDate } from "../../utils/formatDate"
import { DailyStatusView } from "@/types/analytics"

const chartConfig = {
	success: {
		label: "Success",
		color: "#22c55e",
	},
	expired: {
		label: "Expired",
		color: "#f59e0b",
	},
	wrong_password: {
		label: "Wrong password",
		color: "#ef4444",
	},
} satisfies ChartConfig

export function LinkViewsAreaChart({ views }: { views: DailyStatusView[] }) {

	const chartData = views.map(view => ({
		...view,
		label: formatAnalyticsDate(view.date),
	}))
	const hasSuccess = chartData.some(view => view.success > 0)
	const hasExpired = chartData.some(view => view.expired > 0)
	const hasWrongPassword = chartData.some(view => view.wrong_password > 0)

	return (
		<article className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
			<div className="flex items-start justify-between gap-4 border-b border-neutral-800/80 p-5 sm:p-6">
				<div>
					<h2 className="text-xl font-semibold text-neutral-100">Visits over time</h2>
					<p className="mt-1 text-sm text-neutral-400">Visits by status during the last 30 days</p>
				</div>
				<div className="hidden items-center gap-4 text-sm text-neutral-300 sm:flex">
					{hasSuccess && <span className="flex items-center gap-2"><span className="size-2.5 rounded-sm bg-green-500" />Success</span>}
					{hasExpired && <span className="flex items-center gap-2"><span className="size-2.5 rounded-sm bg-amber-500" />Expired</span>}
					{hasWrongPassword && <span className="flex items-center gap-2"><span className="size-2.5 rounded-sm bg-red-500" />Wrong password</span>}
				</div>
			</div>

			{chartData.length === 0 ? (
				<p className="p-8 text-center text-sm text-neutral-400">No visits recorded during this period.</p>
			) : (
				<ChartContainer config={chartConfig} className="h-80 w-full aspect-auto p-5 sm:p-7">
					<AreaChart accessibilityLayer data={chartData} margin={{ top: 12, right: 8, left: -12, bottom: 0 }}>
						<defs>
							<linearGradient id="link-success-fill" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#22c55e" stopOpacity={0.38} />
								<stop offset="95%" stopColor="#22c55e" stopOpacity={0.03} />
							</linearGradient>
							<linearGradient id="link-expired-fill" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#f59e0b" stopOpacity={0.38} />
								<stop offset="95%" stopColor="#f59e0b" stopOpacity={0.03} />
							</linearGradient>
							<linearGradient id="link-wrong-password-fill" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#ef4444" stopOpacity={0.38} />
								<stop offset="95%" stopColor="#ef4444" stopOpacity={0.03} />
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#262626" />
						<XAxis
							dataKey="label"
							tickLine={false}
							axisLine={false}
							tickMargin={12}
							minTickGap={28}
							tick={{ fill: "#737373", fontSize: 12 }}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							allowDecimals={false}
							width={30}
							tick={{ fill: "#737373", fontSize: 12 }}
						/>
						<ChartTooltip
							labelClassName="min-w-42"
							cursor={{ stroke: "#525252", strokeDasharray: "4 4" }}
							content={<ChartTooltipContent labelFormatter={(_, payload) => payload[0]?.payload?.label} />}
						/>
						{hasSuccess &&
							<Area
								type="monotone"
								dataKey="success"
								stackId="1"
								stroke="#22c55e"
								strokeWidth={2}
								fill="url(#link-success-fill)"
								dot={false}
								activeDot={{ r: 4, fill: "#22c55e", stroke: "#dcfce7", strokeWidth: 2 }} />}

						{hasExpired &&
							<Area type="monotone"
								dataKey="expired"
								stackId="1"
								stroke="#f59e0b"
								strokeWidth={2}
								fill="url(#link-expired-fill)"
								dot={false}
								activeDot={{ r: 4, fill: "#f59e0b", stroke: "#fef3c7", strokeWidth: 2 }} />}

						{hasWrongPassword &&
							<Area type="monotone"
								dataKey="wrong_password"
								stackId="1"
								stroke="#ef4444"
								strokeWidth={2}
								fill="url(#link-wrong-password-fill)"
								dot={false}
								activeDot={{ r: 4, fill: "#ef4444", stroke: "#fee2e2", strokeWidth: 2 }} />}
					</AreaChart>
				</ChartContainer>
			)}
		</article>
	)
}
