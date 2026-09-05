import { api } from "@/config/axios"
import type { MetricStatus, LinkMetrics } from "@/types/analytics"

export interface CreateAnalyticsMetricInput {
	linkId: string
	status?: MetricStatus
}

export interface AnalyticsQuery {
	linkId?: string
	from?: string
	to?: string
}

interface AnalyticsResponse {
	data: LinkMetrics[]
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
