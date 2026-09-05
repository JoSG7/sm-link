import { format, parseISO } from "date-fns"

export function formatAnalyticsDate(value: string) {
  return format(parseISO(value), "MMM d")
}

export function formatAnalyticsTimestamp(value: string) {
  return format(new Date(value), "PPp")
}
