"use client"


import { AnimatePresence, motion } from "framer-motion"
import { IconCheck, IconLoader2, IconLock, IconLockCheck } from "@tabler/icons-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { GuestLinkServices } from "../services/guest-link.service"
import ModalLayout from "@/features/shared/modals/ModalLayout"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store-config"
import { toggleSetPassword } from "@/store/modal-slice"
import { recordChange } from "@/store/link-changes-slice"


export function AddLinkPasswordModal() {

  const [submiting, setSubmiting] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()
  const { isOpen, shortLink } = useSelector(
    (state: RootState) => state.modals.setPassword
  )


  const handleCreate = (e: FormEvent) => {
    e.preventDefault()

    if (password != confirmPassword) {
      toast.error("The passwords not match, try again")
    } else if (shortLink) {

      setSubmiting(true)
      const guestLinkServices = new GuestLinkServices()

      guestLinkServices.protected.createLink(shortLink, password)
        .then(res => {

          if (res.error) {
            toast.error(res.error)
          } else {
            setPassword("")
            setConfirmPassword("")
            dispatch(recordChange())
            toast.success(res.response)
          }

        })
        .finally(() => {
          setSubmiting(false)
          dispatch(toggleSetPassword())
        })

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
                setPassword("")
                setConfirmPassword("")
                dispatch(toggleSetPassword())
              }}>

              <motion.div className="w-[90vw] bg-neutral-950 rounded-xl border border-neutral-800 max-w-xl
              sm:w-[80vw] lg:w-[50vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}>

                {/* Title */}
                <h1 className="p-4 text-sm border-b border-neutral-800 ">
                  Add protection to <span className="font-semibold">{shortLink}</span>
                </h1>

                {/* Form */}
                <form onSubmit={handleCreate}>

                  {/* Inputs Container */}
                  <section className="p-4 flex flex-col gap-4 text-xs border-b border-neutral-800 ">

                    {/* Input Password */}
                    <div className="p-2 flex items-center gap-2 rounded-lg bg-neutral-900 
                    sm:p-3">

                      <IconLock className="size-5 " />
                      <input className="w-full bg-transparent placeholder:text-neutral-700 "
                        placeholder="Enter a password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)} />

                    </div>

                    {/* Repeat Password */}
                    <div className="p-2 flex items-center gap-2 rounded-lg bg-neutral-900 
                    sm:p-3">

                      <IconLockCheck className="size-5 " />
                      <input className="w-full bg-transparent placeholder:text-neutral-700 "
                        placeholder="Confirm the password"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.currentTarget.value)} />
                    </div>

                  </section>

                  {/* Button Section */}
                  <section className="p-4 flex gap-4 items-center text-xs ">

                    <button className="p-2 px-3 flex items-center gap-2 rounded-sm bg-green-700 disabled:opacity-50 cursor-pointer "
                      disabled={submiting}>

                      {
                        submiting ?
                          <IconLoader2 className="size-4 animate-spin " /> :

                          <IconCheck className="size-4 " />
                      }
                      {submiting ? "Protecting..." : "Protect"}

                    </button>
                  </section>
                </form>
              </motion.div>
            </motion.section>
          )
        }
      </AnimatePresence>
    </ModalLayout>
  )
}
