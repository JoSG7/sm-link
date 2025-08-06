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
// import { DeleteLinkModal } from "@/components/modals/home/DeleteLinkModal"


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
      onClick={toggleMenu} initial={false} animate={{ opacity: isMenuOpen ? 1 : 0 }} transition={{ duration: 0.1 }} >
      <motion.nav className={`absolute bottom-0 bg-[rgb(7,7,7)] border-graphite overflow-y-auto ${navWidth} sm:right-0 sm:border-l`}
        onClick={(e) => e.stopPropagation()} initial={false} animate={isMenuOpen ? "open" : "closed"} variants={navVariants}>
        <ul className="flex flex-col">
          <Accordion items={[
            {
              title:
                <li className="border-t border-graphite p-4 text-xl-movil font-semibold flex justify-between items-center cursor-pointer
                xs:p-5 lg:p-4 lg:border-none 2xl:p-5">
                  <div className="flex gap-2 items-center 
                  lg:text-xl-desktop-sm
                  lg-2:text-xl-desktop">
                    <IconClockCheck className="size-6 text-green-500 xs:size-7
                    lg:size-6
                    2xl:size-7" />
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
                lg-2:text-xl-desktop 2xl:p-5">
                  <IconLock className="size-6 text-sky-500 xs:size-7 lg:size-6 2xl:size-7" />
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

{/* <section className="w-full h-screen fixed hidden bottom-0 bg-modal z-20 backdrop-blur-sm text-[#E5E7EB]" id="bgMenu" */ }
// onClick={closeMainMenu}>
//   <nav className="w-full h-0 bg-[rgb(7,7,7)] border-[#1c1c1d] self-end overflow-y-auto duration-100 whitespace-nowrap
//   sm:w-0 sm:fixed sm:right-0 sm:h-full sm:border-l sm:overflow-x-hidden"
//   id="isMenuOpen" onClick={(e) => { e.stopPropagation() }}>
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