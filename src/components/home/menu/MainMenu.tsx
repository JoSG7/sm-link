"use client"

import { IconClockCheck, IconLock } from "@tabler/icons-react"
import { closeMainMenu } from "@/utils/ui/home/menu-functions"

import { useState } from "react"
import { GuessLinks } from "@/types/global"
import { Accordion } from "@/components/shared/Accordion"
import { RecentLinks } from "./RecentLinks"
import { getGuestLinks } from "@/utils/links/api"


export function MainMenu() {

  const [recentLinks, setRecentLinks] = useState<GuessLinks[] | []>([])
  const [loading, setLoading] = useState(false)
  // const bgMenuRef = useRef<HTMLDivElement>(null)

  const fetchRecentLinks = async () => {
    // Si esta vacio, trae los datos
    if (recentLinks.length == 0) {
      setLoading(true)
      getGuestLinks().then(res => {
        // console.log(res)
        if (res.length > 0) {
          setRecentLinks(res)
        } else {
          setRecentLinks([])
        }
      })
        .finally(() => setLoading(false))
    }
  }

  return (

    <section className="w-full h-screen fixed hidden bottom-0 bg-modal z-20 backdrop-blur-sm text-[#E5E7EB]" id="bgMenu"
    onClick={closeMainMenu}>
      <nav className="w-full h-0 bg-[rgb(7,7,7)] border-[#1c1c1d] self-end overflow-y-auto duration-100 whitespace-nowrap
      sm:w-0 sm:fixed sm:right-0 sm:h-full sm:border-l sm:overflow-x-hidden"
      id="menu" onClick={(e) => { e.stopPropagation() }}>
        <ul className="option-list flex flex-col ">

          <Accordion items={[
            {
              title:
                <li className="border-t border-[#1c1d1d] p-4 text-xl font-semibold flex gap-2 items-center cursor-pointer lg-2:border-none" onClick={fetchRecentLinks}>
                  <IconClockCheck size={24} />
                  Recent Sm Links
                </li>,
              content: <RecentLinks data={recentLinks} loading={loading} />
            },
            {
              title:
                <li className="border-t border-[#1c1d1d] p-4 text-xl font-semibold flex gap-2 items-center cursor-pointer">
                  <IconLock size={24} />
                  Protected Links
                </li>,
              content: "SISISI"
            }
          ]} />

          {/* <li className="p-4 text-xl font-semibold flex gap-2 items-center cursor-pointer" onClick={() => alert("sjd")}>
            <IconClockCheck size={24} />
            Your Recent Sm Links
          </li>

          <RecentLinks /> */}

          {/* <li className="p-4 text-xl font-semibold border-y border-[#2e2e2e] flex gap-2 items-center">
            <IconLock size={24} />
            Protected Links
          </li>

          <li className="p-4 text-xl font-semibold border-y border-[#2e2e2e] flex gap-2 items-center">
            <IconClockExclamation size={24} />
            Expirations
          </li> */}


        </ul>
      </nav>
    </section>
  )
}

// #e3c45e