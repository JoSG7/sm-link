"use client"

import ModalLayout from "@/features/shared/modals/ModalLayout"
import { RootState } from "@/store/store-config"
import { AnimatePresence } from "framer-motion"
import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { IconCheck, IconEditCircle, IconLoader, IconPaperclip } from "@tabler/icons-react"
import { UserLinkServices } from "@/services/user-link.service"
import { recordChange } from "@/store/link-changes-slice"
import { toast } from "sonner"
import { toggleCreateUserLink } from "@/store/user-modals-slice"


export function CreateUserLink() {

  const [submiting, setSubmiting] = useState(false)
  const [original, setOriginal] = useState("")
  const [short, setShort] = useState("")
  const { isOpen } = useSelector((state: RootState) => state.userModals.createUserLink)
  const dispatch = useDispatch()


  const handleCreate = async (e: FormEvent) => {

    e.preventDefault()
    setSubmiting(true)
    const data = { original, short: short.trim() }

    try {

      const response = await new UserLinkServices().createUserSmLink(data)
      dispatch(recordChange())
      toast.success(response.response)

    } catch (e) {

      toast.error((e as Error).message)

    } finally {

      setSubmiting(false)
      dispatch(toggleCreateUserLink())

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
              onClick={() => { dispatch(toggleCreateUserLink()) }}>

              <motion.div className="w-[90vw] bg-neutral-950 rounded-xl border border-neutral-800 max-w-xl
              sm:w-[80vw] lg:w-[70vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}>

                <h1 className="p-4 text-sm border-neutral-800 xl:text-base">
                  Create New SmLink
                </h1>

                <form className=""
                  onSubmit={handleCreate}>

                  <section className="p-4 flex flex-col gap-3 border-y border-neutral-800">
                    <label className="flex items-center gap-2 text-sm">
                      <IconPaperclip className="size-4" />
                      Paste a long URL
                    </label>

                    <input className="p-3 rounded-lg text-xs border border-neutral-800 bg-neutral-900 
                    focus:border-green-600"
                      type="text"
                      placeholder="https://example.com/long-url-to-short"
                      required
                      onChange={(e) => setOriginal(e.currentTarget.value)} />

                    <label className="flex items-center gap-2 text-sm pt-2">
                      <IconEditCircle className="size-4" />
                      Customize short version (max: 20 characters)
                    </label>

                    <input className="w-1/2 p-3 rounded-lg text-xs border border-neutral-800 bg-neutral-900
                    focus:border-green-600"
                      type="text"
                      placeholder="Optional, example VTN_IO"
                      onChange={(e) => setShort(e.currentTarget.value)} />
                  </section>

                  <div className="p-4 flex justify-start">
                    <button className="py-2 px-4 flex items-center gap-2 text-sm rounded-lg cursor-pointer bg-green-600
                    disabled:opacity-50"
                      disabled={submiting}>
                      {submiting ? <IconLoader className="size-3 animate-spin" /> : <IconCheck className="size-3" />}
                      Create
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.section>
          )
        }
      </AnimatePresence>
    </ModalLayout>

  )

}