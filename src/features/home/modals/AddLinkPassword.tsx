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
  const [confirmPassword, setConfirmPassword] = useState("xHstEndI")

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
            <motion.div className="w-[300px] bg-neutral-950 rounded-xl border border-neutral-900 lg-2:w-96"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}>

              {/* Title */}
              <h1 className="p-4 text-sm border-b border-neutral-900 lg-2:text-lg">
                Add protection to <span className="font-semibold">{shortLink}</span>
              </h1>

              <form onSubmit={handleCreate}>
                {/* Input section */}
                <div className="p-4 flex flex-col gap-4 border-b border-neutral-900">
                  <div className="flex items-center p-2 gap-2 bg-neutral-900 rounded-lg text-xs ">
                    <IconLock className="size-4" />
                    <input className="w-full bg-transparent placeholder:text-neutral-700 lg-2:text-sm"
                      placeholder="Enter a password" type="password" required value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)} />
                  </div>

                  <div className="flex items-center p-2 gap-2 bg-neutral-900 rounded-lg text-xs ">
                    <IconLockCheck className="size-4" />
                    <input className="w-full bg-transparent placeholder:text-neutral-700 lg-2:text-sm"
                      placeholder="Confirm the password" type="password" required value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.currentTarget.value)} />
                  </div>
                </div>

                {/* Buttons Section */}
                <div className="p-4 flex gap-4 items-center">
                  <button className="flex items-center gap-1 p-2 pr-3 bg-neutral-900 rounded-xl text-xs lg-2:text-sm disabled:opacity-50"
                    onClick={() => { toggleSetLinkPasswordModal() }} disabled={submiting} type="button">
                    <IconX className="size-3" />
                    Cancelar
                  </button>

                  <button className="flex items-center gap-1 p-2 pr-3 bg-green-700 rounded-xl text-xs lg-2:text-sm disabled:opacity-50"
                    disabled={submiting} >
                    {submiting ? <IconLoader2 className="size-3 animate-spin" /> : <IconCheck className="size-3" />}
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
