"use client"

import ModalLayout from "@/components/modals/ModalLayout"
import { IconAlarm, IconCheck, IconLoader } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { SubmitEvent, useState } from "react"
import { toast } from "sonner"
import { LinkServices } from "@/services/link.service"
import { useRouter } from "next/navigation"

interface DeleteExpirationModalProps {
  isOpen: boolean
  short: string
  onClose: () => void
}

export function DeleteExpirationModal({ isOpen, short, onClose }: DeleteExpirationModalProps) {
  const [submiting, setSubmiting] = useState(false)
  const router = useRouter()

  const handleDelete = async (e: SubmitEvent) => {
    e.preventDefault()
    setSubmiting(true)

    try {
      const { data } = await new LinkServices().expiration.deleteExpiration(short)
      toast.success(data)
      router.refresh()
      onClose()
    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setSubmiting(false)
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
            onClick={onClose}
          >
            <motion.form
              className="group relative isolate w-[90vw] max-w-96 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 p-5 sm:w-[70vw] lg:w-[50vw]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleDelete}
            >
              <div className="pointer-events-none absolute -right-12 -top-12 -z-10 size-25 rounded-full bg-linear-to-br from-red-500/15 via-rose-500/10 to-transparent blur-2xl" />

              <header className="flex items-center gap-4 pb-4">
                <div className="rounded-lg border border-red-500/30 bg-red-500/20 p-2">
                  <IconAlarm className="size-6 text-red-400" />
                </div>
                <div>
                  <h1 className="font-medium">Remove expiration?</h1>
                  <p className="text-xs text-neutral-400">{short}</p>
                </div>
              </header>

              <div className="flex justify-start pt-4">
                <button className="flex items-center gap-2 rounded-lg bg-linear-to-b from-red-500 to-red-600/50 px-4 py-2 text-sm disabled:opacity-30" disabled={submiting}>
                  {submiting ? <IconLoader className="size-4 animate-spin" /> : <IconCheck className="size-4" />}
                  {submiting ? "Removing..." : "Remove"}
                </button>
              </div>
            </motion.form>
          </motion.section>
        )}
      </AnimatePresence>
    </ModalLayout>
  )
}
