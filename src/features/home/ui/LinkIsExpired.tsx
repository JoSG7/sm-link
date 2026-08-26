"use client"

import { IconClockOff, IconLinkOff } from "@tabler/icons-react"
import { motion } from 'framer-motion'

export function LinkIsExpired() {

  return (
    <section className="w-screen h-screen flex items-center justify-center px-4">

      <motion.div className="group relative isolate w-[90vw] overflow-hidden bg-neutral-950 rounded-2xl border border-neutral-800 max-w-140
      sm:w-[70vw] lg:w-[50vw]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}>

        <div className="pointer-events-none absolute -right-12 -top-12 -z-10 size-40 rounded-full bg-linear-to-br from-amber-500/15 via-red-500/10 to-transparent blur-2xl transition duration-300 group-hover:scale-125" />

        <header className="p-4 flex items-center gap-4 lg:p-5">
          <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/15">
            <IconClockOff className="text-amber-400" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">Access unavailable</p>
            <h1 className="mt-1 text-lg font-semibold lg:text-xl">This link has expired</h1>
          </div>
        </header>

        <section className="p-4 pt-0 flex flex-col gap-4 lg:p-5 lg:pt-0">
          <p className="p-3 rounded-lg border-1.5 border-neutral-800 bg-neutral-900/80 text-sm leading-6 text-neutral-300">
            This link reached its expiration date and is no longer available.
          </p>

          <div className="flex items-center gap-3 p-3 rounded-lg border-1.5 border-red-500/25 bg-red-500/10 text-xs text-red-200 lg:text-sm">
            <IconLinkOff className="size-5 shrink-0 text-red-400" />
            <span>The destination cannot be opened</span>
          </div>
        </section>

      </motion.div>
    </section>
  )

}