"use client"

import Link from "next/link"
import { IconAlertTriangle, IconArrowLeft, IconRefresh } from "@tabler/icons-react"

type ErrorMessageProps = {
  title?: string
  description?: string
  actionHref?: string
  actionLabel?: string
  onRetry?: () => void
}

export function ErrorMessage({
  title = "Something went wrong",
  description = "We couldn't load this content right now. Please try again in a moment.",
  actionHref,
  actionLabel = "Go back",
  onRetry,
}: ErrorMessageProps) {
  return (
    <section className="flex min-h-72 items-center justify-center px-5 py-12">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-red-500/20 bg-neutral-950 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.24)] sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-linear-to-br from-red-500/15 via-amber-500/10 to-transparent blur-2xl" />
        <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:gap-6">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-red-400/25 bg-red-500/10 text-red-300">
            <IconAlertTriangle className="size-6" stroke={1.8} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300/80">Request error</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-100">{title}</h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-neutral-400">{description}</p>
            {(actionHref || onRetry) && (
              <div className="mt-5 flex flex-wrap gap-3">
                {onRetry && (
                  <button type="button" onClick={onRetry} className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-green-400 to-sky-500 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:from-green-300 hover:to-sky-400">
                    <IconRefresh className="size-4" />
                    Try again
                  </button>
                )}
                {actionHref && (
                  <Link href={actionHref} className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 px-4 py-2 text-sm font-medium text-neutral-200 transition hover:border-neutral-600 hover:bg-neutral-900">
                    <IconArrowLeft className="size-4" />
                    {actionLabel}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
