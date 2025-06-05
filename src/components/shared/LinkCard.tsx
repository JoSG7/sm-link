import { IconCalendar, IconCopy, IconExternalLink, IconTrash } from "@tabler/icons-react"
import { months } from "@/utils/constants"
import { toast } from "sonner"
import Link from "next/link"
import Image from "next/image"

export function LinkCard({ original, short, created_at }: { original: string, short: string, created_at: string }) {
  const url = new URL(original)
  const domain = url.hostname
  const date = new Date(created_at)
  const day = date.getDate()
  const month = months[date.getMonth()]

  return (

    <article className="p-4 rounded-lg border border-gray-800 whitespace-normal">

      <div className="flex justify-between items-center pb-4 gap-1">
        <div className="flex flex-col max-w-[240px] sm:max-w-[285px] lg-2:max-w-[400px]">
          <p className="font-semibold">sm-link.vercel.app/{short}</p>
          <p className="w-full max-w-full text-sm text-gray-400 mt-1 mb-2 break-words max-h-11 overflow-y-auto">{original}</p>
          <p className="text-sm text-neutral-300 flex gap-1">
            <IconCalendar size={20} />
            {day} de {month}</p>
        </div>
        <Image src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} alt="logo" width={60} height={60}
        className="w-12 h-12 rounded-full sm:size-14" />
      </div>

      {/* Buttons section */}

      <div className="flex justify-end gap-3">

        <button className="py-1 px-3 rounded-xl bg-red-700 flex gap-1 items-center text-sm"
          onClick={() => alert("comming soon")}>Borrar
          <IconTrash size={18} />
        </button>

        <Link href={`https://sm-link.vercel.app/${short}`} target="_blank" className="py-1 px-3 rounded-xl bg-[#055333] flex gap-1 items-center text-sm">Visitar
          <IconExternalLink size={18}></IconExternalLink>
        </Link>

        <button className="py-1 px-3 rounded-xl bg-[#118729] flex gap-1 items-center text-sm"
          onClick={() => {
            navigator.clipboard.writeText(`sm-link.vercel.app/${short}`).then(() => { toast.success("Copiado Correctamente") })
          }}>Copiar
          <IconCopy size={18}></IconCopy>
        </button>

      </div>

    </article>

  )

}