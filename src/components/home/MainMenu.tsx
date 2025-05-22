"use client"

import { GitHubAuthButton, GoogleAuthButton } from "./AuthButtonClient"
import { IconClockCheck, IconCode } from "@tabler/icons-react"
import { closeMainMenu } from "@/utils/ui/home/menu-functions"
import { getGuessLinks } from "@/logic/server-functions"

import { NoFound } from "@/components/shared/NoFound"
import { useState } from "react"
import { LinkCard } from "../shared/LinkCard"
import { LinkSkeleton } from "../shared/skeleton"

interface GuessLinks {
  id: string
  short: string,
  original: string,
  created_at: string
}

export function MainMenu() {

  const [data, setData] = useState<GuessLinks[] | string>("")
  const [loading, setLoading] = useState(true)

  const handleFunction = async () => {

    const resData: GuessLinks[] = await getGuessLinks()

    if (resData && resData.length > 0) {
      setData(resData)
      setLoading(false)
    }
    if (resData && resData.length == 0) {
      setData("null")
      setLoading(false)
    }

  }

  return (

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
                  <LinkCard key={element.id} short={element.short} original={element.original} created_at={element.created_at} />
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