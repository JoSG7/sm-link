"use client"

import { IconCheck, IconLoader2 } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { DatePicker } from "../../shared/components/DatePicker"
import { GuestLinkServices } from "../../../services/guest-link.service"
import ModalLayout from "@/features/shared/modals/ModalLayout"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store-config"
import { recordChange } from "@/store/link-changes-slice"
import { toggleSetExpiration } from "@/store/modal-slice"



export function CreateLinkExpirationModal() {

  const [submiting, setSubmiting] = useState(false)
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(undefined)
  const [expirationHour, setExpirationHour] = useState("")

  const dispatch = useDispatch()
  const { isOpen, shortLink } = useSelector((state: RootState) => state.modals.setExpiration)


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!expirationDate || expirationHour == "") {

      toast.error("Please, enter a valid date and hour")

    } else if (shortLink) {

      const [hour, min] = expirationHour.split(":").map(Number)
      const fullDate = new Date(
        expirationDate.getFullYear(),
        expirationDate.getMonth(),
        expirationDate.getDate(),
        hour,
        min
      )

      setSubmiting(true)

      try {

        const { response } = await new GuestLinkServices().expiration.createSmLinkExpiration(shortLink, fullDate.toISOString())
        toast.success(response)

      } catch (e) {

        toast.error((e as Error).message)

      } finally {

        setSubmiting(false)
        dispatch(recordChange())
        dispatch(toggleSetExpiration())

      }
    }
  }


  return (
    <ModalLayout>
      <AnimatePresence>
        {
          isOpen && (
            <motion.section className={`fixed inset-0 z-30 bg-[rgba(0,0,0,0.8)] flex items-center justify-center
            ${submiting && "pointer-events-none"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setExpirationDate(undefined)
                setExpirationHour("")
                dispatch(toggleSetExpiration())
              }}>

              <motion.div className="w-[90vw] bg-neutral-950 rounded-xl border border-neutral-800 max-w-xl
              sm:w-[70vw] lg:w-[50vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}>

                <h1 className="p-4 border-b border-neutral-800 text-sm sm:text-base lg:text-sm">
                  Set a expiration date for <span className="font-medium">{shortLink}</span>
                </h1>

                <form onSubmit={handleSubmit}>

                  {/* Date Input Section */}
                  <section className="p-4 flex flex-col gap-4 border-b border-neutral-800 text-sm ">

                    {/* Day Picker */}
                    <DatePicker onChange={(e) => setExpirationDate(e)} />

                    {/* Hour Picker */}
                    <div className="py-3 px-4 rounded-lg border border-neutral-800 ">
                      <input type="time" className="w-full text-white bg-transparent"
                        required
                        onChange={(e) => {
                          setExpirationHour(e.currentTarget.value)
                        }} />
                    </div>

                    {/* Final Expiration Date */}
                    <p className="text-sm text-neutral-400 ">
                      {expirationDate ?
                        "Your link will expire on " + expirationDate.toLocaleDateString() +
                        (expirationHour && " at " + expirationHour)
                        :
                        ""
                      }
                    </p>
                  </section>

                  {/* Buttons Section */}
                  <div className="p-4 flex gap-4 items-center text-sm ">

                    <button className="p-2 px-3 flex items-center gap-2 rounded-lg bg-sky-600 disabled:opacity-30 
                    cursor-pointer"
                      type="button"
                      disabled={submiting}
                      onClick={handleSubmit}>
                      {
                        submiting ?
                          <IconLoader2 className="size-4 animate-spin " /> :

                          <IconCheck className="size-4 " />
                      }
                      {submiting ? "Creating..." : "Create"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.section>
          )
        }
      </AnimatePresence>
    </ModalLayout>
  )
}