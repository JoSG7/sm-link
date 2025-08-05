"use client"

import { IconCalendar, IconClockCheck, IconCopy, IconExternalLink, IconShieldLockFilled, IconTrashFilled } from "@tabler/icons-react"
import { months } from "@/utils/constants"
import { toast } from "sonner"
import Link from "next/link"
import { DeleteLinkModal } from "../../modals/home/DeleteLink"
import { CreatePwdLinkModal } from "../../modals/home/PwdLinkForm"
import { LinkDetails } from "@/types/global"
import { DomainLogo } from "./DomainLogo"
import { SetLinkExpirationModal } from "@/modals/home/LinkExpiration"
import { useAddExpirationModal, useAddPasswordModal, useDeleteLinkModal } from "@/hooks/useModal"

export function LinkCard({ data }: { data: LinkDetails }) {
  const url = new URL(data.original)
  const domain = url.hostname
  const date = new Date(data.created_at)
  const day = date.getDate()
  const month = months[date.getMonth()]
  const { toggleDeleteModal } = useDeleteLinkModal()
  const { toggleAddPasswordModal } = useAddPasswordModal()
  const { toggleAddExpirationModal } = useAddExpirationModal()

  return (

    <article className="p-4 rounded-lg border border-graphite whitespace-normal duration-300 ease-out border-l-2 
    hover:border-l-sky-400
    2xl:p-5">
      <DeleteLinkModal />
      <CreatePwdLinkModal />
      <SetLinkExpirationModal />
      <div className="flex justify-between items-center pb-4 2xl:pb-5">
        <div className="flex flex-col max-w-[240px] sm:max-w-[285px] lg-2:max-w-[400px] 2xl:max-w-[700px]">
          <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500
          lg-2:text-base-desktop">
            sm-link.vercel.app/{data.short}
          </p>

          <p className="w-full max-w-[210px] text-sm text-neutral-200 mt-1 mb-2 break-words max-h-11 overflow-y-auto
          lg-2:max-w-[500px] lg-2:mt-2 lg-2:mb-3 lg-2:text-sm-desktop
          2xl:max-h-14 ">
            {data.original}
          </p>

          <p className="text-sm flex gap-1 text-sky-300 
          lg-2:text-sm-desktop">
            <IconCalendar className="size-5 text-sky-400 2xl:size-6" />
            {day} de {month}
          </p>
        </div>

        <DomainLogo domain={domain} />
      </div>

      {/* Buttons section */}

      <div className="flex justify-end gap-3 2xl:gap-4">

        {/* Delete button */}
        <button className="p-2 rounded-xl bg-neutral-900 flex gap-1 items-center text-sm"
          onClick={() => { toggleDeleteModal(data.short) }}>
          <IconTrashFilled className="size-5 2xl:size-6" />
        </button>

        {/* Expiration Button */}
        <button className="p-2 rounded-xl bg-neutral-900 disabled:opacity-50" 
        onClick={() => { toggleAddExpirationModal(data.short) }} disabled={data.has_expiration}>
          <IconClockCheck className="size-5 text-emerald-300 2xl:size-6"/>
        </button>

        {/* Protected Button */}
        <button className="p-2 rounded-xl bg-neutral-900 disabled:opacity-50"
        onClick={() => { toggleAddPasswordModal(data.short) }} disabled={data.has_password}>
          <IconShieldLockFilled className="size-5 text-sky-300 2xl:size-6"/>
        </button>

        {/* Visit button */}
        <Link href={`https://sm-link.vercel.app/${data.short}`} target="_blank"
          className="p-2 rounded-xl bg-neutral-900 flex gap-1 items-center text-sm">
          <IconExternalLink className="size-5 text-emerald-300 2xl:size-6"></IconExternalLink>
        </Link>

        {/* Copy button */}
        <button className="p-2 rounded-xl bg-neutral-900 flex gap-1 items-center text-sm"
          onClick={() => {
            navigator.clipboard.writeText(`sm-link.vercel.app/${data.short}`).then(() => { toast.success("Copiado Correctamente") })
          }}>
          <IconCopy className="size-5 text-sky-300 2xl:size-6"></IconCopy>
        </button>
      </div>
    </article>
  )
}


{/* <button className="py-2 px-2.5 rounded-xl bg-red-200 text-red-500 flex gap-1 items-center text-sm"
          onClick={() => { toggleDeleteModal(short) }}>
          Borrar
          <IconTrash className="size-5 " />
        </button>

        <Link href={`https://sm-link.vercel.app/${short}`} target="_blank"
          className="py-2 px-2.5 rounded-xl bg-emerald-200 text-green-500 flex gap-1 items-center text-sm">
          Visitar
          <IconExternalLink className="size-5 "></IconExternalLink>
        </Link>

        <button className="py-2 px-3 rounded-xl bg-yellow-100 text-amber-500 flex gap-1 items-center text-sm"
          onClick={() => {
            navigator.clipboard.writeText(`sm-link.vercel.app/${short}`).then(() => { toast.success("Copiado Correctamente") })
          }}>
          Copiar
          <IconCopy className="size-5 "></IconCopy>
        </button> */}