"use client"


import { AnimatePresence, motion } from "framer-motion"
import { IconCheck, IconKey, IconLoader, IconLockCheck, IconLockFilled } from "@tabler/icons-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import ModalLayout from "@/components/modals/ModalLayout"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store-config"
import { toggleSetPassword } from "@/store/modal-slice"
import { recordChange } from "@/store/link-changes-slice"
import { LinkServices } from "@/services/link.service"


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

        const { data } = await new LinkServices().protected.createPassword({ short: shortLink, password })
        setPassword("")
        setConfirmPassword("")
        dispatch(recordChange())
        toast.success(data)

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
        {isOpen && (
          <motion.section
            className={`fixed inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm ${submiting && "pointer-events-none"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setPassword("")
              setConfirmPassword("")
              dispatch(toggleSetPassword())
            }}
          >
            <motion.form
              className="w-[90vw] rounded-xl border border-neutral-800 bg-neutral-950 p-5 sm:w-[70vw] lg:w-[50vw]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleCreate}
            >
              <header className="flex items-center gap-4 pb-4">
                <div className="rounded-lg border border-green-500/30 bg-green-500/20 p-2">
                  <IconLockFilled className="size-6 text-green-400" />
                </div>

                <div>
                  <h1 className="font-medium">Add Password</h1>
                  <p className="text-xs text-neutral-400">{shortLink}</p>
                </div>
              </header>

              <section className="flex flex-col gap-4 py-2">
                <div className="flex gap-4">
                  <article className="flex grow items-center text-sm">
                    <div className="rounded-s-lg border-1.5 border-e-0 border-neutral-800 bg-neutral-900/80 p-2.5">
                      <IconKey className="size-5" />
                    </div>

                    <input
                      className="grow rounded-e-lg border-1.5 border-neutral-800 bg-neutral-900/80 p-2.5 focus:border-green-600"
                      type="password"
                      required
                      placeholder="New password"
                      onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                  </article>

                  <article className="flex grow items-center text-sm">
                    <div className="rounded-s-lg border-1.5 border-e-0 border-neutral-800 bg-neutral-900/80 p-2.5">
                      <IconLockCheck className="size-5" />
                    </div>

                    <input
                      className="grow rounded-e-lg border-1.5 border-neutral-800 bg-neutral-900/80 p-2.5 focus:border-green-600"
                      type="password"
                      required
                      placeholder="Confirm new password"
                      onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                    />
                  </article>
                </div>

                <p className="rounded-lg border-1.5 border-green-500/30 bg-green-500/20 p-2.5 text-sm text-green-300">
                  This link will require a password to open
                </p>
              </section>

              <div className="flex justify-start pt-4">
                <button
                  className="flex items-center gap-2 rounded-lg bg-linear-to-b from-green-500 to-green-500/50 px-4 py-2 text-sm disabled:opacity-50"
                  type="submit"
                  disabled={submiting}
                >
                  {submiting ? <IconLoader className="size-3 animate-spin" /> : <IconCheck className="size-3" />}
                  Create
                </button>
              </div>
            </motion.form>
          </motion.section>
        )}
      </AnimatePresence>
    </ModalLayout>
  )
}


