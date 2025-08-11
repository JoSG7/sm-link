"use client"

import { IconClockCheck, IconLock } from "@tabler/icons-react"
import { motion } from 'framer-motion'
import { useEffect, useState } from "react"
import { LinkDetails } from "@/types/global"
import { Accordion } from "@/components/shared/Accordion"
import { RecentLinks } from "./RecentLink"
import { getLinkDetails } from "@/utils/links/api"
import { useMenuDrawer } from "@/hooks/useModal"
import { useScreenSize } from "@/hooks/useScreenSize"
import { ProtectedLinks } from "./ProtectedLink"
import { useLinkChanges } from "@/hooks/useLinkChanges"

export function MainMenu() {

  const [linkDetails, setLinkDetails] = useState<LinkDetails[] | []>([])
  const [loading, setLoading] = useState(false)
  const { isMenuOpen, toggleMenu } = useMenuDrawer()
  const { linkChanges } = useLinkChanges()
  const width = useScreenSize()
  const isMobile = width < 640
  const isTablet = width >= 640 && width < 768

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
      getLinkDetails().then(res => {
        if (res.length > 0) {
          // console.log(res)
          setLinkDetails(res)
        } else {
          setLinkDetails([])
        }
      })
        .finally(() => setLoading(false))
    }
    fetchRecentLinks()
  }, [linkChanges])

  return (

    <motion.section className={`h-screen fixed inset-0 z-20 bg-modal backdrop-blur-sm text-[#E5E7EB]
      ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      onClick={toggleMenu}
      initial={false}
      animate={{ opacity: isMenuOpen ? 1 : 0 }}
      transition={{ duration: 0.1 }} >

      <motion.nav className={`absolute bottom-0 bg-[rgb(7,7,7)] max-w-[1270px] border-graphite overflow-y-auto ${navWidth} 
      sm:right-0 sm:border-l`}
        onClick={(e) => e.stopPropagation()}
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={navVariants}>

        <ul className="flex flex-col">
          <Accordion items={[
            {
              title:
                <li className="border-t border-graphite p-4 text-xl-movil font-semibold flex justify-between items-center cursor-pointer
                xs:p-5 lg:p-4 lg:border-none 
                2xl:p-5 3xl:p-6 4xl:p-8 ">
                  <div className="flex gap-2 items-center 
                  lg:text-xl-desktop-sm
                  lg-2:text-xl-desktop
                  2xl:gap-3 3xl:gap-4 4xl:gap-6 ">
                    <IconClockCheck className="size-6 text-green-500 xs:size-7
                    lg:size-6
                    2xl:size-7
                    3xl:size-8
                    4xl:size-10" />
                    <span className="text-green-300">Recent</span> SmLinks
                  </div>

                  <span className="text-base-movil lg:text-base-desktop-sm lg-2:text-base-desktop">{linkDetails.length}/7</span>
                </li>,
              content: <RecentLinks data={linkDetails} loading={loading} />
            },
            {
              title:
                <li className="border-t border-graphite p-4 text-xl-movil font-semibold flex gap-2 items-center cursor-pointer
                xs:p-5 lg:p-4 lg:text-xl-desktop-sm
                lg-2:text-xl-desktop 
                2xl:p-5 2xl:gap-3
                3xl:p-6 3xl:gap-4
                4xl:p-8 4xl:gap-6">
                  <IconLock className="size-6 text-sky-500 xs:size-7 
                  lg:size-6 
                  2xl:size-7 
                  3xl:size-8
                  4xl:size-10" />
                  <span className="text-sky-300">Protected</span> Links
                </li>,
              content: <ProtectedLinks data={linkDetails} loading={loading} />
            }
          ]} />
        </ul>
      </motion.nav >
    </motion.section >
  )
}

// #e3c45e
