import {
  IconChartBar,
  IconLink,
  IconPercentage,
  IconUsers,
} from "@tabler/icons-react"

export type PreviewView = "dashboard" | "analytics" | "links"

export const stats = [
  { label: "Total visits", value: "12,480", color: "text-green-300", icon: IconChartBar },
  { label: "Unique visitors", value: "8,214", color: "text-blue-300", icon: IconUsers },
  { label: "Active links", value: "24", color: "text-purple-300", icon: IconLink },
  { label: "Success rate", value: "98.4%", color: "text-amber-300", icon: IconPercentage },
]

export const analyticsStats = [
  { label: "Successful visits", value: "12,480", color: "text-green-300", icon: IconChartBar },
  { label: "Unique visitors", value: "8,214", color: "text-blue-300", icon: IconUsers },
  { label: "Active links", value: "24", color: "text-purple-300", icon: IconLink },
  { label: "Success rate", value: "98.4%", color: "text-amber-300", icon: IconPercentage },
]

export const links = [
  { short: "/launch", original: "sm-link.com/product-launch", visits: "4,892" },
  { short: "/guide", original: "sm-link.com/ultimate-guide", visits: "3,271" },
  { short: "/social", original: "sm-link.com/social-profile", visits: "2,109" },
]

export const previewViews: { id: PreviewView; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "analytics", label: "Analytics" },
  { id: "links", label: "Links" },
]

export const viewMeta: Record<PreviewView, { title: string; description: string }> = {
  dashboard: {
    title: "SmLinks Dashboard",
    description: "A quick read on your links and their performance.",
  },
  analytics: {
    title: "SmLinks Analytics",
    description: "A global summary of your link performance.",
  },
  links: {
    title: "SmLinks Overview",
    description: "Manage and track all your shortened links.",
  },
}