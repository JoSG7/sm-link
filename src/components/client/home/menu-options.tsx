"use client"

import { closeOptionsMenu, getGuessShortLink } from "@/logic/functions"
import { IconExternalLink, IconCopy } from "@tabler/icons-react"
import Link from "next/link"
import { useState } from "react"

interface GuessResponse{
  id:string
  short: string,
  original: string
}
type GuessLinks = GuessResponse[]

export function OptionsMenu () {

  const [data, setData] = useState<GuessLinks | string>("")
  const [loading, setLoading] = useState(true)

  const LinkCard = ({original, short}: {original: string, short: string}) => {

    return(

      <article className="p-4 rounded-md border border-gray-800">

        <p className="font-semibold">sm-link.vercel.app/{short}</p>

        <p className="max-w-[295px] text-sm text-gray-400 pt-1 pb-3 break-words">
          {original}
        </p>

        <div className="flex gap-2">

          <Link href={original} target="_blank" className="flex justify-center items-center rounded-md py-2 px-3 bg-sky-600">
            <IconExternalLink size={21}></IconExternalLink>
          </Link>

          <button className="flex justify-center text-sm items-center rounded-md py-1 px-3 bg-lime-600 opacity-75">Rename</button>

          <button className="flex justify-center items-center rounded-md py-2 px-3 bg-lime-600">
            <IconCopy size={21}></IconCopy>
          </button>

        </div>  

      </article>

    )

  }

  const handleFunction = async () => {

    const resData: GuessLinks = await getGuessShortLink()

    if(resData && resData.length > 0){

      setData(resData)
      setLoading(false)

    }
    if(resData && resData.length == 0){

      setData("null")

    }

  }

  return(

    <section className="w-full h-full absolute hidden bottom-0 left-0 bg-modal z-10 backdrop-blur-sm" id="bgMenu" onClick={closeOptionsMenu}>

      <nav className="w-full h-0 bg-neutral-900 rounded-t-lg border-t border-gray-800 self-end 
      duration-200" id="menu" onClick={(e) => { e.stopPropagation() }}>

        <li className="px-5 py-4 text-xl text-lime-200 font-semibold border-b border-gray-800"
        onClick={handleFunction}>Your Recent Sm Links</li>

        <ul className="h-0 max-h-[320px] px-4 flex flex-col gap-3 overflow-y-auto duration-200">

          {
            typeof data != "string" &&

            data.map((element) => (
              <LinkCard key={element.id} short={element.short} original={element.original} />
            ))
          }

          {
            loading == true &&
            <h1>Cargando</h1>
          }

          {
            data == "null" &&
            <h1>No hay</h1>
          }

        </ul>

        <li className="px-5 py-4 text-xl text-lime-200 font-semibold border-y border-gray-800"
        >Recurses</li>

      </nav>

    </section>

  )

}