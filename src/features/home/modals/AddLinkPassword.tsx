import { AnimatePresence, motion } from "framer-motion"
import { useSetLinkPasswordModal } from "../hooks/useModals"
import { IconCheck, IconLoader2, IconLock, IconLockCheck, IconX } from "@tabler/icons-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { createProtectedLink } from "../utils/guest-links"
import { useLinkChanges } from "../hooks/useLinkChanges"

export function AddLinkPasswordModal() {

  const [submiting, setSubmiting] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { shortLink, isSetLinkPasswordOpen, toggleSetLinkPasswordModal } = useSetLinkPasswordModal()
  const { recordLinkChanges } = useLinkChanges()

  const handleCreate = (e: FormEvent) => {
    e.preventDefault()

    if (password != confirmPassword) {
      toast.error("The passwords not match, try again")
    } else if (shortLink) {
      setSubmiting(true)

      createProtectedLink(shortLink, password).then(res => {
        if (res.error) {
          toast.error(res.error)
        } else {
          recordLinkChanges()
          toast.success(res.response)
        }
      })
        .finally(() => {
          setSubmiting(false)
          toggleSetLinkPasswordModal()
        })
    }
  }

  return (
    <AnimatePresence>
      {
        isSetLinkPasswordOpen && (
          <motion.section className="fixed inset-0 z-30 bg-[rgba(0,0,0,0.8)] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <motion.div className="w-[90vw] bg-neutral-950 rounded-xl border border-neutral-800 max-w-[1270px]
            sm:w-[80vw]
            lg:w-[50vw]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}>

              {/* Title */}
              <h1 className="p-4 text-sm-movil border-b border-neutral-800 
              xs:p-5
              sm:p-6 sm:text-xl-tablet
              md:p-7
              lg:p-5 lg:text-lg
              xl:text-lg-desktop
              2xl:p-6 3xl:p-7 4xl:p-9 ">
                Add protection to <span className="font-semibold">{shortLink}</span>
              </h1>

              {/* Form */}
              <form onSubmit={handleCreate}>

                {/* Inputs Container */}
                <section className="p-4 flex flex-col gap-4 text-xs-movil border-b border-neutral-800 
                xs:p-5 xs:gap-5
                sm:p-6 sm:gap-6 sm:text-xl-tablet 
                md:p-7 md:gap-7
                lg:p-5 lg:gap-5 lg:text-lg
                xl:text-lg-desktop
                2xl:p-6 2xl:gap-6
                3xl:p-7 3xl:gap-7
                4xl:p-9 4xl:gap-9">

                  {/* Input Password */}
                  <div className="p-2 flex items-center gap-2 rounded-lg bg-neutral-900 
                  xs:p-3 xs:gap-3
                  sm:p-4 sm:gap-4 sm:rounded-xl
                  md:p-5 md:gap-5
                  lg:p-3 lg:gap-3 lg:rounded-lg
                  2xl:p-4 2xl:gap-4
                  3xl:p-5 3xl:gap-5
                  4xl:p-7 4xl:gap-7">

                    <IconLock className="size-5 xs:size-6 sm:size-7 md:size-8 lg:size-6 
                    2xl:size-7 3xl:size-8 4xl:size-10" />
                    <input className="w-full bg-transparent placeholder:text-neutral-700 "
                      placeholder="Enter a password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)} />

                  </div>

                  {/* Repeat Password */}
                  <div className="p-2 flex items-center gap-2 rounded-lg bg-neutral-900 
                  xs:p-3 xs:gap-3
                  sm:p-4 sm:gap-4 sm:rounded-xl
                  md:p-5 md:gap-5
                  lg:p-3 lg:gap-3 lg:rounded-lg
                  2xl:p-4 2xl:gap-4
                  3xl:p-5 3xl:gap-5
                  4xl:p-7 4xl:gap-7">

                    <IconLockCheck className="size-5 xs:size-6 sm:size-7 md:size-8 lg:size-6
                    2xl:size-7 3xl:size-8 4xl:size-10" />
                    <input className="w-full bg-transparent placeholder:text-neutral-700 "
                      placeholder="Confirm the password"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.currentTarget.value)} />
                  </div>

                </section>

                {/* Buttons Section */}
                <section className="p-4 flex gap-4 items-center text-xs-movil
                xs:p-5 xs:gap-5
                sm:p-6 sm:gap-6 sm:text-xl-tablet
                md:p-7 md:gap-7 
                lg:p-5 lg:gap-5 lg:text-base
                xl:text-base-desktop
                2xl:p-6 2xl:gap-6
                3xl:p-7 3xl:gap-7
                4xl:p-9 4xl:gap-9">

                  <button className="p-2 px-3 flex items-center gap-2 rounded-lg bg-neutral-900 disabled:opacity-50 cursor-pointer 
                  xs:p-2.5 xs:px-4 
                  sm:p-3 sm:px-4
                  lg:p-2 lg:px-4
                  2xl:p-2.5 2xl:px-4
                  3xl:p-3 3xl:px-4
                  4xl:p-4 4xl:px-5 "
                    onClick={() => { toggleSetLinkPasswordModal() }} disabled={submiting} type="button">

                    <IconX className="size-4 xs:size-5 md:size-6 lg:size-5 
                    2xl:size-6 3xl:size-7 4xl:size-9" />
                    Close

                  </button>

                  <button className="p-2 px-3 flex items-center gap-2 rounded-lg bg-green-700 disabled:opacity-50 cursor-pointer 
                  xs:p-2.5 xs:px-4 
                  sm:p-3 sm:px-4
                  lg:p-2 lg:px-4
                  2xl:p-2.5 2xl:px-4
                  3xl:p-3 3xl:px-4
                  4xl:p-4 4xl:px-5 "
                    disabled={submiting} >

                    {
                      submiting ?
                        <IconLoader2 className="size-4 animate-spin xs:size-5 md:size-6 lg:size-5 
                        2xl:size-6 3xl:size-7 4xl:size-9" /> :

                        <IconCheck className="size-4 xs:size-5 md:size-6 lg:size-5 
                        2xl:size-6 3xl:size-7 4xl:size-9" />
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
  )
}
