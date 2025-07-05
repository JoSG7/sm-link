"use client"

import { useLinkChanges } from "@/hooks/useModal";
import { createShortLink } from "@/utils/links/api";
import { IconLoader2, IconPaperclip, IconScissors } from "@tabler/icons-react";
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
        .finally(() => setSubmiting(false))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative rounded-3xl border p-4 bg-neutral-950 border-[#1c1d1d]
        sm:p-7 lg:p-6 lg-2:p-7 lg-2:bg-black">

      <div className="flex justify-between">
        <label htmlFor="txtUrl" className="flex items-center gap-3">
          <div className="p-1.5 rounded-full bg-gray-800 lg-2:block">
            <IconPaperclip className="size-5 lg-2:size-5 text-gold"></IconPaperclip>
          </div>
          <span className="text-lg sm:text-xl text-[#E5E7EB] font-semibold">Paste a long link</span>
        </label>
      </div>

      <input type="url" autoComplete="off" value={originalLink} onChange={(e) => setOriginalLink(e.currentTarget.value)}
        className="w-full py-2 px-4 my-4 border border-zinc-900 text-neutral-400 bg-neutral-900 placeholder:text-neutral-700 rounded-full sm:text-md sm:my-5 lg:p-3 lg-2:rounded-full lg-2:py-3 lg-2:bg-neutral-950"
        placeholder="Enter a long Link to short" required />

      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-full bg-gray-800 lg-2:block">
          <IconScissors className="size-5 lg-2:size-5 text-gold"></IconScissors>
        </div>
        <span className="text-lg sm:text-xl text-[#E5E7EB] font-semibold">Here the new link</span>
      </div>

      <div className="w-full py-2 px-4 my-4 mb-5 bg-neutral-900 rounded-full border border-zinc-900 text-neutral-400
        sm:mt-5 lg:p-3 lg-2:rounded-full lg-2:py-3 lg-2:bg-neutral-950">
        <p className="sm:text-md">sm-link.vercel.app/{shortURL}</p>
      </div>

      <div className="flex justify-center">
        <button className="w-full flex items-center justify-center gap-3 py-2 mt-2 mb-7 rounded-lg disabled:opacity-50 bg-gray-800
        sm:text-lg" disabled={submiting}>
          {submiting ? <IconLoader2 className="size-4 animate-spin" /> : ""}
          {submiting ? "Shortening..." : "Shorten link"}
        </button>
      </div>

      <p className="text-xs text-neutral-400 text-center sm:text-sm lg-2:text-xs">
        By proceeding, you agree to our <span className="text-stone-100">Terms of Service</span> and
        <span className="text-stone-100"> Privacy Policy</span>.
      </p>
    </form>
  )
}