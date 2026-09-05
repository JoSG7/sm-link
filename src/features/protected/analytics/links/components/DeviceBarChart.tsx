"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/shadcn/chart"
import type { AnalyticsBreakdown } from "@/types/analytics"

const chartConfig = {
	value: {
		label: "Visits",
		color: "#60a5fa",
	},
} satisfies ChartConfig

export function DeviceBarChart({ devices }: { devices: AnalyticsBreakdown[] }) {
	const data = devices
		.filter(device => device.name && device.value > 0)
		.map(device => ({
			name: device.name,
			value: device.value,
		}))

	return (
		<article className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
			<header className="border-b border-neutral-800/80 p-5 sm:p-6">
				<h2 className="text-xl font-semibold text-neutral-100">Devices</h2>
				<p className="mt-1 text-sm text-neutral-400">Visits by device type</p>
			</header>

			{data.length === 0 ? (
				<p className="p-8 text-center text-sm text-neutral-400">No device data available.</p>
			) : (
				<ChartContainer config={chartConfig} className="h-80 w-full aspect-auto p-5 sm:p-6">
					<BarChart accessibilityLayer data={data} margin={{ top: 12, right: 8, left: -12, bottom: 8 }}>
						<CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#262626" />
						<XAxis
							dataKey="name"
							tickLine={false}
							axisLine={false}
							tickMargin={12}
							tick={{ fill: "#737373", fontSize: 12 }}
							tickFormatter={value => String(value).replace("desktop", "Desktop").replace("mobile", "Mobile")}
						/>
						<YAxis tickLine={false} axisLine={false} allowDecimals={false} width={28} tick={{ fill: "#737373", fontSize: 12 }} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Bar dataKey="value" fill="#60a5fa" radius={[5, 5, 0, 0]} maxBarSize={72} />
					</BarChart>
				</ChartContainer>
			)}
		</article>
	)
}
