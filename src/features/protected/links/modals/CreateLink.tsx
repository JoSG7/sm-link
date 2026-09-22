"use client"

import ModalLayout from "@/components/modals/ModalLayout"
import { AnimatePresence } from "framer-motion"
import { SubmitEvent, useState } from "react"
import { motion } from "framer-motion"
import { IconCalendar, IconCheck, IconEditCircle, IconLoader, IconLock, IconPaperclip, IconPlus } from "@tabler/icons-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { LinkServices } from "@/services/link.service"


interface CreateSmLinkModalProps {
  isOpen: boolean
  isAuthenticated: boolean
  onClose: () => void
}

export function CreateSmLinkModal({ isOpen, isAuthenticated, onClose }: CreateSmLinkModalProps) {

  const [submiting, setSubmiting] = useState(false)
  const [original, setOriginal] = useState("")
  const [short, setShort] = useState("")
  const [password, setPassword] = useState("")
  const [expirationDate, setExpirationDate] = useState("")
  const router = useRouter()

  const handleCreate = async (e: SubmitEvent) => {

    e.preventDefault()

    const payload = { original, short: isAuthenticated ? short : undefined }
    const service = new LinkServices()

    try {

      setSubmiting(true)

      const { data } = await service.createSmLink(payload)

      if (!data) return

      const extraPromises: Promise<unknown>[] = []

      if (password.trim() !== "") {
        extraPromises.push(
          service.protected.createPassword(
            {
              short: data,
              password
            }
          )
        )
      }

      if (expirationDate.trim() !== "") {
        const [year, month, day] = expirationDate.split("-").map(Number)
        const fullDate = new Date(year, month - 1, day).toISOString()

        extraPromises.push(
          service.expiration.createExpiration({
            short: data,
            expiresAt: fullDate,
          })
        )
      }

      if (extraPromises.length > 0) {
        await Promise.all(extraPromises)
      }

      setShort("")
      setPassword("")
      setExpirationDate("")
      toast.success("Success")
      onClose()
      router.refresh()

    } catch (e) {

      toast.error((e as Error).message)

    } finally {

      setSubmiting(false)

    }
  }


  return (

    <ModalLayout>
      <AnimatePresence>
        {
          isOpen && (
            <motion.section className={`fixed inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm
            ${submiting && "pointer-events-none"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onClose()}>

              <motion.form className="flex w-[90vw] max-h-[90vh] min-h-0 max-w-145 flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 sm:w-[80vw] lg:w-[70vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.1 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleCreate}>

                <header className="flex shrink-0 items-center justify-between gap-4 border-b border-neutral-800 px-5 p-4 sm:py-5 sm:px-6">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="rounded-lg border border-sky-500/30 bg-sky-500/10 p-2.5">
                      <IconPlus className="size-5 text-sky-400" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-300">Link shortener</p>
                      <h1 className="truncate text-lg font-semibold text-white sm:text-xl">Create SmLink</h1>
                    </div>
                  </div>

                  <button
                    className="flex shrink-0 items-center gap-2 rounded-lg bg-linear-to-b from-sky-500 to-sky-500/50 px-3 py-2 text-sm font-semibold text-white transition-colors hover:from-sky-400 hover:to-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={submiting}
                  >
                    {submiting ? <IconLoader className="size-4 animate-spin" /> : <IconCheck className="size-4" />}
                    <span className="hidden sm:inline">Create</span>
                  </button>
                </header>

                <section className="min-h-0 flex-1 overflow-y-auto p-6">
                  <div className="flex flex-col gap-4">
                    <div className="pb-1">
                      <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">ORIGINAL URL</h2>
                      <p className="text-sm text-neutral-500">Set the destination for your SmLink.</p>
                    </div>

                    <article className="flex items-center rounded-lg border-1.5 border-neutral-800 bg-neutral-900/80 text-sm focus-within:border-sky-600">
                      <IconPaperclip className="ml-3 size-5 text-neutral-500" />

                      <input
                        className="grow bg-transparent p-2.5 outline-none"
                        type="url"
                        required
                        placeholder="https://example.com/long-url-to-short"
                        onChange={(e) => setOriginal(e.currentTarget.value)} />
                    </article>

                    {isAuthenticated && (
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <article className="flex flex-1 items-center rounded-lg border-1.5 border-neutral-800 bg-neutral-900/80 text-sm focus-within:border-sky-600">
                          <IconEditCircle className="ml-3 size-5 text-neutral-500" />

                          <input
                            className="grow bg-transparent p-2.5 outline-none"
                            type="text"
                            maxLength={20}
                            placeholder="Maximum 20 characters"
                            onChange={(e) => setShort(e.currentTarget.value.trim().replace(/\s+/g, ""))} />
                        </article>

                        <div className="rounded-lg border-1.5 border-sky-500/20 bg-sky-500/10 p-2.5 text-sm text-sky-400 sm:shrink-0">
                          Customize the short version
                        </div>
                      </div>
                    )}

                    <div className="py-1">
                      <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">ACCESS OPTIONS - OPTIONAL</h2>
                      <p className="text-sm text-neutral-500">Set the password or expiration for your SmLink. </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <article className="flex grow items-center rounded-lg border-1.5 border-neutral-800 bg-neutral-900/80 text-sm focus-within:border-sky-600">
                        <IconLock className="ml-3 size-5 text-neutral-500" />

                        <input
                          className="grow bg-transparent p-2.5 outline-none"
                          type="password"
                          placeholder="No spaces"
                          onChange={(e) => setPassword(e.currentTarget.value.replace(/\s+/g, ""))} />
                      </article>

                      <article className="flex grow items-center rounded-lg border-1.5 border-neutral-800 bg-neutral-900/80 text-sm focus-within:border-sky-600">
                        <IconCalendar className="ml-3 size-5 text-neutral-500" />

                        <input
                          className="grow bg-transparent p-2.5 outline-none"
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          max="2026-12-31"
                          value={expirationDate}
                          onChange={(e) => setExpirationDate(e.currentTarget.value)} />
                      </article>
                    </div>
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