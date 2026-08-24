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

            <motion.section className={`fixed inset-0 z-30 bg-black/80 flex items-center justify-center backdrop-blur-sm ${submiting && "pointer-events-none"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setPassword("")
                setConfirmPassword("")
                onClose()
              }}>

              <motion.form className="w-[90vw] p-6 bg-neutral-950 rounded-2xl border border-neutral-800 max-w-150 sm:w-[70vw] lg:w-[50vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.1 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleCreate}>

                <header className="pb-4 flex items-center gap-4 ">
                  <div className="p-2 rounded-lg border border-green-500/30 bg-green-500/20">
                    <IconLockFilled className="size-6 text-green-400" />
                  </div>

                  <div>
                    <h1 className="font-medium">Add Password</h1>
                    <p className="text-xs text-neutral-400">{short}</p>
                  </div>
                </header>

                <section className="py-2 flex flex-col gap-4">

                  <article className="flex items-center text-sm grow">
                    <div className="p-2.5 rounded-s-lg border-1.5 border-e-0 border-neutral-800 bg-neutral-900/80">
                      <IconKey className="size-5" />
                    </div>

                    <input className="grow p-2.5 rounded-e-lg border-1.5 border-neutral-800 bg-neutral-900/80
                      focus:border-green-600"
                      type="password"
                      required
                      placeholder="New password"
                      onChange={(e) => setPassword(e.currentTarget.value)} />
                  </article>

                  <article className="flex items-center text-sm grow">
                    <div className="p-2.5 rounded-s-lg border-1.5 border-e-0 border-neutral-800 bg-neutral-900/80">
                      <IconLockCheck className="size-5" />
                    </div>

                    <input className="grow p-2.5 rounded-e-lg border-1.5 border-neutral-800 bg-neutral-900/80
                      focus:border-green-600"
                      type="password"
                      required
                      placeholder="Confirm password"
                      onChange={(e) => setConfirmPassword(e.currentTarget.value)} />
                  </article>

                  <p className="p-2.5 rounded-lg text-sm text-green-300 border-1.5 border-green-500/30 bg-green-500/20">
                    This link will require a password to open
                  </p>

                </section>

                <div className="pt-4 flex justify-start">
                  <button className="py-2 px-4 flex items-center gap-2 text-sm rounded-lg cursor-pointer
                  disabled:opacity-50 bg-linear-to-b from-green-500 to-green-500/50"
                    disabled={submiting}>
                    {submiting ? <IconLoader className="size-3 animate-spin" /> : <IconCheck className="size-3" />}
                    Create
                  </button>
                </div>
              </motion.form>
            </motion.section>

          )
        }
      </AnimatePresence>
    </ModalLayout>
  )
}