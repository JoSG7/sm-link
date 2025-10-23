"use client"

import { IconLoader2, IconTrashX, IconX } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { toast } from "sonner"
import { useDeleteLinkModal } from "../hooks/useModals"
import { deleteGuestLink } from "../utils/guest-links"
import { useLinkChanges } from "../hooks/useLinkChanges"

export function DeleteLinkModal() {

  const [deleting, setDeleting] = useState(false)
  const { isDeleteLinkOpen, shortLink, toggleDeleteLinkModal } = useDeleteLinkModal()
  const { recordLinkChanges } = useLinkChanges()

  const handleDelete = () => {
    setDeleting(true)
    if (shortLink) {
      deleteGuestLink(shortLink).then((res) => {
        if (res.error) {
          toast.error(res.error)
        } else {
          toast.success(res.response)
          recordLinkChanges()
          toggleDeleteLinkModal()
        }
      })
        .finally(() => setDeleting(false))
    }
  }

  return (
    <AnimatePresence>
      {
        isDeleteLinkOpen && (
          <motion.section className="fixed inset-0 z-30 bg-[rgba(0,0,0,0.8)] flex items-center justify-center "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>

            <motion.div className="w-[90vw] bg-neutral-950 rounded-xl border border-neutral-800 max-w-[1270px]
            sm:w-[70vw]
            lg:w-[50vw]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}>

              {/* Title */}
              <h1 className="p-4 border-b border-neutral-800 text-sm-movil 
              xs:p-5
              sm:p-6 sm:text-xl-tablet
              md:p-7
              lg:p-5 lg:text-lg
              xl:text-lg-desktop
              2xl:p-6 3xl:p-7 4xl:p-9">
                Are you sure to delete this link for ever? <span className="font-medium">{shortLink}</span>
              </h1>

              {/* Buttons section */}
              <div className="p-4 flex gap-4 items-center text-xs-movil 
              xs:p-5 xs:gap-5
              sm:p-6 sm:gap-6 sm:text-xl-tablet
              md:p-7 md:gap-7
              lg:p-5 lg:gap-5 lg:text-base
              xl:text-base-desktop
              2xl:p-6 2xl:gap-6
              3xl:p-7 3xl:gap-7
              4xl:p-9 4xl:gap-9">

                <button className="p-2 px-3 flex items-center gap-2 rounded-lg bg-neutral-900 cursor-pointer
                xs:p-2.5 xs:px-4 
                sm:p-3 sm:px-4
                lg:p-2 lg:px-4
                2xl:p-2.5 2xl:px-4
                3xl:p-3 3xl:px-4
                4xl:p-4 4xl:px-5"
                  onClick={() => { toggleDeleteLinkModal() }} disabled={deleting}>

                  <IconX className="size-4 xs:size-5 md:size-6 lg:size-5 
                  2xl:size-6 3xl:size-7 4xl:size-9" />
                  Close

                </button>

                <button className="p-2 px-3 flex items-center gap-2 rounded-lg bg-red-700 disabled:opacity-30 cursor-pointer
                xs:p-2.5 xs:px-4 
                sm:p-3 sm:px-4
                lg:p-2 lg:px-4
                2xl:p-2.5 2xl:px-5
                3xl:p-3 3xl:px-6
                4xl:p-4 4xl:px-7"
                  onClick={handleDelete} disabled={deleting}>

                  {
                    deleting ?
                      <IconLoader2 className="size-4 xs:size-5 md:size-6 lg:size-5 
                      2xl:size-6 3xl:size-7 4xl:size-9 animate-spin"/> :

                      <IconTrashX className="size-4 xs:size-5 md:size-6 lg:size-5 
                      2xl:size-6 3xl:size-7 4xl:size-9" />
                  }
                  {deleting ? "Deleting..." : "Delete"}

                </button>
              </div>
            </motion.div>
          </motion.section>
        )
      }
    </AnimatePresence>
  )
}