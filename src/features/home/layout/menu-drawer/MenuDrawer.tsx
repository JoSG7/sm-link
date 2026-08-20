"use client"

import { useEffect, useState } from "react"
import { useScreenSize } from "@/hooks/useScreenSize"
import { motion } from "framer-motion"
import { IconClockCheck, IconLock } from "@tabler/icons-react"
import { RecentLinks } from "./components/RecentLinks"
import { LinkDetails } from "@/types/global"
import { Accordion } from "@/components/ui/Accordion"
import { ProtectedLinks } from "./components/ProtectedLinks"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store-config"
import { toggleMenuDrawer } from "@/store/modal-slice"
import { toast } from "sonner"
import { LinkServices } from "@/services/link.service"


export function MenuDrawer() {

  const [linkDetails, setLinkDetails] = useState<LinkDetails[]>([])
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const { isOpen } = useSelector(
    (state: RootState) => state.modals.menuDrawer
  )
  const { changes } = useSelector(
    (state: RootState) => state.linkChanges
  )

  const width = useScreenSize()
  const isMobile = width < 640
  const isTablet = width >= 640 && width < 1024

  const navWidth = isMobile ? "w-full h-[75vh]" : isTablet ? "w-4/6 h-full" : "w-1/2 h-full"
  
  const navVariants = {
    open: {
      x: 0,
      y: 0,
      transition: { type: "tween" as const, duration: 0.1 },
    },
    closed: {
      x: isMobile ? 0 : "100%",
      y: isMobile ? "100%" : 0,
      transition: { type: "tween" as const, duration: 0.1 },
    },
  }

  useEffect(() => {
    const fetchRecentLinks = async () => {

      setLoading(true)

      try {

        const res = await new LinkServices().getSmLinks()
        setLinkDetails(res)

      } catch (e) {

        toast.error((e as Error).message)

      } finally {

        setLoading(false)

      }
    }

    fetchRecentLinks()
  }, [changes])


  return (

    <motion.section className={`h-screen fixed inset-0 bg-black/70 backdrop-blur-sm z-20
      ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      layout
      onClick={() => { dispatch(toggleMenuDrawer()) }}
      initial={false}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.1 }} >

      <motion.nav className={`max-w-2xl absolute bottom-0 bg-black/70 border-neutral-800 overflow-y-auto ${navWidth} 
      sm:right-0 sm:border-l-[1.5px] lg:border-l`}
        layout
        onClick={(e) => e.stopPropagation()}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={navVariants}>

        <ul className="flex flex-col ">
          <Accordion items={[
            {
              title:
                <li className="p-4 text-lg font-semibold flex justify-between items-center border-t-[1.5px] border-neutral-800  cursor-pointer ">

                  {/* Icon and title */}
                  <div className="flex gap-2 items-center ">
                    <IconClockCheck className="size-6 text-green-500 " />
                    <p>
                      <span className="text-green-300">Recent</span> SmLinks
                    </p>
                  </div>

                  {/* Total of links */}
                  <span className="text-base">
                    {linkDetails.length}/7
                  </span>
                </li>,
              content: <RecentLinks data={linkDetails} loading={loading} />
            },
            {
              title:
                <li className="p-4 text-lg font-semibold flex gap-2 items-center border-t-[1.5px] border-neutral-800 
                cursor-pointer ">

                  {/* Icon and title */}
                  <IconLock className="size-6 text-sky-500 " />

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