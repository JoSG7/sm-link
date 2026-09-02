import clsx from "clsx"
import type { ComponentType } from "react"

interface AnalyticsStatCardProps {
  title: string
  value: number
  icon: ComponentType<{ className?: string; stroke?: number }>
  iconClass: string
  countClass: string
  glowClass: string
  suffix?: string
}

export function AnalyticsStatCard({
  title,
  value,
  icon: Icon,
  iconClass,
  countClass,
  glowClass,
  suffix,
}: AnalyticsStatCardProps) {
  return (
    <article className="group relative isolate flex min-h-36 flex-1 overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-neutral-700">
      <div className={clsx("pointer-events-none absolute -right-10 -top-10 -z-10 size-36 rounded-full bg-linear-to-br to-transparent blur-2xl transition duration-300 group-hover:scale-125", glowClass)} />

      <div className="flex w-full items-start justify-between gap-4">
        <div>
          <p className="font-medium text-neutral-300">{title}</p>
          <p className={clsx("mt-4 text-4xl font-semibold tracking-tight", countClass)}>
            {value}
            {suffix && <span className="ml-1 text-base font-medium text-neutral-500">{suffix}</span>}
          </p>
        </div>

        <div className={clsx("rounded-xl p-2.5 ring-1", iconClass)}>
          <Icon className="size-6" stroke={1.8} />
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-5 h-1 overflow-hidden rounded-full bg-neutral-900">
        <div className={clsx("h-full w-2/5 rounded-full bg-current opacity-70 transition-all duration-500 group-hover:w-3/5", countClass)} />
      </div>
    </article>
  )
}