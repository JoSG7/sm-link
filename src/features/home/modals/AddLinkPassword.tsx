import { AnimatePresence, motion } from "framer-motion"
import { useSetLinkPasswordModal } from "../hooks/useModals"
import { IconCheck, IconLoader2, IconLock, IconLockCheck, IconX } from "@tabler/icons-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { createProtectedLink } from "../utils/guest-links"
import { useLinkChanges } from "../hooks/useLinkChanges"

export function AddLinkPasswordModal() {

  const [submiting, setSubmiting] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { shortLink, isSetLinkPasswordOpen, toggleSetLinkPasswordModal } = useSetLinkPasswordModal()
  const { recordLinkChanges } = useLinkChanges()

  const handleCreate = (e: FormEvent) => {
    e.preventDefault()

    if (password != confirmPassword) {
      toast.error("The passwords not match, try again")
    } else if (shortLink) {
      setSubmiting(true)

      createProtectedLink(shortLink, password).then(res => {
        if (res.error) {
          toast.error(res.error)
        } else {
          recordLinkChanges()
          toast.success(res.response)
        }
      })
        .finally(() => {
          setSubmiting(false)
          toggleSetLinkPasswordModal()
        })
    }
  }

  return (
    <AnimatePresence>
      {
        isSetLinkPasswordOpen && (
          <motion.section className="fixed inset-0 z-30 bg-[rgba(0,0,0,0.8)] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <motion.div className="w-[90vw] bg-neutral-950 rounded-xl border border-neutral-800 
            xl:w-[50vw]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}>

              {/* Title */}
              <h1 className="p-4 text-sm-movil border-b border-neutral-800 
              xs:p-5">
                Add protection to <span className="font-semibold">{shortLink}</span>
              </h1>

              <form onSubmit={handleCreate}>
                <div className="p-4 flex flex-col gap-4 border-b border-neutral-800 
                xs:p-5 xs:gap-5">

                  {/* Input Password */}
                  <div className="p-2 text-xs-movil flex items-center gap-2 rounded-lg bg-neutral-900 
                  xs:p-3 xs:gap-3">
                    <IconLock className="size-5 xs:size-6" />

                    <input className="w-full bg-transparent placeholder:text-neutral-700 "
                      placeholder="Enter a password" 
                      type="password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)} />
                  </div>

                  {/* Repeat Password */}
                  <div className="p-2 text-xs-movil flex items-center gap-2 rounded-lg bg-neutral-900 
                  xs:p-3 xs:gap-3">
                    <IconLockCheck className="size-5 xs:size-6" />

                    <input className="w-full bg-transparent placeholder:text-neutral-700 "
                      placeholder="Confirm the password" 
                      type="password" 
                      required 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.currentTarget.value)} />
                  </div>
                </div>

                {/* Buttons Section */}
                <div className="p-4 flex gap-4 items-center
                xs:p-5">
                  <button className="p-2 px-3 text-xs-movil flex items-center gap-2 rounded-lg bg-neutral-900 disabled:opacity-50 
                  xs:p-3 xs:px-4 xs:gap-3"
                    onClick={() => { toggleSetLinkPasswordModal() }} disabled={submiting} type="button">
                    <IconX className="size-4" />
                    Cancelar
                  </button>

                  <button className="p-2 px-3 text-xs-movil flex items-center gap-2 rounded-lg bg-green-700 disabled:opacity-50 
                  xs:p-3 xs:px-4 xs:gap-3"
                    disabled={submiting} >
                    {submiting ? 
                    <IconLoader2 className="size-4 animate-spin xs:size-5" /> : 
                    <IconCheck className="size-4 xs:size-5" />}
                    {submiting ? "Protecting..." : "Protect"}
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
