"use client"

import { IconArrowLeft, IconCopyPlusFilled, IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function NewLink({ short, active, onReset }: { short: string | null, active: boolean, onReset: () => void }) {

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`sm-link.vercel.app/${short}`).then(() => { toast.success("Copied!") })
  }

  return (
    <section className={`flex-1 rounded-2xl border border-[#ffffff12] shadow-card ${active ? "bg-card" : "bg-moss-900"}`}>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: active && short ? 1 : 0 }}
        transition={{ duration: 0.35, delay: active ? 0.15 : 0 }}>
        <header className="flex items-center justify-between border-b border-[#ffffff0d] px-5 py-4.5 lg:px-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-8 items-center justify-center rounded-full border border-blue-400/30 bg-blue-400/10 font-mono text-xs text-blue-300">
              02
            </span>
            <div>
              <p className="text-base font-medium text-white">Your link is ready</p>
              <p className="mt-0.5 text-xs text-moss-dim">Share your shortened URL</p>
            </div>
          </div>

          {
            active && short &&
            <button
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-moss-border bg-moss-850/80 px-3 py-2 text-xs text-moss-copy transition-colors hover:border-green-400 hover:text-white"
              onClick={onReset}
              type="button">
              <IconArrowLeft className="size-4" />
              <span>Back to form</span>
            </button>
          }
        </header>

        <div className="p-5 lg:p-6">
          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-moss-copy">
            Your shortened link
          </p>

          <div className="flex gap-3 text-base sm:text-lg sm:gap-4 lg:text-sm">
            <p className="flex h-12 min-w-0 flex-1 items-center overflow-hidden text-nowrap rounded-lg border border-moss-border bg-moss-850/80 px-4 text-moss-copy">
              {
                short ?
                  <span>sm-link.vercel.app/{short}</span>
                  :
                  <span className="text-moss-dim">sm-link.vercel.app/abc123 (Example)</span>
              }
            </p>

            {
              short &&
              <motion.div className="flex h-12 items-center gap-3 rounded-lg border border-moss-border bg-moss-850/80 px-4"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}>
                <button className="cursor-pointer"
                  onClick={copyToClipboard}
                  type="button"
                  aria-label="Copy shortened link">
                  <IconCopyPlusFilled className="size-5 text-green-400" />
                </button>

                <Link
                  href={`https://sm-link.vercel.app/${short}`}
                  target="_blank"
                  aria-label="Open shortened link">
                  <IconExternalLink className="size-5 text-blue-400" />
                </Link>
              </motion.div>
            }
          </div>

        </div>

        <p className="border-t border-[#ffffff0d] px-5 py-4.5 text-xs text-neutral-300/80 lg:px-6">
          By proceeding, you agree to our
          <span className="text-blue-400/70"> Terms of Service </span>
          and
          <span className="text-blue-400/70"> Privacy Policy</span>.
        </p>
      </motion.div>
    </section>
  )
}