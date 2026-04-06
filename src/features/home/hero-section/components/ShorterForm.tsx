"use client"

import { IconBolt, IconPaperclip } from "@tabler/icons-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { isURL } from "validator"
import { NewLink } from "./NewLink"
import { GuestLinkServices } from "../../../../services/guest-link.service"
import { useDispatch } from "react-redux"
import { recordChange } from "@/store/link-changes-slice"

export function ShorterForm() {

  const [original, setOriginal] = useState("")
  const [short, setShort] = useState<null | string>(null)
  const [submiting, setSubmiting] = useState(false)
  const dispatch = useDispatch()


  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault()

    if (!isURL(original)) {

      toast.error("Invalid URL")

    } else {

      setSubmiting(true)

      try {

        const { response } = await new GuestLinkServices().createSmLink(original)
        setShort(response)
        dispatch(recordChange())
        toast.success("Succes")

      } catch (e) {

        toast.error((e as Error).message)

      } finally {

        setSubmiting(false)
        setOriginal("")

      }
    }
  }


  return (
    <>
      <section className="rounded-3xl flex-col justify-center relative
      lg:p-5 lg:h-full lg:flex lg:bg-neutral-950
      lg:shadow-[0px_32px_64px_-16px_transparent,0px_16px_32px_-8px_transparent,0px_8px_16px_-4px_transparent,0px_4px_8px_-2px_transparent,0px_-8px_16px_-1px_transparent,0px_2px_4px_-1px_transparent,0px_0px_0px_1px_transparent,inset_0px_0px_0px_1px_rgba(255,255,255,0.1),inset_0px_1px_0px_rgb(255,255,255,0.1)]">

        <div className="absolute -top-5 right-5 hidden py-2 px-4 rounded-full border-1.5 border-neutral-800/70 lg:block bg-neutral-950 text-sm">
          No log in is required
        </div>

        <form className="overflow-hidden "
          onSubmit={handleSubmit}>

          <label className="hidden pb-4 items-center gap-2 font-medium lg:flex">
            <IconPaperclip className="size-4" />
            Paste a long URL
          </label>

          <section className="flex text-base sm:text-lg lg:text-sm">

            <article className="flex flex-1">
              <input className="w-full p-3 text-neutral-200 outline-none rounded-s-lg border-1.5 border-r-0 bg-neutral-900/80
              border-neutral-800 placeholder:text-neutral-500 focus:border-green-400 "
                placeholder="https://exmpl.com/long-url"
                disabled={submiting}
                autoComplete="off"
                value={original}
                type="url"
                required
                onChange={(e) => setOriginal(e.currentTarget.value.trim())} />
            </article>

            <button className="p-3 px-4 flex gap-1 justify-center items-center rounded-r-lg cursor-pointer
            bg-gradient-to-r from-green-500 to-blue-700 
            disabled:opacity-30 lg:px-5"
              disabled={submiting}>

              <IconBolt className="size-5 xl:size-6 " />
              <span className="">Short</span>
            </button>

          </section>

          <NewLink short={short} />

        </form>

        <p className="mt-6 text-start text-neutral-300/90 text-xs
        sm:text-sm sm:text-center lg:block lg:text-xs">
          By proceeding, you agree to our
          <span className="text-blue-400"> Terms of Service </span>
          and
          <span className="text-blue-400"> Privacy Policy</span>.
        </p>

      </section>
    </>
  )
}