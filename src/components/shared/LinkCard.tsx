"use client"

import { IconCalendar, IconClockCheck, IconCopy, IconExternalLink, IconShieldLockFilled, IconTrashFilled } from "@tabler/icons-react"
import { useDeleteLinkModal, usePwdLinkModal } from "@/hooks/useModal"
import { months } from "@/utils/constants"
import { toast } from "sonner"
import Link from "next/link"
import { DeleteLinkModal } from "../../modals/home/DeleteLink"
import { CreatePwdLinkModal } from "../../modals/home/PwdLinkForm"
import { LinkDetails } from "@/types/global"
import { DomainLogo } from "./DomainLogo"

export function LinkCard({ data }: { data: LinkDetails }) {
  const url = new URL(data.original)
  const domain = url.hostname
  const date = new Date(data.created_at)
  const day = date.getDate()
  const month = months[date.getMonth()]
  const { toggleDeleteModal } = useDeleteLinkModal()
  const { togglePwdLinkModal } = usePwdLinkModal()

  return (

    <article className="p-4 rounded-lg border border-[#1c1d1d] whitespace-normal">
      <DeleteLinkModal />
      <CreatePwdLinkModal />
      <div className="flex justify-between items-center pb-4 gap-1">
        <div className="flex flex-col max-w-[240px] sm:max-w-[285px] lg-2:max-w-[400px]">
          <p className="font-semibold">sm-link.vercel.app/{data.short}</p>

          <p className="w-full max-w-[210px] text-sm text-gray-400 mt-1 mb-2 break-words max-h-11 overflow-y-auto
          lg-2:max-w-[400px]">
            {data.original}
          </p>

          <p className="text-sm text-neutral-300 flex gap-1">
            <IconCalendar className="size-5" />
            {day} de {month}
          </p>
        </div>

        <DomainLogo domain={domain} />
      </div>

      {/* Buttons section */}

      <div className="flex justify-end gap-3">

        <button className="p-2 rounded-xl bg-neutral-900 flex gap-1 items-center text-sm"
          onClick={() => { toggleDeleteModal(data.short) }}>
          
          <IconTrashFilled className="size-5 " />
        </button>

        <button className="p-2 rounded-xl bg-neutral-900">
          <IconClockCheck className="size-5"/>
        </button>

        <button className="p-2 rounded-xl bg-neutral-900 disabled:opacity-50"
        onClick={() => { togglePwdLinkModal(data.short) }} disabled={data.has_password}>
          <IconShieldLockFilled className="size-5"/>
        </button>

        <Link href={`https://sm-link.vercel.app/${data.short}`} target="_blank"
          className="p-2 rounded-xl bg-neutral-900 flex gap-1 items-center text-sm">
          
          <IconExternalLink className="size-5 "></IconExternalLink>
        </Link>

        <button className="p-2 rounded-xl bg-neutral-900 flex gap-1 items-center text-sm"
          onClick={() => {
            navigator.clipboard.writeText(`sm-link.vercel.app/${data.short}`).then(() => { toast.success("Copiado Correctamente") })
          }}>
          
          <IconCopy className="size-5 "></IconCopy>
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