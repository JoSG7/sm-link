"use client"

import { IconLoader2, IconTrashX } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { GuestLinkServices } from "../services/guest-link.service"
import ModalLayout from "@/features/shared/modals/ModalLayout"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store-config"
import { recordChange } from "@/store/link-changes-slice"
import { toggleDeleteLink } from "@/store/modal-slice"

export function DeleteLinkModal() {

  const [deleting, setDeleting] = useState(false)

  const dispatch = useDispatch()
  const { shortLink, isOpen } = useSelector(
    (state: RootState) => state.modals.deleteLink
  )


  const handleDelete = (e: FormEvent) => {

    e.preventDefault()
    setDeleting(true)
    const guestLinkServices = new GuestLinkServices()

    if (shortLink) {

      guestLinkServices.deleteLink(shortLink)
        .then(res => {

          if (res.error) {
            toast.error(res.error)
          } else {
            toast.success(res.response)
            dispatch(recordChange())
            dispatch(toggleDeleteLink())
          }

        })
        .finally(() => setDeleting(false))

    }
  }


  return (
    <ModalLayout>
      <AnimatePresence>
        {
          isOpen && (
            <motion.section className="fixed inset-0 z-30 bg-[rgba(0,0,0,0.8)] flex items-center justify-center "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch(toggleDeleteLink())}>

              <motion.form className="w-[90vw] bg-neutral-950 rounded-xl border border-neutral-800 max-w-96
              sm:w-[70vw] lg:w-[50vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleDelete}>

                {/* Title */}
                <h1 className="p-4 border-b border-neutral-800 text-sm sm:text-base lg:text-sm">
                  Are you sure to delete this link for ever? <span className="font-medium">{shortLink}</span>
                </h1>

                {/* Buttons section */}
                <div className="p-4 flex gap-4 items-center text-xs ">

                  <button className="p-2 px-3 flex items-center gap-2 rounded-sm bg-red-700 disabled:opacity-30 cursor-pointer "
                    disabled={deleting}>

                    {
                      deleting ?
                        <IconLoader2 className="size-4 animate-spin" /> :

                        <IconTrashX className="size-4 " />
                    }
                    {deleting ? "Deleting..." : "Delete"}

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