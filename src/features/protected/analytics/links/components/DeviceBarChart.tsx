"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { IconDeviceDesktop } from "@tabler/icons-react"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/shadcn/chart"
import type { AnalyticsBreakdown } from "@/types/analytics"

const chartConfig = {
	success: {
		label: "Success",
		color: "#22c55e",
	},
	wrong_password: {
		label: "Wrong password",
		color: "#ef4444",
	},
	expired: {
		label: "Expired",
		color: "#f59e0b",
	},
} satisfies ChartConfig

export function DeviceBarChart({ devices }: { devices: AnalyticsBreakdown[] }) {
	const data = devices
		.filter(device => device.name && device.value > 0)
		.map(device => ({
			name: device.name,
			success: device.success,
			wrong_password: device.wrong_password,
			expired: device.expired,
		}))

	return (
		<article className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">

			<header className="border-b border-neutral-800/80 p-5 sm:p-6">
				<h2 className="text-xl font-semibold text-neutral-100">Devices</h2>
				<p className="mt-1 text-sm text-neutral-400">Visits by device type</p>
			</header>

			{data.length === 0 ? (
				<div className="flex min-h-64 flex-col items-center justify-center px-6 py-10 text-center">
					<span className="flex size-11 items-center justify-center rounded-xl bg-neutral-800 text-neutral-500 ring-1 ring-neutral-500/20">
						<IconDeviceDesktop className="size-5" />
					</span>
					<p className="mt-4 text-base font-medium text-neutral-200">No device data yet</p>
					<p className="mt-1 max-w-xs text-sm text-neutral-500">Device details will appear after this link receives visits.</p>
				</div>
			) : (
				<div className="p-5 sm:p-6">
					<ChartContainer config={chartConfig} className="relative h-64 w-full">
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
							<ChartTooltip labelClassName="min-w-40" cursor={false} content={<ChartTooltipContent />} />
							<Bar dataKey="success" fill="#22c55e" radius={[5, 5, 0, 0]} maxBarSize={28} />
							<Bar dataKey="wrong_password" fill="#ef4444" radius={[5, 5, 0, 0]} maxBarSize={28} />
							<Bar dataKey="expired" fill="#f59e0b" radius={[5, 5, 0, 0]} maxBarSize={28} />
						</BarChart>
					</ChartContainer>

					<div className="pt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-neutral-300">
						<span className="flex items-center gap-2"><span className="size-2.5 rounded-sm bg-green-500" />Success</span>
						<span className="flex items-center gap-2"><span className="size-2.5 rounded-sm bg-red-500" />Wrong password</span>
						<span className="flex items-center gap-2"><span className="size-2.5 rounded-sm bg-amber-500" />Expired</span>
					</div>
				</div>
			)}
		</article>
	)
}
