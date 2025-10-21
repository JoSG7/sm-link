import { IconCheck, IconLoader2, IconX } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { useSetLinkExpirationModal } from "../hooks/useModals"
import { addLinkExpiration } from "../utils/guest-links"
import { useLinkChanges } from "../hooks/useLinkChanges"
import { DatePicker } from "../components/ui/DatePicker"



export function SetLinkExpirationModal() {

  const [submiting, setSubmiting] = useState(false)
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(undefined)
  const [expirationHour, setExpirationHour] = useState("")
  const { shortLink, isSetLinkExpirationOpen, toggleSetLinkExpirationModal } = useSetLinkExpirationModal()
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
          toggleSetLinkExpirationModal()
        })
    }
  }

  return (
    <AnimatePresence>
      {
        isSetLinkExpirationOpen && (
          <motion.section className="fixed inset-0 z-30 bg-[rgba(0,0,0,0.8)] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>

            <motion.div className="w-[90vw] bg-neutral-950 rounded-xl border border-neutral-800 max-w-[1270px]
            sm:w-[60vw]
            lg:w-[50vw]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}>

              <h1 className="p-4 border-b border-neutral-800 text-sm-movil 
              xs:p-5
              sm:p-5 sm:gap-5 sm:text-xl-tablet
              md:p-6 md:gap-6
              lg:p-5 lg:text-lg
              xl:text-lg-desktop
              2xl:p-6 3xl:p-7 4xl:p-9">
                Set a expiration date for <span className="font-medium">{shortLink}</span>
              </h1>

              <form onSubmit={handleSubmit}>

                {/* Date Input Section */}
                <section className="p-4 flex flex-col gap-4 border-b border-neutral-800 text-sm-movil
                xs:p-5 xs:gap-5
                sm:text-xl-tablet
                md:p-6 md:pt-8 md:gap-6
                lg:p-5 lg:gap-5 lg:text-lg
                xl:text-lg-desktop
                2xl:p-6 2xl:gap-6
                3xl:p-7 3xl:gap-7
                4xl:p-9 4xl:gap-9">

                  {/* Day Picker */}
                  <DatePicker onChange={(e) => setExpirationDate(e)} />

                  {/* Hour Picker */}
                  <div className="p-2 px-3 rounded-lg border border-neutral-800  
                  xs:p-3 xs:px-4
                  sm:p-4 sm:px-5
                  lg:p-3 lg:gap-3
                  2xl:p-4 2xl:gap-4
                  3xl:p-5 3xl:gap-5
                  4xl:p-7 4xl:gap-7">
                    <input type="time" className="w-full text-white bg-transparent"
                      required
                      onChange={(e) => {
                        setExpirationHour(e.currentTarget.value)
                      }} />
                  </div>

                  {/* Final Expiration Date */}
                  <p className="text-sm-movil text-neutral-400 sm:text-lg-tablet 
                  lg:text-lg xl:text-lg-desktop">
                    {expirationDate ? 
                      "Your link will expire on " + expirationDate.toLocaleDateString() + 
                      (expirationHour && " at " + expirationHour) 
                      : 
                      ""
                    } 
                  </p>
                </section>

                {/* Buttons Section */}
                <div className="p-4 flex gap-4 items-center text-sm-movil
                xs:p-5 xs:gap-5
                sm:p-6 sm:gap-6 sm:text-xl-tablet
                md:p-7 md:gap-7 
                lg:p-5 lg:gap-5 lg:text-base
                xl:text-base-desktop
                2xl:p-6 2xl:gap-6
                3xl:p-7 3xl:gap-7
                4xl:p-9 4xl:gap-9 ">

                  <button className="p-2 px-3 flex items-center gap-2 rounded-lg bg-neutral-900 cursor-pointer
                  xs:p-2.5 xs:px-4 
                  sm:p-3 sm:px-4
                  lg:p-2 lg:px-4
                  2xl:p-2.5 2xl:px-4
                  3xl:p-3 3xl:px-4
                  4xl:p-4 4xl:px-5 "
                    type="button"
                    disabled={submiting}
                    onClick={() => {
                      setExpirationDate(undefined)
                      setExpirationHour("")
                      toggleSetLinkExpirationModal()
                    }}>
                    <IconX className="size-4 xs:size-5 md:size-6 lg:size-5 
                    2xl:size-6 3xl:size-7 4xl:size-9" />
                    Close
                  </button>

                  <button className="p-2 px-3 flex items-center gap-2 rounded-lg bg-sky-600 disabled:opacity-30 cursor-pointer
                  xs:p-2.5 xs:px-4 
                  sm:p-3 sm:px-4
                  lg:p-2 lg:px-4
                  2xl:p-2.5 2xl:px-4
                  3xl:p-3 3xl:px-4
                  4xl:p-4 4xl:px-5 "
                    type="button"
                    disabled={submiting}>
                    {
                      submiting ?
                        <IconLoader2 className="size-4 animate-spin xs:size-5 md:size-6 lg:size-5 
                        2xl:size-6 3xl:size-7 4xl:size-9" /> :

                        <IconCheck className="size-4 xs:size-5 md:size-6 lg:size-5 
                        2xl:size-6 3xl:size-7 4xl:size-9" />
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
  )
}