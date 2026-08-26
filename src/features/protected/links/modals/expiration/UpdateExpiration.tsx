"use client"

import ModalLayout from "@/components/modals/ModalLayout";
import { AnimatePresence } from "framer-motion";
import { SubmitEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { IconAlarm, IconCalendar, IconCheck, IconClockEdit, IconLoader } from "@tabler/icons-react";
import { toast } from "sonner";
import { months } from "@/consts";
import { UserLinkServices } from "@/services/user-link.service";
import { recordChange } from "@/store/link-changes-slice";


interface UpdateUserLinkExpirationModalProps {
  isOpen: boolean
  short: string
  date: string
  onClose: () => void
}

export function UpdateUserLinkExpirationModal({ isOpen, short, date, onClose }: UpdateUserLinkExpirationModalProps) {

  const [submiting, setSubmiting] = useState(false)
  const [expirationDate, setExpirationDate] = useState("")
  const [expirationHour, setExpirationHour] = useState("")

  const dispatch = useDispatch()
  const actually = date


  const handleUpdate = async (e: SubmitEvent) => {

    e.preventDefault()

    const [year, month, day] = expirationDate.split("-").map(Number)
    const [hour, min] = expirationHour.split(":").map(Number)
    const fullDate = new Date(year, month - 1, day, hour, min)

    try {

      setSubmiting(true)

      const { response } = await new UserLinkServices().expiration.updateUserSmLinkExpiration({ 
        short,  
        newExpirationDate: fullDate.toISOString()
      })

      dispatch(recordChange())
      setExpirationDate("")
      setExpirationHour("")
      onClose()
      toast.success(response)


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

            <motion.section className={`fixed inset-0 z-30 bg-black/70 flex items-center justify-center backdrop-blur-sm
            ${submiting && "pointer-events-none"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}>

              <motion.form className="w-[90vw] p-5 bg-neutral-950 rounded-xl border border-neutral-800 max-w-140
              sm:w-[70vw] lg:w-[50vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.1 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleUpdate}>

                <header className="pb-4 flex items-center gap-4 ">
                  <div className="p-2 rounded-lg border border-yellow-500/30 bg-yellow-500/20">
                    <IconAlarm className="size-6 text-yellow-400" />
                  </div>

                  <div>
                    <h1 className="font-medium">Update Expiration Date</h1>
                    <p className="text-xs text-neutral-400">{short}</p>
                  </div>
                </header>

                <section className="py-2 flex flex-col gap-4">

                  <p className="p-2.5 rounded-lg text-sm text-yellow-200 border-1.5 border-amber-500/30 bg-amber-500/20 
                    grow">
                    Actually expiration date { 
                      months[new Date(actually).getMonth()] + " " + new Date(actually).getDate() + " at " + 
                      new Date(actually).getHours() + ":" + new Date(actually).getMinutes()
                    }
                  </p>

                  <article className="flex items-center text-sm">
                    <div className="p-2.5 rounded-s-lg border-1.5 border-e-0 border-neutral-800 bg-neutral-900/80">
                      <IconCalendar className="size-5" />
                    </div>

                    <input className="p-2.5 rounded-e-lg border-1.5 border-neutral-800 bg-neutral-900/80
                    focus:border-amber-400 grow"
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      max={"2026-12-31"}
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.currentTarget.value)} />
                  </article>

                  <div className="grid grid-cols-2 gap-4">

                    <article className="flex items-center text-sm">
                      <div className="p-2.5 rounded-s-lg border-2 border-e-0 border-neutral-800 bg-neutral-900/80">
                        <IconClockEdit className="size-5" />
                      </div>

                      <input className="p-2.5 rounded-e-lg border-1.5 border-neutral-800 bg-neutral-900/80
                      focus:border-amber-400 grow"
                        type="time"
                        required
                        placeholder="Select an hour"
                        value={expirationHour}
                        onChange={(e) => setExpirationHour(e.currentTarget.value)} />
                    </article>

                    <p className="p-2.5 rounded-lg text-sm text-neutral-300 border-1.5 border-neutral-800 bg-neutral-900/80 ">
                      New Expiration {expirationDate && expirationHour != "" ? expirationDate + " " + expirationHour : ""}
                    </p>

                  </div>
                </section>

                <div className="pt-4 flex justify-start">
                  <button className="py-2 px-4 flex items-center gap-2 text-sm rounded-lg
                  disabled:opacity-50 bg-linear-to-b from-amber-500 to-amber-500/50"
                    disabled={submiting}>
                    {submiting ? <IconLoader className="size-3 animate-spin" /> : <IconCheck className="size-3" />}
                    Update
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