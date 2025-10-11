"use client"

import { IconBolt } from "@tabler/icons-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { isURL } from "validator"
import { createShortLink } from "../../utils/guest-links"
import { useLinkChanges } from "../../hooks/useLinkChanges"
import { NewLink } from "./NewLink"

export function ShorterForm() {

  const [original, setOriginal] = useState("")
  const [short, setShort] = useState<null | string>(null)
  const [submiting, setSubmiting] = useState(false)

  const { recordLinkChanges } = useLinkChanges()

  const handleSubmit = (e: FormEvent) => {

    e.preventDefault()
    setSubmiting(true)
    const loadingToast = toast.loading("Creating short link...")

    if (!isURL(original)) {
      toast.error("Ingrese un link válido", { id: loadingToast })
      setSubmiting(false)
    } else {

      createShortLink(original).then(res => {
        if (res.error) {
          toast.error(res.error, { id: loadingToast })
        } else {
          toast.success("Se genero correctamente", { id: loadingToast })
          setShort(res.response)
          recordLinkChanges()
        }
      })
        .finally(() => {
          setSubmiting(false)
          setOriginal("")
        })
    }
  }

  return (
    <>
      <form className="w-full text-sm-movil flex rounded-xl bg-neutral-950 border border-neutral-800 overflow-hidden
      sm:text-2xl-tablet
      xl:w-[75vw] xl:text-xl"
        onSubmit={handleSubmit}>

        <div className="p-2 pl-3 text-neutral-200 grow
        xs:p-3 xs:pl-4
        sm:p-5 sm:pl-6
        xl:p-3 xl:pl-5">

          <input className="w-full outline-none placeholder:text-neutral-700 mask-r-from-90%"
            placeholder="https://example.com/long-url-to-short"
            disabled={submiting}
            autoComplete="off"
            value={original}
            type="url"
            required
            onChange={(e) => setOriginal(e.currentTarget.value.trim())} />

        </div>

        <button className="py-2 px-3 flex gap-1 items-center bg-gradient-to-r from-green-500 to-blue-700 cursor-pointer
        xs:py-3 xs:px-4 xs:gap-2
        sm:py-5 sm:px-6 sm:gap-3
        xl:py-3 xl:px-5 xl:gap-1"
          disabled={submiting}>
          <IconBolt className="size-4 sm:size-7 xs:size-5 xl:size-5" />
          Short
        </button>

      </form>

      {/* Here’s the new link inside the #new-link container. */}
      {
        short && <NewLink short={short} />
      }
    </>
  )
}