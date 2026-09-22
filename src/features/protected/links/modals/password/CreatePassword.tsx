"use client"

import ModalLayout from "@/components/modals/ModalLayout";
import { AnimatePresence } from "framer-motion";
import { SubmitEvent, useState } from "react";
import { motion } from "framer-motion";
import { IconCheck, IconKey, IconLoader, IconLockCheck, IconLockFilled } from "@tabler/icons-react";
import { toast } from "sonner";
import { LinkServices } from "@/services/link.service";
import { useRouter } from "next/navigation";

interface CreateUserLinkPasswordModalProps {
  isOpen: boolean
  short: string
  onClose: () => void
}

export function CreatePasswordModal({ isOpen, short, onClose }: CreateUserLinkPasswordModalProps) {

  const [submiting, setSubmiting] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()

  const handleCreate = async (e: SubmitEvent) => {

    e.preventDefault()

    if (confirmPassword == password) {

      setSubmiting(true)

      try {

        const { data } = await new LinkServices().protected.createPassword({ short, password })
        toast.success(data)
        router.refresh()

      } catch (e) {

        toast.error((e as Error).message)

      } finally {

        onClose()
        setSubmiting(false)

      }

    } else {

      toast.error("Passwords don't match")

    }
  }


  return (

    <ModalLayout>
      <AnimatePresence>
        {
          isOpen && (

            <motion.section className={`fixed inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm ${submiting && "pointer-events-none"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setPassword("")
                setConfirmPassword("")
                onClose()
              }}>

              <motion.form className="flex w-[90vw] max-h-[90vh] min-h-0 max-w-145 flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 sm:w-[80vw] lg:w-[70vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.1 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleCreate}>

                <header className="flex shrink-0 items-center justify-between gap-4 border-b border-neutral-800 px-5 p-4 sm:py-5 sm:px-6">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-2.5">
                      <IconLockFilled className="size-5 text-green-400" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-green-300">Password protection</p>
                      <h1 className="truncate text-lg font-semibold text-white sm:text-xl">Add password</h1>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex shrink-0 items-center gap-2 rounded-lg bg-linear-to-b from-green-500 to-green-500/50 px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={submiting}
                  >
                    {submiting ? <IconLoader className="size-4 animate-spin" /> : <IconCheck className="size-4" />}
                    <span className="hidden sm:inline">Create</span>
                  </button>
                </header>

                <section className="min-h-0 flex-1 overflow-y-auto p-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">PASSWORD DETAILS</h2>
                      <p className="text-sm text-neutral-500">Set a password to protect this SmLink.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      <article className="flex grow items-center rounded-lg border-1.5 border-neutral-800 bg-neutral-900/80 text-sm focus-within:border-green-600">
                        <IconKey className="ml-3 size-5 text-neutral-500" />

                        <input className="grow bg-transparent p-2.5 outline-none"
                          type="password"
                          required
                          placeholder="New password"
                          onChange={(e) => setPassword(e.currentTarget.value)} />
                      </article>

                      <article className="flex grow items-center rounded-lg border-1.5 border-neutral-800 bg-neutral-900/80 text-sm focus-within:border-green-600">
                        <IconLockCheck className="ml-3 size-5 text-neutral-500" />

                        <input className="grow bg-transparent p-2.5 outline-none"
                          type="password"
                          required
                          placeholder="Confirm new password"
                          onChange={(e) => setConfirmPassword(e.currentTarget.value)} />
                      </article>
                    </div>

                    <p className="rounded-lg border-1.5 border-green-500/30 bg-green-500/10 p-2.5 text-sm text-green-300">
                      This link will require a password to open.
                    </p>
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