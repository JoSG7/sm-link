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
          <motion.section className="fixed inset-0 z-30 bg-modal flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>

            <motion.div className="max-w-80 bg-neutral-950 rounded-xl border border-neutral-900 lg-2:max-w-max"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}>

              <h1 className="p-4 border-b border-neutral-900 text-sm lg-2:text-base">
                Deseas eliminar este link para siempre? {short}
              </h1>

              <div className="p-4 flex gap-4 items-center text-sm">
                <button onClick={() => { toggleDeleteModal() }} disabled={deleting}>Cancelar</button>
                <button className="py-1 px-3 rounded-xl bg-red-700 border disabled:opacity-30 flex items-center gap-2" 
                onClick={handleDelete} disabled={deleting}>
                  {deleting ? <IconLoader2 size={15} className="animate-spin"/> : "" }
                  {deleting ? "Eliminando...": "Eliminar"}
                </button>
              </div>
            </motion.div>
          </motion.section>
        )
      }
    </AnimatePresence>
  )
}