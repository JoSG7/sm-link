"use client"

import { useEffect, useState } from "react"
import { useMenuDrawer } from "../../hooks/useModals"
import { useScreenSize } from "../../hooks/useScreenSize"
import { motion } from "framer-motion"
import { IconClockCheck, IconLock } from "@tabler/icons-react"
import { RecentLinks } from "./RecentLinks"
import { LinkDetails } from "@/global"
import { Accordion } from "../ui/Accordion"
import { getLinkDetails } from "../../utils/guest-links"
import { useLinkChanges } from "../../hooks/useLinkChanges"
import { ProtectedLinks } from "./ProtectedLinks"

export function MenuDrawer() {

  const [linkDetails, setLinkDetails] = useState<LinkDetails[] | []>([])
  const [loading, setLoading] = useState(false)
  const { isMenuOpen, toggleMenu } = useMenuDrawer()
  const { linkChanges } = useLinkChanges()
  const width = useScreenSize()
  const isMobile = width < 640
  const isTablet = width >= 640 && width < 1024

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
  const navWidth = isMobile ? "w-full h-[75vh]" :
    isTablet ? "w-4/6 h-full" : "w-1/2 h-full"

  useEffect(() => {
      const fetchRecentLinks = () => {
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

    <motion.section className={`h-screen fixed inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm z-20
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

        <ul className="flex flex-col ">
          <Accordion items={[
            {
              title:
                <li className="p-4 text-lg-movil font-semibold flex justify-between items-center border-t-[1.5px] border-neutral-800  cursor-pointer
                xs:p-5 
                lg:p-4 lg:border-none 
                2xl:p-5 3xl:p-6 4xl:p-8 ">

                  {/* Icon and title */}
                  <div className="flex gap-2 items-center ">
                    <IconClockCheck className="size-6 text-green-500 
                    xs:size-7
                    lg:size-6 " />
                    <span className="text-green-300">Recent</span> SmLinks
                  </div>

                  {/* Total of links */}
                  <span className="text-base-movil lg:text-base-desktop-sm lg-2:text-base-desktop">{linkDetails.length}/7</span>
                </li>,
              content: <RecentLinks data={linkDetails} loading={loading} />
            },
            {
              title:
                <li className="p-4 text-lg-movil font-semibold flex gap-2 items-center border-t-[1.5px] border-neutral-800 
                cursor-pointer
                xs:p-5 lg:p-4 ">

                  {/* Icon and title */}
                  <IconLock className="size-6 text-sky-500 
                  xs:size-7 " />
                  <span className="text-sky-300">Protected</span> Links

                </li>,
              content: <ProtectedLinks data={linkDetails} loading={loading} />
            }
          ]} />

        </ul>
      </motion.nav>
    </motion.section>
  )
}