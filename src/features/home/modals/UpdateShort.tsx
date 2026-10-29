"use client"

import ModalLayout from "@/components/modals/ModalLayout"
import { LinkServices } from "@/services/link.service"
import { recordChange } from "@/store/link-changes-slice"
import { AnimatePresence, motion } from "framer-motion"
import { IconCheck, IconLink, IconLoader } from "@tabler/icons-react"
import { SubmitEvent, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

interface UpdateShortModalProps {
  isOpen: boolean
  short: string
  onClose: () => void
}

const shortPattern = /^[a-zA-Z0-9_-]{1,19}$/

export function UpdateShortModal({ isOpen, short, onClose }: UpdateShortModalProps) {
  const [newShort, setNewShort] = useState(short)
  const [submitting, setSubmitting] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isOpen) setNewShort(short)
  }, [isOpen, short])

  const normalizedShort = newShort.trim()
  const isValid = shortPattern.test(normalizedShort)
  const hasChanges = normalizedShort !== short

  const handleUpdate = async (event: SubmitEvent) => {
    event.preventDefault()
    if (!isValid || !hasChanges) return

    setSubmitting(true)

    try {
      const { data } = await new LinkServices().updateSmLink({ short, newShort: normalizedShort })
      dispatch(recordChange())
      toast.success(`Short link updated to ${data}`)
      onClose()
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
            className={`fixed inset-0 z-30 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm ${submitting ? "pointer-events-none" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.form
              className="w-full max-w-md overflow-hidden rounded-2xl border border-subtle bg-neutral-950"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.12 }}
              onClick={event => event.stopPropagation()}
              onSubmit={handleUpdate}
            >
              <header className="flex items-center justify-between gap-4 border-b border-neutral-800 px-5 py-4 sm:px-6 sm:py-5">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-2.5 text-blue-300">
                    <IconLink className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-300">Short link</p>
                    <h1 className="truncate text-lg font-semibold text-neutral-100">Edit short link</h1>
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex shrink-0 items-center gap-2 rounded-lg bg-linear-to-r from-green-500 to-blue-700 px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={submitting || !isValid || !hasChanges}
                >
                  {submitting ? <IconLoader className="size-4 animate-spin" /> : <IconCheck className="size-4" />}
                  <span>Save</span>
                </button>
              </header>

              <section className="flex flex-col gap-4 p-5 sm:p-6">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">SHORT LINK DETAILS</h2>
                  <p className="mt-1 text-sm text-neutral-500">Choose a unique alias for this link.</p>
                </div>

                <label className="flex items-center rounded-lg border border-neutral-800 bg-neutral-900/80 text-sm transition-colors focus-within:border-blue-400">
                  <input
                    className="min-w-0 grow bg-transparent p-3 text-neutral-100 outline-none placeholder:text-neutral-600"
                    aria-label="Short link alias"
                    autoComplete="off"
                    autoCapitalize="none"
                    maxLength={19}
                    pattern="[A-Za-z0-9_-]{1,19}"
                    required
                    value={newShort}
                    onChange={event => setNewShort(event.currentTarget.value)}
                  />
                </label>

                <p className="text-xs text-neutral-500">Use 1–19 letters, numbers, hyphens, or underscores.</p>
              </section>
            </motion.form>
          </motion.section>
        )}
      </AnimatePresence>
    </ModalLayout>
  )
}