"use client"

import { IconBolt, IconLoader2, IconPaperclip, IconStarFilled } from "@tabler/icons-react";
import { useLinkChanges } from "@/hooks/useLinkChanges";
import { createShortLink } from "@/utils/links/api";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { isURL } from "validator";
import { motion } from 'framer-motion'

export function ShortLinkForm() {

  const [originalLink, setOriginalLink] = useState("")
  const [submiting, setSubmiting] = useState(false)
  const [shortURL, setShortURL] = useState("")
  const { recordLinkChanges } = useLinkChanges()

  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault()
    setSubmiting(true)
    const loadingToast = toast.loading("Creating short link...")

    if (!isURL(originalLink)) {
      toast.error("Ingrese un link válido", { id: loadingToast })
      setSubmiting(false)
    } else {

      await createShortLink(originalLink).then(res => {
        if (res.error) {
          toast.error(res.error, { id: loadingToast })
        } else {
          toast.success("Se genero correctamente", { id: loadingToast })
          setShortURL(res.response)
          recordLinkChanges()
        }
      })
        .finally(() => {
          setSubmiting(false)
        })
    }
  }

  return (
    <motion.form onSubmit={handleSubmit}
    className="relative border p-4 rounded-xl border-graphite bg-neutral-950/70 backdrop-blur-sm xs:p-5 sm:p-7
    lg:p-6 lg:bg-black lg:grow lg-2:p-7 
    2xl:p-8 3xl:p-9 4xl:p-11"
      initial={{ opacity: 0, x: -100, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 80
      }}
      viewport={{ once: true }}>
      
      <div className="flex justify-between">
        <label htmlFor="txtUrl" className="flex items-center gap-3">
          <div className="rounded-full ">
            <IconPaperclip className="size-5-fluid text-emerald-400 
            lg:size-5
            2xl:size-6
            3xl:size-7
            4xl:size-9" />
          </div>
          <span className="font-semibold text-lg-movil lg:text-lg-desktop-sm lg-2:text-xl-desktop">
            Paste a long link
          </span>
        </label>
      </div>

      {/* Input */}
      <input type="url" autoComplete="off" value={originalLink} onChange={(e) => setOriginalLink(e.currentTarget.value)}
        className="w-full px-4 py-2 my-4 border rounded-lg text-base-movil border-neutral-800 text-neutral-400 bg-neutral-900 placeholder:text-neutral-700 xs:my-5 xs:py-3 sm:my-7 sm:py-4 
        lg:text-base-desktop-sm lg:py-3 lg:my-4 lg:bg-neutral-950
        lg-2:text-lg-desktop 
        2xl:py-4 2xl:px-5 2xl:my-5 
        3xl:py-5 3xl:px-6 3xl:my-6
        4xl:py-7 4xl:px-8 4xl:my-8"
        placeholder="https://example.com/long-url-to-short" required />

      <div className="flex items-center gap-3">
        <div className="rounded-full lg-2:block">
          <IconStarFilled className="size-5-fluid text-emerald-400
          lg:size-5
          2xl:size-6
          3xl:size-7
          4xl:size-9 " />
        </div>
        <span className="font-semibold text-lg-movil lg:text-lg-desktop-sm lg-2:text-xl-desktop">
          Here is the new link
        </span>
      </div>

      {/* Short Link Response */}
      <div className="w-full px-4 py-2 my-4 border rounded-lg bg-neutral-900 border-neutral-800 text-neutral-300 
      xs:my-5 xs:py-3 sm:my-7 sm:py-4 
      lg:py-3 lg:bg-neutral-950 lg:my-4
      2xl:py-4 2xl:px-5 2xl:my-5 
      3xl:py-5 3xl:px-6 3xl:my-6
      4xl:py-7 4xl:px-8 4xl:my-8">
        <p className="text-base-movil lg:text-base-desktop-sm lg-2:text-lg-desktop">
          sm-link.vercel.app/{shortURL}
        </p>
      </div>

      {/* Button Section */}
      <div className="flex justify-center">
        <button className="flex items-center justify-center w-full gap-2 py-2 mt-2 font-medium rounded-lg mb-7 text-base-movil bg-gradient-to-r from-green-500 to-blue-700 disabled:opacity-50 xs:py-3 sm:py-4 
        lg:text-base-desktop-sm lg:py-3 lg:mb-5
        lg-2:text-lg-desktop lg-2:py-3 lg-2:mt-3
        2xl:py-4 2xl:mt-4 2xl:mb-6
        3xl:py-5 3xl:mt-4 3xl:mb-7
        4xl:py-7 4xl:mt-6 4xl:mb-9"
          disabled={submiting}>
          {submiting ? <IconLoader2 className="size-4 animate-spin sm:size-7 lg:size-5 2xl:size-6 3xl:size-7 4xl:size-9" /> :
            <IconBolt className="size-4 sm:size-7 lg:size-5 2xl:size-6 3xl:size-7 4xl:size-9" />}
          {submiting ? "Shortening..." : "Shorten link"}
        </button>
      </div>

      {/* Terms section */}
      <p className="text-center text-xs-movil text-neutral-400 lg:text-xs-desktop-sm lg-2:text-xs-desktop ">
        By proceeding, you agree to our <span className="text-green-400">Terms of Service</span> and
        <span className="text-green-400"> Privacy Policy</span>.
      </p>

      {/* Borders */}
      <div className="absolute -top-[1px] left-10 h-px w-1/3 bg-gradient-to-r from-transparent via-emerald-500 to-transparent "></div>
      <div className="absolute -bottom-[1px] right-10 h-px w-1/3 bg-gradient-to-r from-transparent via-emerald-700 to-transparent "></div>
    </motion.form>
  )
}