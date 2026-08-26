"use client"

import { IconAlertHexagon, IconLoader2, IconTrash } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { SubmitEvent, useState } from "react"
import { toast } from "sonner"
import ModalLayout from "@/components/modals/ModalLayout"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store-config"
import { recordChange } from "@/store/link-changes-slice"
import { toggleDeleteLink } from "@/store/modal-slice"
import { LinkServices } from "@/services/link.service"

export function DeleteLinkModal() {

  const [submiting, setSubmiting] = useState(false)

  const dispatch = useDispatch()
  const { shortLink, isOpen } = useSelector(
    (state: RootState) => state.modals.deleteLink
  )


  const handleDelete = async (e: SubmitEvent) => {

    e.preventDefault()

    if (shortLink) {

      setSubmiting(true)

      try {

        const { data } = await new LinkServices().deleteSmLink(shortLink)
        dispatch(recordChange())
        dispatch(toggleDeleteLink())
        toast.success(data)

      } catch (e) {

        toast.error((e as Error).message)

      } finally {

        setSubmiting(false)

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
              onClick={() => dispatch(toggleDeleteLink())}>

              <motion.form className="group relative isolate w-[90vw] p-5 overflow-hidden bg-neutral-950 rounded-xl border border-neutral-800 max-w-96 sm:w-[70vw] lg:w-[50vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleDelete}>

                <div className="pointer-events-none absolute -right-12 -top-12 -z-10 size-25 rounded-full bg-linear-to-br from-red-500/15 via-rose-500/10 to-transparent blur-2xl" />

                <header className="pb-4 flex items-center gap-4">
                  <div className="p-2 rounded-lg border border-red-500/30 bg-red-500/20">
                    <IconAlertHexagon className="size-6 text-red-400" />
                  </div>

                  <div>
                    <h1 className="font-medium">Delete link?</h1>
                    <p className="text-xs text-neutral-400">{shortLink}</p>
                  </div>
                </header>

                <div className="pt-4 flex justify-start">
                  <button className="py-2 px-4 flex items-center gap-2 text-sm rounded-lg bg-linear-to-b from-red-500 to-red-600/50
                  disabled:opacity-30 cursor-pointer"
                  disabled={submiting}>

                  {
                    submiting ?
                      <IconLoader2 className="size-4 animate-spin" />
                      :
                      <IconTrash className="size-4 " />
                  }
                    {submiting ? "Deleting..." : "Delete"}

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