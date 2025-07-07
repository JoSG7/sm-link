"use client"

import { useDeleteLinkModal, useLinkChanges } from "@/hooks/useModal"
import { deleteGuestLink } from "@/utils/links/api"
import { IconLoader2 } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { toast } from "sonner"

export function DeleteLinkModal() {

  const [deleting, setDeleting] = useState(false)
  const { deleteModal, short, toggleDeleteModal } = useDeleteLinkModal()
  const { recordLinkChanges } = useLinkChanges()

  const handleDelete = async () => {
    setDeleting(true)
    if(short){
      await deleteGuestLink(short).then((res) => {
        if(res.error){
          toast.error(res.error)
        } else {
          toast.success(res.response)
          recordLinkChanges()
          toggleDeleteModal()
        }
      })
      .finally(() => setDeleting(false)) 
    }
  }

  return (
    <AnimatePresence>
      {
        deleteModal && (
          <motion.section className="fixed inset-0 z-30 bg-[rgba(0,0,0,0.4)] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>

            <motion.div className="w-[300px] bg-neutral-950 rounded-xl border border-neutral-900 lg-2:w-96"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}>

              <h1 className="p-4 border-b border-neutral-900 text-sm lg-2:text-base">
                Are you sure to delete this link for ever? <span className="font-medium">{short}</span>
              </h1>

              <div className="p-4 flex gap-4 items-center text-sm">
                <button className="py-1 px-3 text-center bg-neutral-900 rounded-lg"
                onClick={() => { toggleDeleteModal() }} disabled={deleting}>
                  Close  
                </button>

                <button className="py-1 px-3 rounded-lg bg-red-700 disabled:opacity-30 flex items-center gap-2" 
                onClick={handleDelete} disabled={deleting}>
                  {deleting ? <IconLoader2 size={15} className="animate-spin"/> : "" }
                  {deleting ? "Deleting...": "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.section>
        )
      }
    </AnimatePresence>
  )
}