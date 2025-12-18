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

      toast.error("Invalid URL")
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
      <form className="flex rounded-lg overflow-hidden grow "
        onSubmit={handleSubmit}>

        <div className="text-neutral-200 grow ">

          <input className="w-full p-2 pl-3 pr-4 outline-none rounded-l-lg border-[1.5px] border-r-0 border-neutral-800
          placeholder:text-neutral-700 focus:border-green-400 "
            placeholder="https://example.com/long-url-to-short"
            disabled={submiting}
            autoComplete="off"
            value={original}
            type="url"
            required
            onChange={(e) => setOriginal(e.currentTarget.value.trim())} />

        </div>

        <button className="py-2 px-3 flex gap-1 items-center bg-gradient-to-r from-green-500 to-blue-700 cursor-pointer
        disabled:opacity-30 "
          disabled={submiting}>

          <IconBolt className="size-5 lg:size-6 " />
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