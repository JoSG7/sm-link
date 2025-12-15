"use client"

import { IconBolt } from "@tabler/icons-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { isURL } from "validator"
import { NewLink } from "./NewLink"
import { GuestLinkServices } from "../../services/guest-link.service"
import { useDispatch } from "react-redux"
import { recordChange } from "@/store/link-changes-slice"

export function ShorterForm() {

  const [original, setOriginal] = useState("")
  const [short, setShort] = useState<null | string>(null)
  const [submiting, setSubmiting] = useState(false)

  const dispatch= useDispatch()

  const handleSubmit = (e: FormEvent) => {

    e.preventDefault()
    setSubmiting(true)

    const guestLinkServices = new GuestLinkServices()

    if (!isURL(original)) {

      setSubmiting(false)

    } else {

      guestLinkServices.createLink(original)
        .then(res => {

          if (res.error) {
            toast.error(res.error)
          } else {
            toast.success("Se genero correctamente")
            setShort(res.response)
            dispatch(recordChange())
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
      <form className="text-sm-movil flex rounded-xl bg-neutral-950 overflow-hidden grow
      sm:text-2xl-tablet
      lg:text-lg-desktop-sm
      xl:text-lg-desktop
      3xl:rounded-2xl
      4xl:rounded-3xl"
        onSubmit={handleSubmit}>

        <div className="p-2 pl-3 text-neutral-200 rounded-l-xl border border-r-0 border-neutral-800 grow
        xs:p-3 xs:pl-4
        sm:p-5 sm:pl-6
        lg:p-4 lg:pl-5
        xl:p-4 xl:pl-5
        2xl:p-5 2xl:pl-6
        3xl:p-6 3xl:pl-7 3xl:rounded-l-2xl
        4xl:p-8 4xl:pl-9 4xl:rounded-l-3xl">

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
        disabled:opacity-30
        xs:py-3 xs:px-4 xs:gap-2
        sm:py-5 sm:px-6 sm:gap-3
        lg:py-3 g:px-4 lg:gap-2
        xl:py-3 xl:px-5 xl:gap-1
        2xl:px-6 2xl:gap-2
        3xl:px-7 3xl:gap-3
        4xl:px-9 "
          disabled={submiting}>

          <IconBolt className="size-4 sm:size-7 xs:size-5 lg:size-6 
          2xl:size-7 3xl:size-8 4xl:size-10" />
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