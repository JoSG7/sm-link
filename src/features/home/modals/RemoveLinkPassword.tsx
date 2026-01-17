"use client"

import { IconLoader2, IconTrashX } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { toast } from "sonner"
import { GuestLinkServices } from "../../../services/guest-link.service"
import ModalLayout from "@/features/shared/modals/ModalLayout"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store-config"
import { toggleDeletePassword } from "@/store/modal-slice"
import { recordChange } from "@/store/link-changes-slice"


export function RemoveLinkPasswordModal() {
  const [removing, setRemoving] = useState(false)

  const dispatch = useDispatch()
  const { isOpen, shortLink } = useSelector(
    (state: RootState) => state.modals.deletePassword
  )


  const handleDelete = async () => {
    
    if (shortLink) {
      
      setRemoving(true)

      try {

        const { response } = await new GuestLinkServices().protected.deleteLink(shortLink)
        dispatch(recordChange())
        dispatch(toggleDeletePassword())
        toast.success(response)

      } catch (e) {

        toast.error((e as Error).message)

      } finally {

        setRemoving(false)

      }
    }
  }


  return (
    <ModalLayout>
      <AnimatePresence>
        {
          isOpen && (
            <motion.section className={`fixed inset-0 z-30 bg-[rgba(0,0,0,0.8)] flex items-center justify-center
            ${removing && "pointer-events-none"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch(toggleDeletePassword())}>

              <motion.form className="w-[90vw] bg-neutral-950 rounded-xl border border-neutral-800 max-w-96
              sm:w-[70vw] lg:w-[50vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}>

                {/* Modal title */}
                <h1 className="p-4 border-b border-neutral-800 text-sm sm:text-base lg:text-sm ">
                  Are you sure to remove the password from this link? <span className="font-semibold">{shortLink}</span>
                </h1>

                {/* Buttons Section */}
                <div className="p-4 flex gap-4 items-center text-sm ">

                  <button className="p-2 px-3 flex items-center gap-2 rounded-sm bg-red-700 disabled:opacity-30 cursor-pointer "
                    onClick={handleDelete}
                    disabled={removing}>

                    {
                      removing ?
                        <IconLoader2 className="size-4 animate-spin" /> :

                        <IconTrashX className="size-4 " />
                    }
                    {removing ? "Deleting..." : "Delete"}

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