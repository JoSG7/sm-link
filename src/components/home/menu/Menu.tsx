"use client"

import { IconClockCheck, IconLock } from "@tabler/icons-react"
import { motion } from 'framer-motion'
import { useEffect, useState } from "react"
import { GuestLinks } from "@/types/global"
import { Accordion } from "@/components/shared/Accordion"
import { RecentLinks } from "./RecentLinks"
import { getGuestLinks } from "@/utils/links/api"
import { useLinkChanges, useMenuDrawer } from "@/hooks/useModal"
import { useScreenSize } from "@/hooks/useScreenSize"
// import { DeleteLinkModal } from "@/components/modals/home/DeleteLinkModal"


export function MainMenu() {

  const [recentLinks, setRecentLinks] = useState<GuestLinks[] | []>([])
  const [loading, setLoading] = useState(false)
  const { menu, toggleMenu } = useMenuDrawer()
  const { linkChanges } = useLinkChanges()
  const width = useScreenSize()
  const isMobile = width < 640
  const isTablet = width > 640 && width < 768

  const navVariants = {
    open: {
      x: 0,
      y: 0,
      transition: { type: "tween", duration: 0.1 },
    },
    closed: {
      x: isMobile ? 0 : "100%",
      y: isMobile ? "100%" : 0,
      transition: { type: "tween", duration: 0.1 },
    },
  }

  const navWidth = isMobile ? "w-full h-[560px]" :
    isTablet ? "w-4/6 h-full" : "w-1/2 h-full"


  useEffect(() => {
    const fetchRecentLinks = async () => {
      setLoading(true)
      getGuestLinks().then(res => {
        if (res.length > 0) {
          setRecentLinks(res)
        } else {
          setRecentLinks([])
        }
      })
        .finally(() => setLoading(false))
    }
    fetchRecentLinks()
  }, [linkChanges])


  return (

    <motion.section className={`fixed inset-0 z-20 bg-modal backdrop-blur-sm text-[#E5E7EB] 
      ${menu ? "pointer-events-auto" : "pointer-events-none"}`}
      onClick={toggleMenu} initial={false} animate={{ opacity: menu ? 1 : 0 }} transition={{ duration: 0.1 }} >
      <motion.nav className={`absolute bottom-0 bg-[rgb(7,7,7)] border-[#1c1c1d] overflow-y-auto ${navWidth} sm:right-0 sm:border-l`}
        onClick={(e) => e.stopPropagation()} initial={false} animate={menu ? "open" : "closed"} variants={navVariants}>
        <ul className="flex flex-col">
          <Accordion items={[
            {
              title:
                <li className="border-t border-[#1c1d1d] p-4 text-xl font-semibold flex gap-2 items-center cursor-pointer lg-2:border-none">
                  <IconClockCheck size={24} />
                  Recent Sm Links
                </li>,
              content: <RecentLinks data={recentLinks} loading={loading} />
            },
            {
              title:
                <li className="border-t border-[#1c1d1d] p-4 text-xl font-semibold flex gap-2 items-center cursor-pointer"
                  onClick={() => { toggleMenu() }}>
                  <IconLock size={24} />
                  Protected Links
                </li>,
              content: "SISISI"
            }
          ]} />
        </ul>
      </motion.nav >
    </motion.section >

    // <section className="w-full h-screen fixed hidden bottom-0 bg-modal z-20 backdrop-blur-sm text-[#E5E7EB]" id="bgMenu"
    // onClick={closeMainMenu}>
    //   <nav className="w-full h-0 bg-[rgb(7,7,7)] border-[#1c1c1d] self-end overflow-y-auto duration-100 whitespace-nowrap
    //   sm:w-0 sm:fixed sm:right-0 sm:h-full sm:border-l sm:overflow-x-hidden"
    //   id="menu" onClick={(e) => { e.stopPropagation() }}>
    //     <ul className="option-list flex flex-col ">

    //       <Accordion items={[
    //         {
    //           title:
    //             <li className="border-t border-[#1c1d1d] p-4 text-xl font-semibold flex gap-2 items-center cursor-pointer lg-2:border-none" onClick={fetchRecentLinks}>
    //               <IconClockCheck size={24} />
    //               Recent Sm Links
    //             </li>,
    //           content: <RecentLinks data={recentLinks} loading={loading} />
    //         },
    //         {
    //           title:
    //             <li className="border-t border-[#1c1d1d] p-4 text-xl font-semibold flex gap-2 items-center cursor-pointer"
    //             onClick={() => { toggleMenu() }}>
    //               <IconLock size={24} />
    //               Protected Links
    //             </li>,
    //           content: "SISISI"
    //         }
    //       ]} />
    //     </ul>
    //   </nav>
    // </section>
  )
}

// #e3c45e