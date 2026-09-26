"use client"

import { IconArrowRight, IconBolt } from "@tabler/icons-react"
import { SubmitEvent, useState } from "react"
import { toast } from "sonner"
import { NewLink } from "./NewLink"
import { useDispatch } from "react-redux"
import { recordChange } from "@/store/link-changes-slice"
import { LinkServices } from "@/services/link.service"
import { motion } from "framer-motion"
import { useScreenSize } from "@/hooks/useScreenSize"

export function ShorterForm() {

  const [original, setOriginal] = useState("")
  const [short, setShort] = useState<null | string>(null)
  const [showForm, setShowForm] = useState(true)
  const [submiting, setSubmiting] = useState(false)
  const dispatch = useDispatch()
  const width = useScreenSize()
  const isMobile = width > 0 && width < 1024

  const hiddenCardPosition = isMobile
    ? { x: 5, y: 15, opacity: 1, scale: 0.97 }
    : { x: -16, y: 18, opacity: 1, scale: 0.97 }


  const handleSubmit = async (e: SubmitEvent) => {

    e.preventDefault()
    setSubmiting(true)

    try {

      const { data } = await new LinkServices().createSmLink({ original })
      setShort(data)
      setShowForm(false)
      dispatch(recordChange())
      toast.success("Succes")

    } catch (e) {

      toast.error((e as Error).message)

    } finally {

      setSubmiting(false)
      setOriginal("")

    }
  }


  return (
    <section className="relative w-full lg:h-full">
      <motion.div
        className={`relative origin-left rounded-2xl border border-[#ffffff1a] shadow-card ${showForm ? "z-10 bg-card" : "pointer-events-none z-0 bg-moss-900"}`}
        animate={showForm ? { x: 0, y: 0, opacity: 1, scale: 1 } : hiddenCardPosition}
        transition={{ type: "spring", stiffness: 130, damping: 18 }}>

        <motion.div
          aria-hidden={!showForm}
          animate={{ opacity: showForm ? 1 : 0 }}
          transition={{ duration: 0.35, delay: showForm ? 0.15 : 0 }}>

          <div className="absolute -top-5 right-5 hidden rounded-full border border-[#ffffff1a] bg-card px-4 py-2 text-xs lg:block">
            No log in is required
          </div>

          <header className="flex items-center justify-between border-b border-[#ffffff0d] px-5 py-4.5 lg:px-6">

            <div className="flex items-center gap-3">
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-green-400/30 bg-green-400/10 font-mono text-xs text-green-300">
                01
              </span>
              <div>
                <p className="text-base font-medium text-white">Shorten your link</p>
                <p className="mt-0.5 text-xs text-moss-dim">Create a clean URL in seconds</p>
              </div>
            </div>

            {
              short && showForm &&
              <button
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-moss-border bg-moss-850/80 px-3 py-2 text-xs text-moss-copy transition-colors hover:border-green-400 hover:text-white"
                onClick={() => setShowForm(false)}
                aria-label="View shortened link"
                type="button">
                <span className="hidden sm:inline">View link</span>
                <IconArrowRight className="size-4" />
              </button>
            }
          </header>

          <form className="p-5 sm:p-6"
            onSubmit={handleSubmit}>
            <label className="mb-3 flex items-center gap-2 text-sm font-medium text-moss-copy">
              Paste a long URL
            </label>

            <section className="flex flex-col gap-4 text-sm sm:flex-row lg:text-sm">
              <input className="py-2 min-w-0 flex-1 rounded-lg border border-moss-border bg-moss-850/80 px-3 text-moss-copy outline-none placeholder:text-moss-dim transition-colors focus:border-green-400 focus:ring-2 focus:ring-green-400/20 sm:h-12 sm:px-4"
                placeholder="https://example.com/long-url"
                disabled={submiting}
                autoComplete="off"
                value={original}
                type="url"
                required
                onChange={(e) => setOriginal(e.currentTarget.value.trim())} />

              <button className="py-2 flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-green-500 to-blue-700 px-5 font-medium text-white disabled:opacity-30 sm:min-w-32 sm:p-0"
                disabled={submiting}>
                <IconBolt className="size-5" />
                <span>Shorten</span>
              </button>
            </section>
          </form>

          <p className="border-t border-[#ffffff0d] px-5 py-4.5 text-xs text-neutral-300/80 lg:px-6">
            By proceeding, you agree to our
            <span className="text-green-400/70"> Terms of Service </span>
            and
            <span className="text-green-400/70"> Privacy Policy</span>.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className={`absolute inset-x-0 top-0 origin-left ${showForm ? "z-0 pointer-events-none" : "z-10 pointer-events-auto"}`}
        initial={hiddenCardPosition}
        animate={showForm ? hiddenCardPosition : { x: 0, y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 130, damping: 18 }}>
        <NewLink
          short={short}
          active={!showForm}
          onReset={() => {
            setShowForm(true)
            setOriginal("")
          }} />
      </motion.div>
    </section>
  )
}