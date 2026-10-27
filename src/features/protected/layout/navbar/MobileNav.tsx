"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { IconChartBar, IconChevronLeft, IconChevronRight, IconLayoutDashboard, IconLink } from "@tabler/icons-react"
import Link from "next/link"
import type { User } from "@supabase/supabase-js"
import { UserProfile } from "../components/UserProfile"

const navigationItems = [
  { label: "Dashboard", href: "/dashboard", icon: IconLayoutDashboard },
  { label: "Analytics", href: "/dashboard/analytics", icon: IconChartBar },
  { label: "SmLinks", href: "/dashboard/links", icon: IconLink },
]

export function MobileNav({ user }: { user: User | null }) {
  const pathname = usePathname()
  const navigationRef = useRef<HTMLDivElement>(null)
  const [hasOverflow, setHasOverflow] = useState(false)

  useEffect(() => {
    const navigation = navigationRef.current
    if (!navigation) return

    const updateOverflow = () => {
      setHasOverflow(navigation.scrollWidth > navigation.clientWidth + 1)
    }

    updateOverflow()
    const resizeObserver = new ResizeObserver(updateOverflow)
    resizeObserver.observe(navigation)
    navigation.addEventListener("scroll", updateOverflow, { passive: true })

    return () => {
      resizeObserver.disconnect()
      navigation.removeEventListener("scroll", updateOverflow)
    }
  }, [])

  const scrollNavigation = (direction: -1 | 1) => {
    navigationRef.current?.scrollBy({ left: direction * 120, behavior: "smooth" })
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/20 bg-neutral-950/95 p-4.5 px-2.5 backdrop-blur sm:hidden"
    aria-label="Mobile navigation">
      <div className="flex items-center gap-2">
        {hasOverflow && (
          <button
            type="button"
            aria-label="Scroll navigation left"
            onClick={() => scrollNavigation(-1)}
            className="grid size-9 shrink-0 place-items-center rounded-lg text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
          >
            <IconChevronLeft className="size-5" />
          </button>
        )}

        <div ref={navigationRef} className="scrollbar-none flex min-w-0 flex-1 items-center gap-6 overflow-x-auto">
          <div className="shrink-0">
            <UserProfile user={user} side="top" />
          </div>

          {navigationItems.map(({ label, href, icon: Icon }) => {
            const isActive = href === "/dashboard"
              ? pathname === href
              : pathname === href || pathname.startsWith(`${href}/`)

            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors ${isActive ? "text-neutral-100" : "text-neutral-400 hover:text-white"}`}
              >
                <Icon className="size-5" />
                {label}
              </Link>
            )
          })}
        </div>

        {hasOverflow && (
          <button
            type="button"
            aria-label="Scroll navigation right"
            onClick={() => scrollNavigation(1)}
            className="grid size-9 shrink-0 place-items-center rounded-lg text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
          >
            <IconChevronRight className="size-5" />
          </button>
        )}
      </div>
    </nav>
  )
}
