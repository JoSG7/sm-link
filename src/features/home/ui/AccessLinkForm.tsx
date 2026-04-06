"use client"

import { createSupabase } from "@/lib/supabase/client"
import { IconCheck, IconLoader2, IconLock } from "@tabler/icons-react"
import { motion } from "framer-motion"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { GuestLinkServices } from "@/services/guest-link.service"

export function AccessLinkForm({ short, linkID }: { short: string, linkID?: string }) {

  const [submiting, setSubmiting] = useState(false)
  const [password, setPassword] = useState("")
  
  
  const handleRedirect = async (e: FormEvent) => {
    
    e.preventDefault()
    setSubmiting(true)
    const supabase = createSupabase()
    
    try {
      
      const { response } = await new GuestLinkServices().protected.validateSmLinkPassword(short, password)
      supabase.rpc("record_monthly_visits", { x_link_id: linkID })
      window.location.replace(response) 

    } catch {

      toast.error("Wrong Password")

    } finally {

      setSubmiting(false)

    }
  }


  return (

    <section className="w-screen h-screen flex items-center justify-center">

      <motion.div className="w-[90vw] bg-neutral-950 rounded-xl border border-neutral-800 max-w-[1270px]
      sm:w-[80vw] lg:w-[50vw]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}>

        {/* Title */}
        <h1 className="p-4 text-base-movil 
        ">
          This link is protected. Please enter the password to continue.
        </h1>

        <form onSubmit={handleRedirect}>
          {/* Input section */}
          <section className="p-4 border-y border-neutral-800
           ">

            <div className="p-2 flex items-center gap-2 rounded-lg bg-neutral-900 text-xs-movil 
           ">

              <IconLock className="size-4 xs:size-5 " />

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
          ">

            <button className="p-2 px-4 flex items-center gap-2 rounded-lg bg-green-700  disabled:opacity-50 cursor-pointer
            "
              disabled={submiting}>

              {
                submiting ?
                  <IconLoader2 className="size-4 animate-spin xs:size-5 " /> 
                  :
                  <IconCheck className="size-4 xs:size-5 " />
              }

              {submiting ? "Validating..." : "Enter"}

            </button>
          </section>
        </form>
      </motion.div>

    </section>
  )
}