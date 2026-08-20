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

              <motion.form className="p-4 w-[90vw] bg-neutral-950 rounded-xl flex flex-col gap-4 border border-neutral-800 max-w-96 xs:p-5 sm:max-w-max "
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleDelete}>

                {/* Title */}
                <h1 className="text-sm sm:text-base flex gap-2 items-center">
                  <IconAlertHexagon className="size-5 text-red-500" />
                  <p>
                    Are you sure to delete <span className="font-medium text-neutral-300"> {shortLink}</span> for ever?
                  </p>
                </h1>

                {/* Buttons section */}
                <button className="w-max p-2 px-3 flex items-center gap-2 text-sm rounded-md bg-red-700/50 hover:opacity-80
                  disabled:opacity-30 cursor-pointer border border-red-700/70"
                  disabled={submiting}>

                  {
                    submiting ?
                      <IconLoader2 className="size-4 animate-spin" />
                      :
                      <IconTrash className="size-4 " />
                  }
                  {submiting ? "Deleting..." : "Delete"}

                </button>

              </motion.form>
            </motion.section>
          )
        }
      </AnimatePresence>
    </ModalLayout>
  )
}