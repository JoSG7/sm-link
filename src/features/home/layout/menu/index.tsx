"use client"

import { useEffect, useState } from "react"
import { useMenuDrawer } from "../../hooks/useModals"
import { useScreenSize } from "../../hooks/useScreenSize"
import { motion } from "framer-motion"
import { IconClockCheck, IconLock } from "@tabler/icons-react"
import { RecentLinks } from "./RecentLinks"
import { LinkDetails } from "@/global"
import { Accordion } from "../../components/ui/Accordion"
import { useLinkChanges } from "../../hooks/useLinkChanges"
import { ProtectedLinks } from "./ProtectedLinks"
import { GuestLinkServices } from "../../services/guest-link.service"

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
      const guestLinkServices = new GuestLinkServices()

      guestLinkServices.getLinks()
        .then(res => {
          console.log(res)
          if (res.length > 0) {
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

      <motion.nav className={`absolute bottom-0 bg-[rgb(7,7,7)] max-w-[1270px] border-neutral-800 overflow-y-auto ${navWidth} 
      sm:right-0 sm:border-l-[1.5px] lg:border-l`}
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
                sm:p-6 sm:text-2xl-tablet
                md:p-7
                lg:p-4 lg:border-none lg:text-xl 
                xl:text-xl-desktop
                2xl:p-5 3xl:p-6 4xl:p-8 ">

                  {/* Icon and title */}
                  <div className="flex gap-2 items-center 
                  sm:gap-3 md:gap-4 lg:gap-2
                  2xl:gap-3 3xl:gap-4 4xl:gap-5 ">

                    <IconClockCheck className="size-6 text-green-500 
                    xs:size-7 sm:size-8 md:size-9 lg:size-6 
                    2xl:size-7 3xl:size-8 4xl:size-10 " />

                    <p>
                      <span className="text-green-300">Recent</span> SmLinks
                    </p>

                  </div>

                  {/* Total of links */}
                  <span className="text-base-movil 
                  sm:text-2xl-tablet lg:text-xl xl:text-xl-desktop">
                    {linkDetails.length}/7
                  </span>
                </li>,
              content: <RecentLinks data={linkDetails} loading={loading} />
            },
            {
              title:
                <li className="p-4 text-lg-movil font-semibold flex gap-2 items-center border-t-[1.5px] border-neutral-800 
                cursor-pointer
                xs:p-5
                sm:p-6 sm:gap-3 sm:text-2xl-tablet
                md:p-7 md:gap-4
                lg:p-4 lg:gap-2 lg:text-xl lg:border-t
                xl:text-xl-desktop
                2xl:p-5 2xl:gap-3
                3xl:p-6 3xl:gap-4
                4xl:p-8 4xl:gap-5">

                  {/* Icon and title */}
                  <IconLock className="size-6 text-sky-500 
                  xs:size-7 sm:size-8 md:size-9 lg:size-6 
                  2xl:size-7 3xl:size-8 4xl:size-10" />

                  <p>
                    <span className="text-sky-300">Protected</span> SmLinks
                  </p>

                </li>,
              content: <ProtectedLinks data={linkDetails} loading={loading} />
            }
          ]} />
        </ul>
      </motion.nav>
    </motion.section>
  )
}