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

              <motion.form className="group relative isolate w-[90vw] p-5 overflow-hidden bg-neutral-950 rounded-xl border border-neutral-800 max-w-96 sm:w-[70vw] lg:w-[50vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.1 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleDelete}>

                <div className="pointer-events-none absolute -right-12 -top-12 -z-10 size-25 rounded-full bg-linear-to-br from-red-500/15 via-rose-500/10 to-transparent blur-2xl transition duration-300 group-hover:scale-125" />

                <header className="pb-4 flex items-center gap-4 lg:pb-5">
                  <div className="p-2 rounded-lg border border-red-500/30 bg-red-500/20">
                    <IconTrash className="size-6 text-red-400" />
                  </div>

                  <div>
                    <h1 className="font-medium">Are you sure to delete this link?</h1>
                    <p className="text-xs text-neutral-400">{short}</p>
                  </div>
                </header>

                <div className="flex justify-start text-sm">
                  <button className="py-2 px-4 flex items-center gap-2 rounded-lg disabled:opacity-30 bg-linear-to-b from-red-500 to-red-600/50"
                    type="submit"
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