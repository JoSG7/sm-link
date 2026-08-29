"use client"

import { IconAlarmPlus, IconCalendarPlus, IconCheck, IconClockHour3, IconLoader } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { SubmitEvent, useState } from "react"
import { toast } from "sonner"
import ModalLayout from "@/components/modals/ModalLayout"
import { useDispatch } from "react-redux"
import { recordChange } from "@/store/link-changes-slice"
import { LinkServices } from "@/services/link.service"

interface CreateExpirationModalProps {
  isOpen: boolean
  short: string
  onClose: () => void
}

export function CreateExpirationModal({ isOpen, short, onClose }: CreateExpirationModalProps) {

  const [submiting, setSubmiting] = useState(false)
  const [expirationDate, setExpirationDate] = useState("")
  const [expirationHour, setExpirationHour] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()

    if (expirationDate == "" || expirationHour == "") {

      toast.error("Please, enter a valid date and hour")

    } else if (short) {

      const [year, month, day] = expirationDate.split("-").map(Number)
      const [hour, min] = expirationHour.split(":").map(Number)
      const fullDate = new Date(year, month - 1, day, hour, min)

      setSubmiting(true)

      try {

        const { data } = await new LinkServices().expiration.createExpiration({ short, expiresAt: fullDate.toISOString() })
        toast.success(data)

      } catch (e) {

        toast.error((e as Error).message)

      } finally {

        setSubmiting(false)
        dispatch(recordChange())
        onClose()

      }
    }
  }


  return (
    <ModalLayout>
      <AnimatePresence>
        {
          isOpen && (
            <motion.section className={`fixed inset-0 z-30 bg-black/80 backdrop-blur-sm flex items-center justify-center ${submiting && "pointer-events-none"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setExpirationDate("")
                setExpirationHour("")
                onClose()
              }}>

              <motion.form className="group relative isolate w-[90vw] p-5 bg-neutral-950 rounded-xl border border-neutral-800 max-w-140 overflow-hidden
              sm:w-[70vw] lg:w-[50vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}>

                <div className="pointer-events-none absolute -right-12 -top-12 -z-10 size-25 rounded-full bg-linear-to-br from-amber-500/15 via-yellow-500/10 to-transparent blur-2xl" />

                <header className="pb-4 flex items-center gap-4">
                  <div className="p-2 rounded-lg border border-yellow-500/30 bg-yellow-500/20">
                    <IconAlarmPlus className="size-6 text-yellow-400" />
                  </div>

                  <div>
                    <h1 className="font-medium">Add Expiration Date</h1>
                    <p className="text-xs text-neutral-400">{short}</p>
                  </div>
                </header>

                <section className="py-2 flex flex-col gap-4">

                  <article className="flex items-center text-sm">
                    <div className="p-2.5 rounded-s-lg border-1.5 border-e-0 border-neutral-800 bg-neutral-900/80">
                      <IconCalendarPlus className="size-5" />
                    </div>

                    <input className="p-2.5 rounded-e-lg border-1.5 border-neutral-800 bg-neutral-900/80
                    focus:border-amber-400 grow"
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      max="2026-12-31"
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.currentTarget.value)} />
                  </article>

                  <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
                    <article className="flex items-center text-sm">
                      <div className="p-2.5 rounded-s-lg border-1.5 border-e-0 border-neutral-800 bg-neutral-900/80">
                        <IconClockHour3 className="size-5" />
                      </div>

                      <input type="time" className="grow p-2.5 rounded-e-lg border-1.5 border-neutral-800 bg-neutral-900/80
                        focus:border-amber-400"
                        required
                        value={expirationHour}
                        onChange={(e) => setExpirationHour(e.currentTarget.value)} />
                    </article>

                    <p className="p-2.5 rounded-lg text-sm text-neutral-300 border-1.5 border-neutral-800 bg-neutral-900/80">
                      Expires at {expirationDate && expirationHour ? expirationDate + " " + expirationHour : ""}
                    </p>
                  </div>

                  <p className="p-2.5 rounded-lg text-sm text-yellow-200 border-1.5 border-amber-500/30 bg-amber-500/20">
                    After the expiration date, this link will no longer be accessible
                  </p>
                </section>

                <div className="pt-4 flex justify-start">
                  <button className="py-2 px-4 flex items-center gap-2 text-sm rounded-lg disabled:opacity-50 bg-linear-to-b from-amber-500 to-amber-500/50"
                    disabled={submiting}>
                    {submiting ? <IconLoader className="size-3 animate-spin" /> : <IconCheck className="size-3" />}
                    Create
                  </button>
                </div>
              </motion.form>
            </motion.section>
          )
        }
      </AnimatePresence>
    </ModalLayout>
  )
}