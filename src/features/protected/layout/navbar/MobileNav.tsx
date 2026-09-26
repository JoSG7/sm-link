import { IconChartBar, IconLayoutDashboard, IconLink } from "@tabler/icons-react"
import Link from "next/link"

const navigationItems = [
  { label: "Dashboard", href: "/dashboard", icon: IconLayoutDashboard },
  { label: "Analytics", href: "/dashboard/analytics", icon: IconChartBar },
  { label: "SmLinks", href: "/dashboard/links", icon: IconLink },
]

export function MobileNav() {
  return (
    <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-around border-t border-neutral-800 bg-neutral-950/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(0,0,0,0.2)] backdrop-blur sm:hidden">
      {navigationItems.map(({ label, href, icon: Icon }) => (
        <Link key={href} className="flex flex-col items-center gap-1 text-[10px] text-neutral-300" href={href}>
          <Icon className="size-5" />
          {label}
        </Link>
      ))}
    </nav>
  )
}
