"use client"

import { IconCheck, IconKey, IconLoader2, IconLockFilled } from "@tabler/icons-react"
import { motion } from "framer-motion"
import { SubmitEvent, useState } from "react"
import { toast } from "sonner"
import { LinkServices } from "@/services/link.service"
import { AnalyticsService } from "@/services/analytics.service"

export function AccessLinkForm({ short, linkID }: { short: string, linkID?: string }) {

  const [submiting, setSubmiting] = useState(false)
  const [password, setPassword] = useState("")

  if (!linkID) return null

  const handleRedirect = async (e: SubmitEvent) => {

    e.preventDefault()
    setSubmiting(true)

    try {

      const { data } = await new LinkServices().protected.validatePassword({ short, password })

      if (!data) {
        throw new Error("Invalid password")
      }

      await new AnalyticsService().recordMetric({
        linkId: linkID,
      })
      window.location.replace(data)

    } catch {

      await new AnalyticsService().recordMetric({
        linkId: linkID,
        status: "wrong_password",
      })

      toast.error("Wrong Password")
      setSubmiting(false)
    }
  }


  return (

    <section className="w-screen h-screen flex items-center justify-center">

      <motion.div className="group relative isolate w-[90vw] overflow-hidden bg-neutral-950 rounded-2xl border border-neutral-800 max-w-140
      sm:w-[70vw] lg:w-[50vw]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}>

        <div className="pointer-events-none absolute -right-12 -top-12 -z-10 size-40 rounded-full bg-linear-to-br from-green-500/15 via-sky-500/10 to-transparent blur-2xl transition duration-300 group-hover:scale-125" />

        <header className="p-4 flex items-center gap-4 lg:p-5">
          <div className="p-2 rounded-lg border border-green-500/30 bg-green-500/20">
            <IconLockFilled className="size-4 text-green-400 lg:size-6" />
          </div>

          <div>
            <h1 className="text-sm font-medium lg:text-base">Protected Link</h1>
            <p className="text-xs text-neutral-400">Enter the password to continue</p>
          </div>
        </header>

        <form onSubmit={handleRedirect}>
          <section className="p-4 pt-0 flex flex-col gap-4 lg:p-5 lg:pt-0">

            <article className="flex items-center text-xs grow lg:text-sm">
              <div className="p-2.5 rounded-s-lg border-1.5 border-e-0 border-neutral-800 bg-neutral-900/80">
                <IconKey className="size-4 lg:size-5" />
              </div>

              <input
                id="access-password"
                className="grow p-2.5 rounded-e-lg border-1.5 border-neutral-800 bg-neutral-900/80 focus:border-green-600"
                type="password"
                required
                autoFocus
                placeholder="Enter the password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)} />
            </article>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="max-w-max py-2 px-4 flex items-center gap-2 text-xs rounded-lg cursor-pointer disabled:opacity-50 bg-linear-to-b from-green-500 to-green-500/50 lg:text-sm"
                disabled={submiting}>

                {
                  submiting ?
                    <IconLoader2 className="size-4 animate-spin" />
                    :
                    <IconCheck className="size-4" />
                }

                {submiting ? "Validating..." : "Enter"}

              </button>
            </div>
          </section>
        </form>
      </motion.div>

    </section>
  )
}