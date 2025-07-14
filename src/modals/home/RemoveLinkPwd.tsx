import { useLinkChanges } from "@/hooks/useLinkChanges"
import { useRemovePasswordModal } from "@/hooks/useModal"
import { removeProtectedLink } from "@/utils/links/api"
import { IconLoader2 } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { toast } from "sonner"

export function RemoveLinkPwdModal() {
  const [removing, setRemoving] = useState(false)
  const { toggleRemovePasswordModal, isRemovePasswordModalOpen, shortLink } = useRemovePasswordModal() 
  const { recordLinkChanges } = useLinkChanges()

  const handleDelete = async () => {
    setRemoving(true)
    if(shortLink){
      await removeProtectedLink(shortLink).then(res => {
        if(res.error){
          toast.error(res.error)
        } else {
          toast.success(res.response)
        }
      })
      .finally(() => {
        setRemoving(false)
        recordLinkChanges()
        toggleRemovePasswordModal()
      })
    }
  }

  return (
    <AnimatePresence>
      {
        isRemovePasswordModalOpen && (
          <motion.section className="fixed inset-0 z-30 bg-modal flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>

            <motion.div className="w-[300px] bg-neutral-950 rounded-xl border border-neutral-900 lg-2:w-96"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}>

              <h1 className="p-4 border-b border-neutral-900 text-sm lg-2:text-base">
                Are you sure to remove the password of this link? <span className="font-semibold">{shortLink}</span>
              </h1>

              <div className="p-4 flex gap-4 items-center text-sm">
                <button className="py-1 px-3 bg-neutral-900 rounded-lg"
                onClick={() => { toggleRemovePasswordModal() }} disabled={removing}>
                  Cancelar
                </button>
                <button className="py-1 px-3 rounded-lg bg-red-700 disabled:opacity-30 flex items-center gap-2" 
                onClick={handleDelete} disabled={removing}>
                  {removing ? <IconLoader2 size={15} className="animate-spin"/> : "" }
                  {removing ? "Removing...": "Remove"}
                </button>
              </div>
            </motion.div>
          </motion.section>
        )
      }
    </AnimatePresence>
  )
}