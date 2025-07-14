import { ExpirationCalendar } from "@/components/shared/Calendar"
import { ExpirationHour } from "@/components/shared/HourPicker"
import { useLinkChanges } from "@/hooks/useLinkChanges"
import { useAddExpirationModal } from "@/hooks/useModal"
import { addLinkExpiration } from "@/utils/links/api"
import { IconLoader2 } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

export function SetLinkExpirationModal() {

  const [submiting, setSubmiting] = useState(false)
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(undefined)
  const [expirationHour, setExpirationHour] = useState("")
  const { shortLink, isAddExpirationModalOpen, toggleAddExpirationModal } = useAddExpirationModal()
  const { recordLinkChanges } = useLinkChanges()

  const handleSubmit = (e: FormEvent) => {
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
      addLinkExpiration(shortLink, fullDate.toISOString()).then(res => {
        if (res.error) {
          toast.error(res.error)
        } else {
          toast.success(res.response)
        }
      })
        .finally(() => {
          setSubmiting(false)
          recordLinkChanges()
          toggleAddExpirationModal()
        })
    }
  }

  return (
    <AnimatePresence>
      {
        isAddExpirationModalOpen && (
          <motion.section className="fixed inset-0 z-30 bg-[rgba(0,0,0,0.4)] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>

            <motion.div className="w-[300px] bg-neutral-950 rounded-xl border border-neutral-900 lg-2:w-96"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}>

              <h1 className="p-4 border-b border-neutral-900 text-sm lg-2:text-lg">
                Set a expiration date for <span className="font-medium">{shortLink}</span>
              </h1>

              <form onSubmit={handleSubmit}>
                {/* Date Input Section */}
                <section className="p-4 flex flex-col gap-2 border-b border-neutral-900 lg-2:gap-4">
                  <ExpirationCalendar onChange={(value) => { setExpirationDate(value) }} />

                  <div className="flex items-center gap-4">
                    <ExpirationHour onChange={(value) => { setExpirationHour(value) }} />

                    <p className="rounded-lg text-sm border border-[#1c1d1d] p-3 text-gold lg-2:text-base">
                      {expirationDate ? expirationDate.toLocaleDateString() : ""} {expirationHour == "" ? "00:00" : expirationHour}
                    </p>
                  </div>
                </section>

                {/* Buttons Section */}
                <div className="p-4 flex gap-4 items-center text-sm">
                  <button className="py-1 px-3 text-center bg-neutral-900 rounded-lg disabled:opacity-50"
                    type="button" disabled={submiting} onClick={() => {
                      setExpirationDate(undefined)
                      setExpirationHour("")
                      toggleAddExpirationModal()
                    }}>
                    Close
                  </button>

                  <button className="py-1 px-3 rounded-lg bg-sky-600 disabled:opacity-50 flex items-center gap-2"
                    disabled={submiting} type="submit">
                    {submiting ? <IconLoader2 size={15} className="animate-spin" /> : ""}
                    {submiting ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>

            </motion.div>
          </motion.section>
        )
      }
    </AnimatePresence>
  )
}