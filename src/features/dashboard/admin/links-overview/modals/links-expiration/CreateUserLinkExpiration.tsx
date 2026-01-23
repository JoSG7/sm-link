"use client"

import ModalLayout from "@/features/shared/modals/ModalLayout";
import { RootState } from "@/store/store-config";
import { AnimatePresence } from "framer-motion";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toggleCreateUserLinkExpiration } from "@/store/user-modals-slice";
import { IconAlarmPlus, IconCalendarPlus, IconCheck, IconClockHour3, IconLoader } from "@tabler/icons-react";
import { toast } from "sonner";

export function CreateUserLinkExpirationModal() {

  const [submiting, setSubmiting] = useState(false)
  const [expirationDate, setExpirationDate] = useState("")
  const [expirationHour, setExpirationHour] = useState("")

  const dispatch = useDispatch()
  const { isOpen, short } = useSelector((state: RootState) => state.userModals.expiration.createUserLinkExpiration)



  const handleCreate = async (e: FormEvent) => {

    e.preventDefault()

    const [year, month, day] = expirationDate.split("-").map(Number)
    const [hour, min] = expirationHour.split(":").map(Number)
    const fullDate = new Date(year, month, day, hour, min)

    try {

      setSubmiting(true)
      console.log(fullDate)
      
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

            <motion.section className={`fixed inset-0 z-30 bg-[rgba(0,0,0,0.8)] flex items-center justify-center backdrop-blur-sm
            ${submiting && "pointer-events-none"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch(toggleCreateUserLinkExpiration())}>

              <motion.form className="w-[90vw] bg-neutral-950 rounded-xl border border-neutral-800 max-w-[35rem]
              sm:w-[70vw] lg:w-[50vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleCreate}>

                <header className="p-4 flex items-center gap-4 ">
                  <div className="p-2 rounded-lg border border-yellow-500/30 bg-yellow-500/20">
                    <IconAlarmPlus className="size-6 text-yellow-400" />
                  </div>

                  <div>
                    <h1 className="font-medium">Add Expiration Date</h1>
                    <p className="text-xs text-neutral-400">{short}</p>
                  </div>
                </header>

                <section className="px-4 py-2 flex flex-col gap-4">

                  <article className="flex items-center text-sm">
                    <div className="p-2.5 rounded-s-lg border-1.5 border-e-0 border-neutral-800 bg-neutral-900/80">
                      <IconCalendarPlus className="size-5" />
                    </div>

                    <input className="p-2.5 rounded-e-lg border-1.5 border-neutral-800 bg-neutral-900/80
                    focus:border-amber-400 grow"
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      max={"2026-12-31"}
                      onChange={(e) => setExpirationDate(e.currentTarget.value)} />
                  </article>

                  <div className="grid grid-cols-2 gap-4">

                    <article className="flex items-center text-sm">
                      <div className="p-2.5 rounded-s-lg border-2 border-e-0 border-neutral-800 bg-neutral-900/80">
                        <IconClockHour3 className="size-5" />
                      </div>

                      <input className="p-2.5 rounded-e-lg border-1.5 border-neutral-800 bg-neutral-900/80
                      focus:border-green-600 grow"
                        type="time"
                        required
                        placeholder="Select an hour"
                        onChange={(e) => setExpirationHour(e.currentTarget.value)} />
                    </article>

                    <p className="p-2.5 rounded-lg text-sm border-1.5 border-neutral-800 bg-neutral-900/80 ">
                      Expires at: {expirationDate != "" ? expirationDate : ""} on {expirationHour != "" ? expirationHour : ""}
                    </p>

                  </div>

                  <p className="p-2.5 rounded-lg text-sm text-yellow-200 border-1.5 border-amber-500/30 bg-amber-500/20 
                    grow">
                    After the expiration date, this link will no longer be accessible
                  </p>
                </section>

                <div className="p-4 flex justify-start">
                  <button className="py-2 px-4 flex items-center gap-2 text-sm rounded-lg cursor-pointer
                  disabled:opacity-50 bg-gradient-to-b from-amber-500 to-amber-500/50"
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