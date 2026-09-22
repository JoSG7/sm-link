"use client"

import ModalLayout from "@/components/modals/ModalLayout";
import { AnimatePresence } from "framer-motion";
import { SubmitEvent, useState } from "react";
import { motion } from "framer-motion";
import { IconAlarm, IconCalendar, IconCheck, IconClockEdit, IconLoader } from "@tabler/icons-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { LinkServices } from "@/services/link.service";
import { useRouter } from "next/navigation";


interface UpdateExpirationModalProps {
  isOpen: boolean
  short: string
  date: string
  onClose: () => void
}

export function UpdateExpirationModal({ isOpen, short, date, onClose }: UpdateExpirationModalProps) {

  const [submiting, setSubmiting] = useState(false)
  const [expirationDate, setExpirationDate] = useState("")
  const [expirationHour, setExpirationHour] = useState("")

  const router = useRouter()
  const actually = date

  const handleUpdate = async (e: SubmitEvent) => {

    e.preventDefault()

    const [year, month, day] = expirationDate.split("-").map(Number)
    const [hour, min] = expirationHour.split(":").map(Number)
    const fullDate = new Date(year, month - 1, day, hour, min)

    try {

      setSubmiting(true)

      const { data } = await new LinkServices().expiration.updateExpiration({
        short,
        expiresAt: fullDate.toISOString()
      })

      setExpirationDate("")
      setExpirationHour("")
      toast.success(data)
      router.refresh()
      onClose()

    } catch (e) {

      toast.error((e as Error).message)

    } finally {

      setSubmiting(false)

    }
  }


  return (

    <ModalLayout>
      <AnimatePresence>

        {
          isOpen && (

            <motion.section className={`fixed inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm
            ${submiting && "pointer-events-none"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}>

              <motion.form className="flex w-[90vw] max-h-[90vh] min-h-0 max-w-145 flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 sm:w-[80vw] lg:w-[70vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.1 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleUpdate}>

                <header className="flex shrink-0 items-center justify-between gap-4 border-b border-neutral-800 px-5 p-4 sm:py-5 sm:px-6">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5">
                      <IconAlarm className="size-5 text-amber-400" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-300">Link expiration</p>
                      <h1 className="truncate text-lg font-semibold text-white sm:text-xl">Update expiration</h1>
                    </div>
                  </div>

                  <button type="submit" className="flex shrink-0 items-center gap-2 rounded-lg bg-linear-to-b from-amber-500 to-amber-500/50 px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50" disabled={submiting}>
                    {submiting ? <IconLoader className="size-4 animate-spin" /> : <IconCheck className="size-4" />}
                    <span className="hidden sm:inline">Update</span>
                  </button>
                </header>

                <section className="min-h-0 flex-1 overflow-y-auto p-6">
                  <div className="flex flex-col gap-4">
                    <div className="pb-1">
                      <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">EXPIRATION DETAILS</h2>
                      <p className="text-sm text-neutral-500">Change when this SmLink should stop being accessible.</p>
                    </div>

                    <p className="grow rounded-lg border-1.5 border-amber-500/30 bg-amber-500/10 p-2.5 text-sm text-yellow-200">
                      Current expiration: {format(new Date(actually), "MMMM d 'at' H:m")}
                    </p>

                    <article className="flex items-center rounded-lg border-1.5 border-neutral-800 bg-neutral-900/80 text-sm focus-within:border-amber-400">
                      <IconCalendar className="ml-3 size-5 text-neutral-500" />

                      <input className="grow bg-transparent p-2.5 outline-none"
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      max={"2026-12-31"}
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.currentTarget.value)} />
                  </article>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      <article className="flex items-center rounded-lg border-1.5 border-neutral-800 bg-neutral-900/80 text-sm focus-within:border-amber-400">
                        <IconClockEdit className="ml-3 size-5 text-neutral-500" />

                        <input className="grow bg-transparent p-2.5 outline-none"
                        type="time"
                        required
                        placeholder="Select an hour"
                        value={expirationHour}
                        onChange={(e) => setExpirationHour(e.currentTarget.value)} />
                    </article>

                      <p className="rounded-lg border-1.5 border-neutral-800 bg-neutral-900/80 p-2.5 text-sm text-neutral-300">
                        New expiration {expirationDate && expirationHour != "" ? expirationDate + " " + expirationHour : ""}
                      </p>

                    </div>
                  </div>
                </section>
              </motion.form>
            </motion.section>
          )
        }

      </AnimatePresence>
    </ModalLayout>
  )
}