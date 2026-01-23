"use client"

import ModalLayout from "@/features/shared/modals/ModalLayout";
import { RootState } from "@/store/store-config";
import { toggleDeleteUserLinkPassword } from "@/store/user-modals-slice";
import { IconLoader, IconTrash, IconTrashX } from "@tabler/icons-react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export function DeleteUserLinkPasswordModal() {

  const [submiting, setSubmiting] = useState(false)
  const dispatch = useDispatch()

  const { isOpen, short } = useSelector((state: RootState) => state.userModals.protected.deleteUserLinkPassword)

  const handleDelete = async () => {

    setSubmiting(true)

  }


  return (

    <ModalLayout>
      <AnimatePresence>

        {
          isOpen && (
            <motion.section className={`fixed inset-0 z-30 bg-[rgba(0,0,0,0.8)] flex items-center justify-center backdrop-blur-sm
            ${submiting && "pointer-events-none"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch(toggleDeleteUserLinkPassword())}>

              <motion.form className="w-[90vw] bg-neutral-950 rounded-xl border border-neutral-800 max-w-96
              sm:w-[70vw] lg:w-[50vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleDelete}>

                <header className="p-4 flex items-center gap-4 ">
                  <div className="p-2 rounded-lg border border-green-500/30 bg-green-500/20">
                    <IconTrash className="size-6 text-green-400" />
                  </div>

                  <div>
                    <h1 className="font-medium">Are you sure to delete this link?</h1>
                    <p className="text-xs text-neutral-400">{short}</p>
                  </div>
                </header>

                {/* Buttons section */}
                <div className="p-4 flex gap-4 items-center text-xs ">

                  <button className="p-2 px-3 flex items-center gap-2 rounded-sm bg-red-700 disabled:opacity-30 cursor-pointer "
                    disabled={submiting}>

                    {
                      submiting ?
                        <IconLoader className="size-4 animate-spin" /> :

                        <IconTrashX className="size-4 " />
                    }
                    {submiting ? "Deleting..." : "Delete"}

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