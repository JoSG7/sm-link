"use client"

import { closeOptionsMenu } from "@/logic/functions"
import { IconExternalLink, IconCopy } from "@tabler/icons-react"
import { useState } from "react"

export function OptionsMenu () {

  const [originalLink, setOriginalLink] = useState("")
  const [shortLink, setShortLink] = useState("")

  const LinkCard = ({original, short}: {original: String, short: String}) => {

    return(

      <article className="p-4 rounded-md border border-gray-800">

        <p className="font-semibold">{short}</p>

        <p className="max-w-[295px] text-sm text-gray-400 pt-1 pb-3 break-words">
          {original}
        </p>

        <div className="flex gap-2">

          <button className="flex justify-center items-center rounded-md py-2 px-3 bg-sky-600">
            <IconExternalLink size={21}></IconExternalLink>
          </button>

          <button className="flex justify-center text-sm items-center rounded-md py-1 px-3 bg-lime-600 opacity-75">Rename</button>

          <button className="flex justify-center items-center rounded-md py-2 px-3 bg-lime-600">
            <IconCopy size={21}></IconCopy>
          </button>

        </div>  

      </article>

    )

  }

  return(

    <section className="w-full h-full absolute hidden bottom-0 left-0 bg-modal z-10 backdrop-blur-sm" id="bgMenu" onClick={closeOptionsMenu}>

      <nav className="w-full h-0 bg-neutral-900 rounded-t-lg border-t border-gray-800 self-end 
      duration-200" id="menu">

        <h1 className="px-5 py-4 text-xl text-lime-200 font-semibold border-b border-gray-800">Your Recent Sm Links</h1>

        <ul className="max-h-[324px] p-4 flex flex-col gap-3 overflow-y-auto">

          <LinkCard short="sm-link.vercel.app/sdfgg" original="hhtpd://sdghsghdfd.com" />

        </ul>

      </nav>

    </section>

  )

}