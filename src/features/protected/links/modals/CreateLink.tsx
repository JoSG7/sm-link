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
            <motion.section className={`fixed inset-0 z-30 bg-[rgba(0,0,0,0.8)] flex items-center justify-center backdrop-blur-sm
            ${submiting && "pointer-events-none"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onClose()}>

              <motion.form className="w-[90vw] p-6 bg-neutral-950 rounded-2xl border border-neutral-800 max-w-150
              sm:w-[80vw] lg:w-[70vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.1 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleCreate}>

                <header className="pb-4 flex items-center gap-4 ">
                  <div className="p-2 rounded-lg border border-sky-500/30 bg-sky-500/20">
                    <IconPlus className="size-5 text-sky-400" />
                  </div>

                  <h1 className="font-medium text-lg">Create new SmLink</h1>
                </header>

                <section className="py-2 flex flex-col gap-4">

                  <article className="flex items-center text-sm">
                    <div className="p-2.5 rounded-s-lg border-1.5 border-e-0 border-neutral-800 bg-neutral-900/80">
                      <IconPaperclip className="size-5" />
                    </div>

                    <input className="grow p-2.5 rounded-e-lg border-1.5 border-neutral-800 bg-neutral-900/80
                    focus:border-sky-600"
                      type="url"
                      required
                      placeholder="https://example.com/long-url-to-short"
                      onChange={(e) => setOriginal(e.currentTarget.value)} />
                  </article>

                  {isAuthenticated && (
                    <div className="flex gap-4">
                      <article className="flex items-center text-sm grow">
                        <div className="p-2.5 rounded-s-lg border-1.5 border-e-0 border-neutral-800 bg-neutral-900/80">
                          <IconEditCircle className="size-5" />
                        </div>

                        <input className="p-2.5 rounded-e-lg border-1.5 border-neutral-800 bg-neutral-900/80 grow
                          focus:border-sky-600"
                          type="text"
                          maxLength={20}
                          placeholder="Max 20 characters"
                          onChange={(e) => setShort(e.currentTarget.value.trim().replace(/\s+/g, ""))} />
                      </article>

                      <div className="p-2.5 rounded-lg border border-sky-500/30 bg-sky-500/20 text-sm text-sky-400">
                        Customize the short version
                      </div>
                    </div>
                  )}

                  <h1 className="font-medium text-gray-300">Set a Password and Expiration (Optional)</h1>

                  <div className="grid grid-cols-2 gap-4">

                    <article className="flex items-center text-sm grow">
                      <div className="p-2.5 rounded-s-lg border-1.5 border-e-0 border-neutral-800 bg-neutral-900/80">
                        <IconLock className="size-5" />
                      </div>

                      <input className="p-2.5 rounded-e-lg border-1.5 border-neutral-800 bg-neutral-900/80 grow
                      focus:border-sky-600"
                        type="password"
                        placeholder="No whitespaces"
                        onChange={(e) => setPassword(e.currentTarget.value.replace(/\s+/g, ""))} />
                    </article>

                    <article className="flex items-center text-sm grow">
                      <div className="p-2.5 rounded-s-lg border-1.5 border-e-0 border-neutral-800 bg-neutral-900/80">
                        <IconCalendar className="size-5" />
                      </div>

                      <input className="p-2.5 rounded-e-lg border-1.5 border-neutral-800 bg-neutral-900/80
                      focus:border-sky-600 grow"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        max={"2026-12-31"}
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.currentTarget.value)} />
                    </article>

                  </div>
                </section>

                <div className="pt-4 flex justify-start">
                  <button className="py-2 px-4 flex items-center gap-2 text-sm rounded-lg cursor-pointer
                    disabled:opacity-50 bg-linear-to-b from-sky-500 to-sky-500/50"
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