"use client"

import { useDeleteLinkModal, useLinkChanges } from "@/hooks/useModal"
import { deleteGuestLink } from "@/utils/links/api"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { toast } from "sonner"

export function DeleteLinkModal() {

  const [deleting, setDeleting] = useState(false)
  const { deleteModal, shortToDelete, toggleDeleteModal } = useDeleteLinkModal()
  const { recordLinkChanges } = useLinkChanges()

  const handleDelete = async () => {
    setDeleting(true)
    if(shortToDelete){
      await deleteGuestLink(shortToDelete).then((res) => {
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
          <motion.section className="fixed inset-0 z-30 bg-modal flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>

            <motion.div className="bg-neutral-950 rounded-full border border-neutral-900 py-5 px-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}>

              <h1 className="pb-7">Deseas eliminar este link para siempre? {shortToDelete}</h1>
              <div className="flex gap-4 items-center">
                <button onClick={() => { toggleDeleteModal() }}>cancelar</button>
                <button className="py-2 px-3 rounded-xl bg-red-700 border border-red-900 disabled:opacity-30" 
                onClick={handleDelete} disabled={deleting}>
                  {deleting ? "Eliminando": "Eliminar"}
                </button>
              </div>

            </motion.div>

          </motion.section>
        )
      }
    </AnimatePresence>
  )

}