"use client"

import { createSupabase } from "@/lib/supabase/client"
import { IconCheck, IconLoader2, IconLock } from "@tabler/icons-react"
import { motion } from "framer-motion"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { validateLinkPassword } from "../../utils/guest-links"

export function AccessLinkForm({ short, link_id }: { short: string, link_id?: string }) {

  const [submiting, setSubmiting] = useState(false)
  const [password, setPassword] = useState("")
  const supabase = createSupabase()

  const handleRedirect = (e: FormEvent) => {
    e.preventDefault()
    setSubmiting(true)

    validateLinkPassword(short, password).then(async (res) => {
      if (res.error) {
        toast.error(res.error)
      } else {
        if (!res.response) {
          toast.error("Wrong password")
        } else {
          await supabase.rpc("record_monthly_visits", { x_link_id: link_id })
          window.location.href = res.response
        }
      }
    })
      .finally(() => setSubmiting(false))
  }

  return (

    <section className="w-screen h-screen flex items-center justify-center">

      <motion.div className="w-[90vw] bg-neutral-950 rounded-xl border border-neutral-800 max-w-[1270px]
      sm:w-[80vw]
      lg:w-[50vw]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}>

        {/* Title */}
        <h1 className="p-4 text-base-movil 
        xs:p-5
        sm:p-6 sm:text-xl-tablet
        md:p-7
        lg:p-5 lg:text-lg
        xl:text-lg-desktop
        2xl:p-6 3xl:p-7 4xl:p-9">
          This link is protected. Please enter the password to continue.
        </h1>

        <form onSubmit={handleRedirect}>
          {/* Input section */}
          <section className="p-4 border-y border-neutral-800
          xs:p-5 sm:p-6 md:p-7 lg:p-5 
          2xl:p-6 3xl:p-7 4xl:p-9 ">

            <div className="p-2 flex items-center gap-2 rounded-lg bg-neutral-900 text-xs-movil 
            xs:p-3 xs:gap-3
            sm:p-4 sm:gap-4 sm:text-xl-tablet sm:rounded-xl
            md:p-5 md:gap-5
            lg:p-3 lg:gap-3 lg:text-lg lg:rounded-lg
            xl:text-lg-desktop
            2xl:p-4 2xl:gap-4
            3xl:p-5 3xl:gap-5
            4xl:p-7 4xl:gap-7">

              <IconLock className="size-4 xs:size-5 sm:size-7 md:size-8 lg:size-6 
              2xl:size-7 3xl:size-8 4xl:size-10" />

              <input className="w-full bg-transparent placeholder:text-neutral-700 "
                placeholder="Enter the password"
                type="password"
                required
                autoFocus
                onChange={(e) => setPassword(e.currentTarget.value)} />

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

            <button className="p-2 px-4 flex items-center gap-2 rounded-lg bg-green-700  disabled:opacity-50 cursor-pointer
            xs:p-2.5 xs:px-4 
            sm:p-3 sm:px-4
            lg:p-2 lg:px-4
            2xl:p-2.5 2xl:px-4
            3xl:p-3 3xl:px-4
            4xl:p-4 4xl:px-5"
              disabled={submiting}>

              {
                submiting ?
                  <IconLoader2 className="size-4 animate-spin xs:size-5 md:size-6 lg:size-5 
                  2xl:size-6 3xl:size-7 4xl:size-9" /> :

                  <IconCheck className="size-4 xs:size-5 md:size-6 lg:size-5 
                  2xl:size-6 3xl:size-7 4xl:size-9" />
              }

              {submiting ? "Validating..." : "Enter"}

            </button>
          </section>
        </form>
      </motion.div>

    </section>
  )
}