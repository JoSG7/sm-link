import { useLinkChanges } from "@/hooks/useLinkChanges";
import { useAddPasswordModal } from "@/hooks/useModal";
import { createProtectedLink } from "@/utils/links/api";
import { IconCheck, IconLoader2, IconLock, IconLockCheck, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

export function CreatePwdLinkModal() {

  const [submiting, setSubmiting] = useState(false)
  const { isAddPasswordModalOpen, shortLink, toggleAddPasswordModal } = useAddPasswordModal()
  const { recordLinkChanges } = useLinkChanges()
  const pass = useRef<HTMLInputElement | null>(null)
  const confirmPass = useRef<HTMLInputElement | null>(null)

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault()

    const password = pass.current?.value
    const confirmPassword = confirmPass.current?.value
    
    setSubmiting(true)

    if (password && confirmPassword && shortLink) {
      if (password !== confirmPassword) {
        toast.error("The passwords don't match")
        setSubmiting(false)
      } else {
        await createProtectedLink(shortLink, password).then(res => {
          if(res.error){
            toast.error(res.error)
          } else {
            recordLinkChanges()
            toast.success(res.response)
          }
        })
        .finally(() => {
          setSubmiting(false)
          toggleAddPasswordModal()
        })
      }
    }
  }

  return (
    <AnimatePresence>
      {
        isAddPasswordModalOpen && (
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
                      placeholder="Enter a password" type="password" ref={pass} required />
                  </div>

                  <div className="flex items-center p-2 gap-2 bg-neutral-900 rounded-lg text-xs ">
                    <IconLockCheck className="size-4" />
                    <input className="w-full bg-transparent placeholder:text-neutral-700 lg-2:text-sm"
                      placeholder="Confirm the password" type="password" ref={confirmPass} required />
                  </div>
                </div>

                {/* Buttons Section */}
                <div className="p-4 flex gap-4 items-center">
                  <button className="flex items-center gap-1 p-2 pr-3 bg-neutral-900 rounded-xl text-xs lg-2:text-sm disabled:opacity-50"
                    onClick={() => { toggleAddPasswordModal() }} disabled={submiting} type="button">
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