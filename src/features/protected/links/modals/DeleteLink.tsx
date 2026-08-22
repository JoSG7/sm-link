"use client"

import ModalLayout from "@/components/modals/ModalLayout";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { SubmitEvent, useState } from "react";
import { IconCheck, IconLoader, IconTrash } from "@tabler/icons-react";
import { toast } from "sonner";
import { LinkServices } from "@/services/link.service";
import { useRouter } from "next/navigation";


interface DeleteLinkModalProps {
  isOpen: boolean
  short: string
  onClose: () => void
}

export function DeleteLinkModal({ isOpen, short, onClose }: DeleteLinkModalProps) {

  const [submiting, setSubmiting] = useState(false)
  const router = useRouter()


  const handleDelete = async (e: SubmitEvent) => {

    e.preventDefault()
    setSubmiting(true)

    try {

      const { data } = await new LinkServices().deleteSmLink(short)
      toast.success(data)
      onClose()
      router.refresh()

    } catch (e) {

      toast.error((e as Error).message)

    } finally {

      setSubmiting(false)

    }

  }


  return (
    <ModalLayout>
      <AnimatePresence>
        {
          isOpen && (
            <motion.section className={`fixed inset-0 z-30 bg-black/80 flex items-center justify-center backdrop-blur-sm ${submiting && "pointer-events-none"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}>

              <motion.form className="w-[90vw] bg-neutral-950 rounded-xl border border-neutral-800 max-w-96 sm:w-[70vw] lg:w-[50vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.1 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleDelete}>

                <header className="p-5 flex items-center gap-4 border-b border-neutral-800">
                  <div className="p-2 rounded-lg border border-red-500/30 bg-red-500/20">
                    <IconTrash className="size-6 text-red-400" />
                  </div>

                  <div>
                    <h1 className="font-medium">Are you sure to delete this link?</h1>
                    <p className="text-xs text-neutral-400">{short}</p>
                  </div>
                </header>

                {/* Buttons section */}
                <div className="p-5 flex gap-4 items-center text-xs ">

                  <button className="p-2 px-3 flex items-center gap-2 rounded-sm disabled:opacity-30  bg-linear-to-b from-red-500 to-red-600/50"
                    disabled={submiting}>
                    {
                      submiting ?
                        <IconLoader className="size-4 animate-spin" />
                        :
                        <IconCheck className="size-4 " />
                    }
                    {
                      submiting ? "Deleting..." : "Delete"
                    }
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