"use client"

import ModalLayout from "@/components/modals/ModalLayout"
import { LinkServices } from "@/services/link.service"
import { AnimatePresence, motion } from "framer-motion"
import { type SubmitEvent, useState } from "react"
import { IconCheck, IconLoader, IconTrash } from "@tabler/icons-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface DeleteSelectedLinksModalProps {
  isOpen: boolean
  shorts: string[]
  onClose: () => void
  onDeleted: () => void
}

export function DeleteSelectedLinksModal({ isOpen, shorts, onClose, onDeleted }: DeleteSelectedLinksModalProps) {
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const linkCount = shorts.length

  const handleDelete = async (event: SubmitEvent) => {
    event.preventDefault()
    setSubmitting(true)

    try {
      await Promise.all(shorts.map(short => new LinkServices().deleteSmLink(short)))
      toast.success(`${linkCount} ${linkCount === 1 ? "link" : "links"} deleted`)
      onDeleted()
      onClose()
      router.refresh()
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <ModalLayout>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            className={`fixed inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm ${submitting ? "pointer-events-none" : ""}`}
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
              transition={{ duration: 0.1 }}
              onClick={event => event.stopPropagation()}
              onSubmit={handleDelete}
            >
              <div className="pointer-events-none absolute -right-12 -top-12 -z-10 size-25 rounded-full bg-linear-to-br from-red-500/15 via-rose-500/10 to-transparent blur-2xl transition duration-300 group-hover:scale-125" />

              <header className="flex items-center gap-4 pb-5">
                <div className="rounded-lg border border-red-500/30 bg-red-500/20 p-2">
                  <IconTrash className="size-6 text-red-400" />
                </div>

                <div>
                  <h1 className="font-medium">Delete selected links?</h1>
                  <p className="text-xs text-neutral-400">
                    This will permanently delete {linkCount} {linkCount === 1 ? "link" : "links"}.
                  </p>
                </div>
              </header>

              <div className="flex justify-start text-sm">
                <button
                  className="flex items-center gap-2 rounded-lg bg-linear-to-b from-red-500 to-red-600/50 px-4 py-2 disabled:opacity-30"
                  type="submit"
                  disabled={submitting || linkCount === 0}
                >
                  {submitting ? <IconLoader className="size-4 animate-spin" /> : <IconCheck className="size-4" />}
                  {submitting ? "Deleting..." : "Delete selected"}
                </button>
              </div>
            </motion.form>
          </motion.section>
        )}
      </AnimatePresence>
    </ModalLayout>
  )
}
