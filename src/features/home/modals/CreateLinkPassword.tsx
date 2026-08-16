"use client"


import { AnimatePresence, motion } from "framer-motion"
import { IconCheck, IconKey, IconLoader, IconLockCheck, IconLockFilled } from "@tabler/icons-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { GuestLinkServices } from "../../../services/guest-link.service"
import ModalLayout from "@/components/modals/ModalLayout"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store-config"
import { toggleSetPassword } from "@/store/modal-slice"
import { recordChange } from "@/store/link-changes-slice"


export function CreateLinkPasswordModal() {

  const [submiting, setSubmiting] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()
  const { isOpen, shortLink } = useSelector(
    (state: RootState) => state.modals.setPassword
  )


  const handleCreate = async (e: FormEvent) => {
    e.preventDefault()

    if (password != confirmPassword) {
      toast.error("The passwords not match, try again")
    } else if (shortLink) {

      setSubmiting(true)

      try {

        const { response } = await new GuestLinkServices().protected.createSmLinkPassword(shortLink, password)
        setPassword("")
        setConfirmPassword("")
        dispatch(recordChange())
        toast.success(response)

      } catch (e) {

        toast.error((e as Error).message)

      } finally {

        setSubmiting(false)
        dispatch(toggleSetPassword())

      }
    }
  }


  return (
    <ModalLayout>
      <AnimatePresence>
        {
          isOpen && (
            <motion.section className={`fixed inset-0 z-30 bg-black/80 flex items-center justify-center
            ${submiting && "pointer-events-none"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setPassword("")
                setConfirmPassword("")
                dispatch(toggleSetPassword())
              }}>

              <motion.form className="w-[90vw] bg-neutral-950 rounded-xl border border-neutral-800 max-w-[35rem]
              sm:w-[70vw] lg:w-[50vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleCreate}>

                <header className="p-4 flex items-center gap-4 lg:p-5">
                  <div className="p-2 rounded-lg border border-green-500/30 bg-green-500/20">
                    <IconLockFilled className="size-4 text-green-400 lg:size-6" />
                  </div>

                  <div>
                    <h1 className="text-sm font-medium lg:text-base">Add Password</h1>
                    <p className="text-xs text-neutral-400">{shortLink}</p>
                  </div>
                </header>

                <section className="p-4 pt-0 flex flex-col gap-4 lg:p-5 lg:pt-0">

                  <article className="flex items-center text-xs grow lg:text-sm">
                    <div className="p-2.5 rounded-s-lg border-1.5 border-e-0 border-neutral-800 bg-neutral-900/80">
                      <IconKey className="size-4 lg:size-5" />
                    </div>

                    <input className="grow p-2.5 rounded-e-lg border-1.5 border-neutral-800 bg-neutral-900/80
                      focus:border-green-600" 
                      type="password"
                      required
                      placeholder="New password"
                      onChange={(e) => setPassword(e.currentTarget.value)} />
                  </article>

                  <article className="flex items-center text-xs grow lg:text-sm">
                    <div className="p-2.5 rounded-s-lg border-1.5 border-e-0 border-neutral-800 bg-neutral-900/80">
                      <IconLockCheck className="size-4 lg:size-5" />
                    </div>

                    <input className="grow p-2.5 rounded-e-lg border-1.5 border-neutral-800 bg-neutral-900/80
                      focus:border-green-600"
                      type="password"
                      required
                      placeholder="Confirm new password"
                      onChange={(e) => setConfirmPassword(e.currentTarget.value)} />
                  </article>

                  <div className="flex flex-col gap-4 lg:flex-row-reverse">
                    <p className="p-2.5 rounded-lg text-xs text-green-300 border-1.5 border-green-500/30 bg-green-500/20
                    flex-1 lg:text-sm">
                      This link will require a password to open
                    </p>

                    <button className="max-w-max py-2 px-4 flex items-center gap-2 text-xs rounded-lg cursor-pointer
                    disabled:opacity-50 bg-gradient-to-b from-green-500 to-green-500/50 lg:text-sm"
                      disabled={submiting}>
                      {submiting ? <IconLoader className="size-4 animate-spin" /> : <IconCheck className="size-4" />}
                      Create
                    </button>
                  </div>

                </section>
              </motion.form>
            </motion.section>
          )
        }
      </AnimatePresence>
    </ModalLayout>
  )
}



