"use client"

import { IconLoader2 } from "@tabler/icons-react"
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
    if(shortLink){
      deleteGuestLink(shortLink).then((res) => {
        if(res.error){
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
          <motion.section className="fixed inset-0 z-30 bg-[rgba(0,0,0,0.8)] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>

            <motion.div className="w-[90vw] bg-neutral-950 rounded-xl border border-neutral-800 
            xl:w-[50vw]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}>

              <h1 className="p-4 border-b border-neutral-800 text-sm-movil 
              xs:p-5">
                Are you sure to delete this link for ever? <span className="font-medium">{shortLink}</span>
              </h1>

              <div className="p-4 flex gap-4 items-center text-sm-movil 
              xs:p-5">
                <button className="py-1.5 px-3 text-center bg-neutral-900 rounded-lg 
                xs:py-2 xs:px-4"
                onClick={() => { toggleDeleteLinkModal() }} disabled={deleting}>
                  Close  
                </button>

                <button className="py-1.5 px-4 flex items-center rounded-lg bg-red-700 disabled:opacity-30 
                xs:py-2 xs:px-4"
                onClick={handleDelete} disabled={deleting}>
                  {deleting ? <IconLoader2 className="size-5 animate-spin"/> : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.section>
        )
      }
    </AnimatePresence>
  )
}