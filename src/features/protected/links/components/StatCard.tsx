"use client"

import { IconAlarm, IconClockExclamation, IconLink, IconShieldCheckFilled } from "@tabler/icons-react"
import { LinkDetails } from "@/types/global"
import clsx from "clsx"

type StatType = "total" | "protected" | "expiration" | "expired"

interface StatCardProps {
  links: LinkDetails[]
  type: StatType
}

const statConfig = {
  total: {
    title: "Total links",
    color: "green",
    icon: IconLink,
    iconClass: "bg-green-500/15 text-green-300 ring-green-400/20",
    countClass: "text-green-200",
    glowClass: "from-green-500/10",
  },
  protected: {
    title: "Protected links",
    color: "blue",
    icon: IconShieldCheckFilled,
    iconClass: "bg-blue-500/15 text-blue-300 ring-blue-400/20",
    countClass: "text-blue-200",
    glowClass: "from-blue-500/10",
  },
  expiration: {
    title: "Links with expiration",
    color: "yellow",
    icon: IconAlarm,
    iconClass: "bg-yellow-500/15 text-yellow-200 ring-yellow-400/20",
    countClass: "text-yellow-100",
    glowClass: "from-yellow-500/10",
  },
  expired: {
    title: "Expired links",
    color: "red",
    icon: IconClockExclamation,
    iconClass: "bg-red-500/15 text-red-300 ring-red-400/20",
    countClass: "text-red-200",
    glowClass: "from-red-500/10",
  },
} as const

export function StatCard({ links, type,  }: StatCardProps) {
  const config = statConfig[type]
  const Icon = config.icon

  const count = type === "total"
    ? links.length
    : type === "protected"
      ? links.filter(link => link.has_password).length
      : type === "expiration"
        ? links.filter(link => link.expires_at !== null).length
        : links.filter(link => link.is_expired).length

  return (
    <article className="group relative isolate min-h-36 overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-neutral-700 flex-1">
      
      <div className={clsx("pointer-events-none absolute -right-10 -top-10 -z-10 size-36 rounded-full bg-linear-to-br to-transparent blur-2xl transition duration-300 group-hover:scale-125", config.glowClass)} />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className=" font-medium text-neutral-300">
            {config.title}
          </p>
          <p className={clsx("mt-4 text-4xl font-semibold tracking-tight", config.countClass)}>
            {count}
          </p>
        </div>

        <div className={clsx("rounded-xl p-2.5 ring-1", config.iconClass)}>
          <Icon className="size-6" strokeWidth={1.8} />
        </div>
      </div>

      <div className="mt-5 h-1 overflow-hidden rounded-full bg-neutral-900">
        <div className={clsx("h-full w-2/5 rounded-full bg-current opacity-70 transition-all duration-500 group-hover:w-3/5", config.countClass)} />
      </div>
    </article>
  )
}
