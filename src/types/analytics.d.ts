export type MetricStatus = "success" | "wrong_password" | "expired"

export interface LinkMetrics {
  id: number
  link_id: string
  visited_at: string
  visitor_hash: string | null
  country: string | null
  device_type: string | null
  browser: string | null
  operating_system: string | null
  referer: string | null
  status: MetricStatus
  is_bot: boolean
}

export interface AnalyticsBreakdown {
  name: string | null
  value: number
}

export interface DailyView {
  date: string
  views: number
}

export interface DailyStatusView {
  date: string
  success: number
  expired: number
  wrong_password: number
}

export interface AnalyticsSummary {
  total_views: number
  successful_views: number
  unique_visitors: number
  protected_failed_attempts: number
  expired_views: number
  device_views: AnalyticsBreakdown[]
  browser_views: AnalyticsBreakdown[]
  operating_system_views: AnalyticsBreakdown[]
  country_views: AnalyticsBreakdown[]
  referer_views: AnalyticsBreakdown[]
  daily_views: DailyView[]
  daily_status_views: DailyStatusView[]
}