"use client"

import { IconBolt, IconLoader2, IconPaperclip, IconStarFilled } from "@tabler/icons-react";
import { useLinkChanges } from "@/hooks/useLinkChanges";
import { createShortLink } from "@/utils/links/api";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { isURL } from "validator";

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
    <form onSubmit={handleSubmit} className="relative rounded-xl border border-graphite p-4 bg-neutral-950/70 backdrop-blur-sm
    sm:p-7 lg:p-6 lg-2:p-7 lg-2:bg-black">
      {/* Borders */}
      <div className="absolute -top-[1px] left-10 h-px w-1/3 bg-gradient-to-r from-transparent via-emerald-500 to-transparent "></div>
      <div className="absolute -bottom-[1px] right-10 h-px w-1/3 bg-gradient-to-r from-transparent via-emerald-700 to-transparent "></div>

      <div className="flex justify-between">
        <label htmlFor="txtUrl" className="flex items-center gap-3">
          <div className="rounded-full lg-2:block">
            <IconPaperclip className="w-5-fluid h-5-fluid lg-2:size-5 text-emerald-400"></IconPaperclip>
          </div>
          <span className="text-lg-fluid sm:text-xl font-semibold">Paste a long link</span>
        </label>
      </div>

      <input type="url" autoComplete="off" value={originalLink} onChange={(e) => setOriginalLink(e.currentTarget.value)}
        className="w-full py-2 px-4 my-4 text-base-fluid border border-neutral-800 text-neutral-400 bg-neutral-900 rounded-lg
        placeholder:text-neutral-700 
        sm:text-md sm:my-5 lg:p-3 
        lg-2:py-3 lg-2:bg-neutral-950 lg-2:text-lg" 
        placeholder="https://example.com/long-url-to-short" required />

      <div className="flex items-center gap-3">
        <div className="rounded-full lg-2:block">
          <IconStarFilled className="w-5-fluid h-5-fluid lg-2:size-5 text-emerald-400"></IconStarFilled>
        </div>
        <span className="text-lg-fluid sm:text-xl font-semibold">Here is the new link</span>
      </div>

      <div className="w-full py-2 px-4 my-4 mb-5 bg-neutral-900 rounded-lg border border-neutral-800 text-neutral-300
        sm:mt-5 lg:p-3 lg-2:py-3 lg-2:bg-neutral-950">
        <p className="text-base-fluid lg-2:text-lg">sm-link.vercel.app/{shortURL}</p>
      </div>

      <div className="flex justify-center">
        <button className="w-full flex items-center justify-center gap-2 py-2 mt-2 mb-7 text-base-fluid
        bg-gradient-to-r rounded-lg from-green-500 to-blue-700 font-medium
        disabled:opacity-50 sm:text-lg" disabled={submiting}>
          {submiting ? <IconLoader2 className="size-4 animate-spin lg-2:size-5" /> : <IconBolt className="size-4 lg-2:size-5" />}
          {submiting ? "Shortening..." : "Shorten link"}
        </button>
      </div>

      <p className="text-xs-fluid text-neutral-400 text-center sm:text-sm lg-2:text-xs">
        By proceeding, you agree to our <span className="text-green-400">Terms of Service</span> and
        <span className="text-green-400"> Privacy Policy</span>.
      </p>
    </form>
  )
}