import { ExpirationCalendar } from "@/components/shared/Calendar"
import { useSetLinkExpiration } from "@/hooks/useModal"
import { addLinkExpiration } from "@/utils/links/api"
import { IconLoader2 } from "@tabler/icons-react"
// import { IconClockCheck, IconLoader2 } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

export function SetLinkExpirationModal() {

  const [submiting, setSubmiting] = useState(false)
  const [expires_at, setExpires_at] = useState("")
  const { short, linkExpirationModal, toggleLinkExpirationModal } = useSetLinkExpiration()


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if(expires_at == ""){
      toast.error("Please, enter a valid date")
    } else if(short) {
      setSubmiting(true)
      await addLinkExpiration(short, expires_at).then(res => {
        if(res.error){
          toast.error(res.error)
        } else {
          toast.success(res.response)
        }
      })
      .finally(() => setSubmiting(false))
    }
  }

  return (

    <AnimatePresence>
      {
        linkExpirationModal && (
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
                Set a expiration date for <span className="font-medium">{short}</span>
              </h1>

              <form onSubmit={handleSubmit}>
                {/* Date Input Section */}
                <div className="p-4 flex flex-col gap-4 border-b border-neutral-900 text-white">
                  <ExpirationCalendar onChange={(value) => {
                    setExpires_at(value)
                    console.log(value)
                  }} />
                </div>

                {/* Buttons Section */}
                <div className="p-4 flex gap-4 items-center text-sm">
                  <button className="py-1 px-3 text-center bg-neutral-900 rounded-lg disabled:opacity-50"
                    onClick={() => { toggleLinkExpirationModal() }} type="button" disabled={submiting}>
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