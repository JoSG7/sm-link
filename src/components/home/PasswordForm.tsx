"use client"

import { validateLinkPassword } from "@/utils/links/api"
import { IconCheck, IconLoader2, IconLock } from "@tabler/icons-react"
import { motion } from "framer-motion"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

export function PasswordForm({ short }: { short: string }) {

  const [submiting, setSubmiting] = useState(false)
  const [password, setPassword] = useState("")
  

  const handleRedirect = async (e: FormEvent) => {
    e.preventDefault()
    setSubmiting(true)

    await validateLinkPassword(short, password).then(res => {
      if(res.error){
        toast.error(res.error)
      } else {
        if(!res.response){
          toast.error("Wrong password")
        } else {
          window.location.href = res.response
        }
      }
    })
    .finally(() => setSubmiting(false))
  }

  return (

    <section className="w-screen h-screen flex items-center justify-center">

      <motion.div className="w-72 bg-neutral-950 rounded-xl border border-neutral-900 lg-2:w-96"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}>

        {/* Title */}
        <h1 className="p-4 text-sm border-b border-neutral-900 lg-2:text-lg">
          This link is protected. Please enter the password to continue.
        </h1>

        <form onSubmit={handleRedirect}>
          {/* Input section */}
          <div className="p-4 flex flex-col gap-4 border-b border-neutral-900">
            <div className="flex items-center p-2 gap-2 bg-neutral-900 rounded-lg text-xs ">
              <IconLock className="size-4" />
              <input className="w-full bg-transparent text-neutral-400 placeholder:text-neutral-700 lg-2:text-sm"
                placeholder="Enter the password" type="password" required autoFocus 
                onChange={(e) => setPassword(e.currentTarget.value)}/>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="p-4 flex gap-4 items-center">
            <button className="flex items-center gap-1 p-2 px-4 bg-green-700 rounded-xl text-xs lg-2:text-sm disabled:opacity-50"
              disabled={submiting}>
              {submiting ? <IconLoader2 className="size-3 animate-spin" /> : <IconCheck className="size-3" />}
              {submiting ? "Validating..." : "Submit"}
            </button>
          </div>
        </form>
      </motion.div>

    </section>
  )
}