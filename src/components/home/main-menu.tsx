"use client"

import { GitHubAuthButton, GoogleAuthButton } from "./auth-button-client"
import { IconExternalLink, IconCopy, IconClockCheck, IconCode, IconTrash, IconCalendar } from "@tabler/icons-react"
import { closeMainMenu } from "@/utils/ui/home/menu-functions"
import { getGuessLinks } from "@/logic/server-functions"
import { LinkSkeleton } from "@/components/common/skeleton"
import { NoFound } from "@/components/common/no-found"
import { toast } from "sonner"
import { useState } from "react"
import Link from "next/link"
import { months } from "@/utils/constants"

interface GuessResponse{
  id:string
  short: string,
  original: string,
  created_at: string
}
type GuessLinks = GuessResponse[]

export function MainMenu () {

  const [data, setData] = useState<GuessLinks | string>("")
  const [loading, setLoading] = useState(true)

  const LinkCard = ({original, short, created_at}: {original: string, short: string, created_at:string}) => {
    const url = new URL(original)
    const domain = url.hostname
    const date = new Date(created_at)
    const day = date.getDate()
    const month = months[date.getMonth()]

    return(

      <article className="p-4 rounded-md border border-gray-800 whitespace-normal">

        <div className="flex justify-between items-center pb-4 gap-1">
          <div className="flex flex-col max-w-[240px] sm:max-w-[285px]">
            <p className="font-semibold">sm-link.vercel.app/{short}</p>
            <p className="w-full max-w-full text-sm text-gray-400 mt-1 mb-2 break-words max-h-11 overflow-y-auto">{original}</p>
            <p className="text-sm text-neutral-300 flex gap-1">
              <IconCalendar size={20} />
              {day} de {month}</p>
          </div>
          <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} alt="logo" 
          className="w-12 h-12 rounded-full sm:size-14"/>
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
            navigator.clipboard.writeText(`sm-link.vercel.app/${short}`).then(() => {toast.success("Copiado Correctamente")})
          }}>Copiar
            <IconCopy size={18}></IconCopy>
          </button>

        </div>

      </article>

    )

  }

  const handleFunction = async () => {

    const resData: GuessLinks = await getGuessLinks()

    console.log()

    if(resData && resData.length > 0){
      setData(resData)
      setLoading(false)
    }
    if(resData && resData.length == 0){
      setData("null")
      setLoading(false)
    }

  }

  return(

    <section className="w-full h-screen fixed hidden bottom-0 bg-modal z-30 backdrop-blur-sm text-[#E5E7EB]" id="bgMenu" 
    onClick={closeMainMenu}>

      <nav className="w-full h-0 bg-[#0e0e0e] border-[#2e2e2e] self-end overflow-y-auto duration-100 whitespace-nowrap
      sm:w-0 sm:fixed sm:right-0 sm:h-full sm:border-l sm:overflow-x-hidden"
      id="menu" onClick={(e) => { e.stopPropagation() }}>

        <ul className="option-list flex flex-col ">

          <li className="px-4 py-5 border-t border-[#2e2e2e] ">
            <h1 className="text-xl font-semibold pb-3">Inicia sesion con tu cuenta</h1>
            <div className="grid grid-cols-2 gap-4">
              <GitHubAuthButton />
              <GoogleAuthButton />
            </div>
          </li>

          <li className="p-4 text-xl font-semibold border-t border-[#2e2e2e] flex gap-2 items-center"
          onClick={handleFunction}>
            <IconClockCheck size={24} />
            Your Recent Sm Links
          </li>

          <div className="h-0 duration-300 overflow-y-auto" id="recent-links">
            <div className="px-4 pb-4 flex flex-col gap-4">
              {
                typeof data != "string" &&

                data.map((element) => (
                  <LinkCard key={element.id} short={element.short} original={element.original} created_at={element.created_at}/>
                ))
              }
              {
                loading == true &&
                <div className="flex flex-col gap-4">
                  <LinkSkeleton />
                  <LinkSkeleton />
                </div>
              }
              {
                data == "null" &&
                <NoFound />
              }
            </div>
          </div>

          <li className="px-5 py-4 text-xl font-semibold border-y border-[#2e2e2e] flex gap-2 items-center">
            <IconCode size={24} />
            Coming soon
          </li>

        </ul>

      </nav>

    </section>

  )

}

// #e3c45e