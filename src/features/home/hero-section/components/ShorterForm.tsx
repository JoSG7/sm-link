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
      <section className="rounded-lg flex-col justify-center xl:p-6 xl:h-full xl:flex 
      xl:border-[1.5px] xl:border-neutral-900 xl:bg-neutral-950/50">

        <form className="overflow-hidden "
          onSubmit={handleSubmit}>

          <label className="hidden pb-5 items-center gap-2 text-lg font-medium xl:flex">
            <IconPaperclip className="size-5" />
            Paste a long URL
          </label>

          <section className="flex">

            <input className="w-full p-2 pl-3 pr-4 text-neutral-200 outline-none rounded-l-lg border-[1.5px] 
            border-r-0 border-neutral-800 grow placeholder:text-neutral-700 focus:border-green-400 
            sm:p-3"
              placeholder="https://example.com/long-url-to-short"
              disabled={submiting}
              autoComplete="off"
              value={original}
              type="url"
              required
              onChange={(e) => setOriginal(e.currentTarget.value.trim())} />

            <button className="py-2 px-3 flex gap-1 items-center rounded-r-lg bg-gradient-to-r from-green-500 to-blue-700 
            cursor-pointer disabled:opacity-30 xl:px-5"
              disabled={submiting}>

              <IconBolt className="size-5 lg:size-6 " />
              Short
            </button>

          </section>
        </form>

        <div id="new-link" />

        <p className="mt-6 text-center text-neutral-400 text-xs
        lg:block ">
          By proceeding, you agree to our
          <span className="text-blue-400"> Terms of Service </span>
          and
          <span className="text-blue-400"> Privacy Policy</span>.
        </p>

      </section>


      {/* Here’s the new link inside the #new-link container. */}
      {
        short && <NewLink short={short} />
      }
    </>
  )
}