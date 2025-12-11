"use client"

import { IconCalendar, IconClockCheck, IconCopy, IconExternalLink, IconShieldLockFilled, IconTrashFilled } from "@tabler/icons-react"
import { useDeleteLinkModal, useSetLinkExpirationModal, useSetLinkPasswordModal } from "../../hooks/useModals"
import { months } from "@/consts"
import { toast } from "sonner"
import { LinkDetails } from "@/global"
import { DomainLogo } from "../../components/ui/DomainLogo"
import Link from "next/link"

export function LinkCard({ data }: { data: LinkDetails }) {

  const url = new URL(data.original)
  const domain = url.hostname
  const date = new Date(data.created_at)
  const day = date.getDate()
  const month = months[date.getMonth()]
  const { toggleDeleteLinkModal } = useDeleteLinkModal()
  const { toggleSetLinkPasswordModal } = useSetLinkPasswordModal()
  const { toggleSetLinkExpirationModal } = useSetLinkExpirationModal()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`sm-link.vercel.app/${data.short}`).then(() => { toast.success("Copiado Correctamente") })
  }

  return (

    <article className="p-4 rounded-lg border border-graphite whitespace-normal duration-300 ease-out border-l-2 
    xs:p-5 md:p-6 lg:p-4
    2xl:p-5 3xl:p-6 4xl:p-8">

      <section className="grow flex items-center pb-4 gap-5
      xs:pb-5 xs:gap-5
      sm:pb-6 sm:gap-6
      md:pb-7 md:gap-7
      lg:pb-4 lg:gap-10 
      2xl:pb-5 2xl:gap-12
      3xl:pb-6 3xl:gap-14
      4xl:pb-8 4xl:gap-20">

        <div className="flex flex-col grow text-sm
        xs:text-sm-movil
        sm:text-lg-tablet 
        lg:text-lg
        xl:text-base-desktop">

          {/* Short Link */}
          <p className="font-semibold text-nowrap text-transparent bg-clip-text 
          bg-gradient-to-r from-green-400 to-blue-500 ">
            sm-link.vercel.app/{data.short}
          </p>

          {/* Original Link */}
          <p className="max-h-[42px] mt-1 mb-2 break-all overflow-y-auto text-neutral-200
          xs:max-h-12 xs:mt-2 xs:mb-3
          sm:max-h-14 sm:mt-3 sm:mb-4
          md:max-h-16 md:mt-4 md:mb-5
          lg:max-h-14 lg:mt-2 lg:mb-3 
          xl:max-h-[52px]
          2xl:max-h-[60px] 2xl:mt-2.5 2xl:mb-3.5
          3xl:max-h-[72px] 3xl:mt-3 3xl:mb-4
          4xl:max-h-[95px] 4xl:mt-4 4xl:mb-5">
            {data.original}
          </p>

          {/* Creation date */}
          <p className=" flex gap-1 text-green-300 items-center
          xs:gap-2 md:gap-3 lg:gap-1 
          2xl:gap-2 3xl:gap-3 ">

            <IconCalendar className="size-5 text-green-500 
            xs:size-6 sm:size-7 md:size-8 lg:size-5 
            2xl:size-6 3xl:size-7 4xl:size-10" />
            {day} de {month}
          </p>
        </div>

        {/* Link Logo */}
        <DomainLogo domain={domain} />
      </section>

      {/* Buttons section */}
      <div className="flex justify-end gap-3 
      xs:gap-4 sm:gap-5 md:gap-6 lg:gap-4
      xl:gap-3 2xl:gap-4 3xl:gap-5 4xl:gap-7">

        {/* Delete button */}
        <button className="p-2 rounded-xl bg-neutral-900 cursor-pointer
        2xl:p-2.5 3xl:p-3 3xl:rounded-2xl
        4xl:p-4 4xl:rounded-3xl"
          onClick={() => { toggleDeleteLinkModal(data.short) }}>

          <IconTrashFilled className="size-5 
          xs:size-6 md:size-7 lg:size-5  
          2xl:size-6 3xl:size-7 4xl:size-10 " />
        </button>

        {/* Expiration Button */}
        <button className="p-2 rounded-xl bg-neutral-900 cursor-pointer disabled:opacity-50 disabled:cursor-auto
        2xl:p-2.5 3xl:p-3 3xl:rounded-2xl
        4xl:p-4 4xl:rounded-3xl"
          onClick={() => { toggleSetLinkExpirationModal(data.short) }}
          disabled={data.has_expiration}>

          <IconClockCheck className="size-5 
          xs:size-6 md:size-7 lg:size-5  
          2xl:size-6 3xl:size-7 4xl:size-10" />
        </button>

        {/* Protected Button */}
        <button className="p-2 rounded-xl bg-neutral-900 cursor-pointer disabled:opacity-50 disabled:cursor-auto
        2xl:p-2.5 3xl:p-3 3xl:rounded-2xl
        4xl:p-4 4xl:rounded-3xl"
          onClick={() => { toggleSetLinkPasswordModal(data.short) }}
          disabled={data.has_password}>

          <IconShieldLockFilled className="size-5 
          xs:size-6 md:size-7 lg:size-5  
          2xl:size-6 3xl:size-7 4xl:size-10" />
        </button>

        {/* Visit button */}
        <Link className="p-2 rounded-xl bg-neutral-900 
        2xl:p-2.5 3xl:p-3 3xl:rounded-2xl
        4xl:p-4 4xl:rounded-3xl"
          href={`https://sm-link.vercel.app/${data.short}`}
          target="_blank"
        >
          <IconExternalLink className="size-5 
          xs:size-6 md:size-7 lg:size-5  
          2xl:size-6 3xl:size-7 4xl:size-10" />
        </Link>

        {/* Copy button */}
        <button className="p-2 rounded-xl bg-neutral-900 cursor-pointer
        2xl:p-2.5 3xl:p-3 3xl:rounded-2xl
        4xl:p-4 4xl:rounded-3xl"
          onClick={copyToClipboard}>

          <IconCopy className="size-5 
          xs:size-6 md:size-7 lg:size-5  
          2xl:size-6 3xl:size-7 4xl:size-10" />
        </button>
      </div>
    </article>
  )
}


