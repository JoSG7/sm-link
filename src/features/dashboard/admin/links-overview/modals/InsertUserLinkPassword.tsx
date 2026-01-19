"use client"

import ModalLayout from "@/features/shared/modals/ModalLayout";
import { RootState } from "@/store/store-config";
import { AnimatePresence } from "framer-motion";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toggleInsertUserLinkPassword } from "@/store/user-modals-slice";
import { IconCheck, IconLoader, IconLock, IconLockCheck } from "@tabler/icons-react";
import { toast } from "sonner";
import { UserLinkServices } from "@/services/user-link.service";
import { recordChange } from "@/store/link-changes-slice";

export function InsertUserLinkPasswordModal() {

  const [submiting, setSubmiting] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const dispatch = useDispatch()

  const { isOpen, short } = useSelector((state: RootState) => state.userModals.protected.insertUserLinkPassword)


  const handleCreate = async (e: FormEvent) => {

    e.preventDefault()
    setSubmiting(true)

    if (short) {

      try {

        const { response } = await new UserLinkServices().protected.insertUserSmLinkPassword({ short, password })
        dispatch(recordChange())
        toast.success(response)

      } catch (e) {

        toast.error((e as Error).message)

      } finally {

        dispatch(toggleInsertUserLinkPassword())
        setSubmiting(false)

      }

    }
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
              onClick={() => {
                setPassword("")
                setConfirmPassword("")
                dispatch(toggleInsertUserLinkPassword())
              }}>

              <motion.div className="w-[90vw] bg-neutral-950 rounded-xl border border-neutral-800 max-w-xl
              sm:w-[80vw] lg:w-[50vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}>

                {/* Title */}
                <h1 className="p-4 text-sm border-b border-neutral-800 ">
                  Add protection to <span className="font-semibold">{short}</span>
                </h1>

                {/* Form */}
                <form onSubmit={handleCreate}>

                  {/* Inputs Container */}
                  <section className="p-4 flex flex-col gap-4 text-xs border-b border-neutral-800 ">

                    {/* Input Password */}
                    <div className="p-2 flex items-center gap-2 rounded-lg bg-neutral-900
                    sm:p-3">

                      <IconLock className="size-5 " />
                      <input className="w-full bg-transparent placeholder:text-neutral-700"
                        placeholder="Enter a password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)} />

                    </div>

                    {/* Repeat Password */}
                    <div className="p-2 flex items-center gap-2 rounded-lg bg-neutral-900 
                    sm:p-3">

                      <IconLockCheck className="size-5 " />
                      <input className="w-full bg-transparent placeholder:text-neutral-700 "
                        placeholder="Confirm the password"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.currentTarget.value)} />
                    </div>

                  </section>

                  {/* Button Section */}
                  <section className="p-4 flex gap-4 items-center text-xs ">

                    <button className="p-2 px-3 flex items-center gap-2 rounded-sm bg-green-700 disabled:opacity-50 cursor-pointer "
                      disabled={submiting}>

                      {
                        submiting ?
                          <IconLoader className="size-4 animate-spin " /> :

                          <IconCheck className="size-4 " />
                      }
                      {submiting ? "Protecting..." : "Protect"}

                    </button>
                  </section>
                </form>
              </motion.div>
            </motion.section>

          )
        }

      </AnimatePresence>

    </ModalLayout>

  )

}