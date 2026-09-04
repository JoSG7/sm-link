"use client"

import { IconSearch } from "@tabler/icons-react"
import { Input } from "@/components/shadcn/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select"

export type DateRange = "today" | "yesterday" | "week" | "month"
export type VisitStatus = "success" | "wrong_password" | "expired"
export type DeviceType = "all" | "mobile" | "desktop"

interface AnalyticsChartFiltersProps {
  search: string
  dateRange: DateRange
  visitStatus: VisitStatus
  deviceType: DeviceType
  onSearchChange: (value: string) => void
  onDateRangeChange: (value: DateRange) => void
  onVisitStatusChange: (value: VisitStatus) => void
  onDeviceTypeChange: (value: DeviceType) => void
}

export function AnalyticsChartFilters({
  search,
  dateRange,
  visitStatus,
  deviceType,
  onSearchChange,
  onDateRangeChange,
  onVisitStatusChange,
  onDeviceTypeChange,
}: AnalyticsChartFiltersProps) {

  return (
    <div className="flex flex-wrap items-center gap-3">


      <Select value={dateRange} onValueChange={value => onDateRangeChange(value as DateRange)}>
        <SelectTrigger size="sm" className="w-36 border-neutral-800 bg-neutral-900 text-neutral-200">
          <SelectValue placeholder="Date range" />
        </SelectTrigger>
        <SelectContent className="border-neutral-800 bg-neutral-900 text-neutral-200">
          <SelectItem value="today" className="text-neutral-300 focus:bg-neutral-800 focus:text-green-300">Today</SelectItem>
          <SelectItem value="yesterday" className="text-neutral-300 focus:bg-neutral-800 focus:text-green-300">Yesterday</SelectItem>
          <SelectItem value="week" className="text-neutral-300 focus:bg-neutral-800 focus:text-green-300">Last 7 days</SelectItem>
          <SelectItem value="month" className="text-neutral-300 focus:bg-neutral-800 focus:text-green-300">Last 30 days</SelectItem>
        </SelectContent>
      </Select>

      <Select value={visitStatus} onValueChange={value => onVisitStatusChange(value as VisitStatus)}>
        <SelectTrigger size="sm" className="w-44 border-neutral-800 bg-neutral-900 text-neutral-200">
          <SelectValue placeholder="Visit status" />
        </SelectTrigger>
        <SelectContent className="border-neutral-800 bg-neutral-900 text-neutral-200">
          <SelectItem value="success" className="text-neutral-300 focus:bg-neutral-800 focus:text-green-300">Successful</SelectItem>
          <SelectItem value="wrong_password" className="text-neutral-300 focus:bg-neutral-800 focus:text-green-300">Wrong password</SelectItem>
          <SelectItem value="expired" className="text-neutral-300 focus:bg-neutral-800 focus:text-green-300">Expired</SelectItem>
        </SelectContent>
      </Select>

      <Select value={deviceType} onValueChange={value => onDeviceTypeChange(value as DeviceType)}>
        <SelectTrigger size="sm" className="w-36 border-neutral-800 bg-neutral-900 text-neutral-200">
          <SelectValue placeholder="Device" />
        </SelectTrigger>
        <SelectContent className="border-neutral-800 bg-neutral-900 text-neutral-200">
          <SelectItem value="all" className="text-neutral-300 focus:bg-neutral-800 focus:text-green-300">All devices</SelectItem>
          <SelectItem value="mobile" className="text-neutral-300 focus:bg-neutral-800 focus:text-green-300">Mobile</SelectItem>
          <SelectItem value="desktop" className="text-neutral-300 focus:bg-neutral-800 focus:text-green-300">Desktop</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative w-64">
        <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
        <Input
          type="search"
          value={search}
          placeholder="Search original URL"
          aria-label="Search by original URL"
          onChange={event => onSearchChange(event.currentTarget.value)}
          className="w-full border-neutral-800 bg-neutral-900 pl-9 text-neutral-200 placeholder:text-neutral-500"
        />
      </div>
    </div>
  )
}
