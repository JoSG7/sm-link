import { api } from "@/config/axios"

export type AnalyticsMetricStatus = "success" | "wrong_password" | "expired"

export interface CreateAnalyticsMetricInput {
	linkId: string
	status?: AnalyticsMetricStatus
}

export interface LinkMetric {
	id: number
	link_id: string
	visited_at: string
	visitor_hash: string | null
	country: string | null
	device_type: string | null
	browser: string | null
	operating_system: string | null
	referer: string | null
	status: AnalyticsMetricStatus
	is_bot: boolean
}

export interface AnalyticsQuery {
	linkId?: string
	from?: string
	to?: string
}

interface AnalyticsResponse {
	data: LinkMetric[]
}

export class AnalyticsService {
	async recordMetric(input: CreateAnalyticsMetricInput) {
		await api.post("analytics", input)
	}

	async getMetrics(query: AnalyticsQuery = {}) {
		const { data } = await api.get<AnalyticsResponse>("analytics", {
			params: query,
		})

		return data.data
	}
}
