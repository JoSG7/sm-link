"use client"

import { IconAlertTriangle, IconArrowLeft, IconLinkOff } from "@tabler/icons-react"
import { motion } from "framer-motion"
import Link from "next/link"

interface Props {
  type: "error" | "not-found"
}

const content = {
  error: {
    eyebrow: "Something went wrong",
    title: "We could not open this link",
    description: "An unexpected error occurred while processing the link. Please try again later.",
    action: "Return home",
    icon: IconAlertTriangle,
    accent: "amber",
    status: "The destination could not be opened",
  },
  "not-found": {
    eyebrow: "Link unavailable",
    title: "This link does not exist",
    description: "The short link may be incorrect, deleted, or no longer available.",
    action: "Go back home",
    icon: IconLinkOff,
    accent: "sky",
    status: "Check the URL and try again",
  },
} as const

export function LinkAccessMessage({ type }: Props) {
  const message = content[type]
  const Icon = message.icon
  const isError = message.accent === "amber"

  return (
    <section className="flex h-screen w-screen items-center justify-center px-4">
      <motion.div
        className="group relative isolate w-[90vw] max-w-140 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 sm:w-[70vw] lg:w-[50vw]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}>

        <div className={`pointer-events-none absolute -right-12 -top-12 -z-10 size-40 rounded-full blur-2xl transition duration-300 group-hover:scale-125 ${isError ? "bg-linear-to-br from-amber-500/15 via-red-500/10 to-transparent" : "bg-linear-to-br from-purple-500/15 via-fuchsia-500/10 to-transparent"}`} />

        <header className="flex items-center gap-4 p-4 lg:p-5">
          <div className={`rounded-xl border p-3 ${isError ? "border-amber-500/30 bg-amber-500/15" : "border-purple-500/30 bg-purple-500/15"}`}>
            <Icon className={`size-6 ${isError ? "text-amber-400" : "text-purple-400"}`} stroke={1.7} />
          </div>

          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isError ? "text-amber-400" : "text-purple-400"}`}>
              {message.eyebrow}
            </p>
            <h1 className="mt-1 text-lg font-semibold text-neutral-100 lg:text-xl">
              {message.title}
            </h1>
          </div>
        </header>

        <section className="flex flex-col gap-4 p-4 pt-0 lg:p-5 lg:pt-0">
          <p className="rounded-lg border-1.5 border-neutral-800 bg-neutral-900/80 p-3 text-sm leading-6 text-neutral-300">
            {message.description}
          </p>

          <div className={`flex items-center gap-3 rounded-lg border-1.5 p-3 text-xs lg:text-sm ${isError ? "border-red-500/25 bg-red-500/10 text-red-200" : "border-purple-500/25 bg-purple-500/10 text-purple-200"}`}>
            <IconLinkOff className={`size-5 shrink-0 ${isError ? "text-red-400" : "text-purple-400"}`} />
            <span>{message.status}</span>
          </div>

          <Link
            href="/"
            className="flex w-fit items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-sm font-medium text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-800">
            <IconArrowLeft className="size-4" />
            {message.action}
          </Link>
        </section>
      </motion.div>
    </section>
  )
}