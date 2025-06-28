"use client"

import { useLinkChanges } from "@/hooks/useModal";
import { createShortLink } from "@/utils/links/api";
import { IconScissors, IconWand } from "@tabler/icons-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { isURL } from "validator";

export function ShortLinkForm() {

  const [originalLink, setOriginalLink] = useState("")
  const [shortURL, setShortURL] = useState("")
  const { recordLinkChanges } = useLinkChanges()

  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault()
    const loadingToast = toast.loading("Creating short link...")

    if (!isURL(originalLink)) {
      toast.error("Ingrese un link válido", { id: loadingToast })
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
    }
  }

  return (

    <form onSubmit={handleSubmit} className="relative rounded-3xl border p-4 bg-form border-[#1c1d1d] fade-b
    sm:p-7 lg:p-6 lg-2:p-7">

      <div className="flex justify-between">
        <label htmlFor="txtUrl" className="flex items-center gap-3">
          <div className="p-1.5 rounded-full bg-emerald-200 lg-2:block">
            <IconScissors className="size-4 lg-2:size-5 text-green-700"></IconScissors>
          </div>
          <span className="text-lg sm:text-xl text-[#E5E7EB] font-semibold">Paste a long link</span>
        </label>
      </div>

      <input type="url" autoComplete="off" value={originalLink} onChange={(e) => setOriginalLink(e.currentTarget.value)}
        className="w-full py-2 px-4 my-4 border border-zinc-900 text-neutral-400 bg-neutral-950 placeholder:text-neutral-700 rounded-full sm:text-md sm:my-5 lg:p-3 lg-2:rounded-full lg-2:py-3"
        placeholder="Enter a long Link to short" required />

      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-full bg-sky-300 lg-2:block">
          <IconWand className="size-4 lg-2:size-5 text-blue-700"></IconWand>
        </div>
        <span className="text-lg sm:text-xl text-[#E5E7EB] font-semibold">Here the new link</span>
      </div>

      <div className="w-full py-2 px-4 my-4 bg-neutral-950 rounded-full border border-zinc-900 text-neutral-400
      sm:mt-5 lg:p-3 lg-2:rounded-full lg-2:py-3">
        <p className="sm:text-md">sm-link.vercel.app/{shortURL}</p>
      </div>

      <button className="w-full text-center text-black py-2 mt-2 mb-5 rounded-lg bg-gradient-to-r
      sm:text-lg from-neutral-100 to-neutral-400">
        Shorten Link
      </button>

      <p className="text-xs text-neutral-400 text-center">
        By proceeding, you agree to our <span className="text-blue-500">Terms of Service</span> and
        <span className="text-blue-500"> Privacy Policy</span>.
      </p>

    </form>

  )

}