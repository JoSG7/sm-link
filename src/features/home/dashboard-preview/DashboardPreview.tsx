"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { IconArrowUpRight } from "@tabler/icons-react"
import { PreviewContent } from "./components/PreviewContent"
import { PreviewNavigation } from "./components/PreviewNavigation"
import { PreviewSidebar } from "./components/PreviewSidebar"
import { type PreviewView, viewMeta } from "./preview-data"

export function DashboardPreview() {
  const [activeView, setActiveView] = useState<PreviewView>("dashboard")
  const activeMeta = viewMeta[activeView]

  return (
    <section className="relative overflow-hidden border-t border-moss-line bg-moss-950 px-5 py-20 sm:px-6 lg:py-28">

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(144,220,160,0.08)_28%,rgba(144,220,160,0.42)_50%,rgba(144,220,160,0.08)_72%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(144,220,160,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(144,220,160,0.045)_1px,transparent_1px)] bg-size-[44px_44px] opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 size-128 -translate-x-1/2 rounded-full bg-green-400/6 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-sky-400/4 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-green-300">Your links, understood</p>
          <h2 className="text-4xl font-normal tracking-tight text-white sm:text-5xl">
            Everything you need to grow your reach.
          </h2>
          <p className="mt-5 text-base leading-7 text-moss-copy sm:text-lg">
            Turn every click into a clear next step with a dashboard built for quick decisions.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-moss-border bg-moss-900/90 shadow-[0_0_0_1px_rgba(91,220,126,0.02),0_30px_70px_rgba(0,0,0,0.45),0_0_100px_rgba(74,222,128,0.04)]">
          <div className="border-b border-moss-border">
            <PreviewNavigation activeView={activeView} onViewChange={setActiveView} />
            <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <div>
                <p className="text-sm font-semibold text-neutral-100 sm:text-base">{activeMeta.title}</p>
                <p className="mt-1 text-xs text-moss-muted">{activeMeta.description}</p>
              </div>
              <Link href="/dashboard" className="hidden items-center gap-2 rounded-lg bg-linear-to-r from-green-400 to-sky-500 px-3 py-2 text-xs font-semibold text-black transition hover:from-green-300 hover:to-sky-400 sm:inline-flex">
                Open dashboard <IconArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="flex">
            <PreviewSidebar activeView={activeView} onViewChange={setActiveView} />
            <div className="min-w-0 flex-1 p-4 sm:p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <PreviewContent view={activeView} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(144,220,160,0.12)_28%,rgba(144,220,160,0.65)_50%,rgba(144,220,160,0.12)_72%,transparent_100%)]" />
        </div>

        <Link href="/dashboard" className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-lg border border-neutral-700 px-4 py-2.5 text-sm font-medium text-neutral-200 transition hover:border-neutral-500 hover:bg-neutral-900 sm:hidden">
          Open dashboard <IconArrowUpRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}
