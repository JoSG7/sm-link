"use client"

import { useEffect, useState } from "react"
import { useScreenSize } from "@/hooks/useScreenSize"
import { motion } from "framer-motion"
import { IconClockCheck, IconLock } from "@tabler/icons-react"
import { LinkDetails } from "@/types/global"
import { Accordion } from "@/components/ui/Accordion"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store-config"
import { toggleMenuDrawer } from "@/store/modal-slice"
import { toast } from "sonner"
import { LinkServices } from "@/services/link.service"
import { LinkCardSkeleton, ProtectedLinkCardSkeleton } from "../../ui/LoadingSkeleton"
import { SmLinkCard } from "./components/SmLinkCard"
import { EmptyLinks } from "../../ui/EmptyLinks"
import { ProtectedLinkCard } from "./components/ProtectedLinkCard"


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

    <motion.section className={`h-screen fixed inset-0 bg-black/70 backdrop-blur-sm z-20 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      layout
      onClick={() => { dispatch(toggleMenuDrawer()) }}
      initial={false}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.1 }} >

      <motion.nav className={`max-w-xl absolute bottom-0 bg-moss-950 border-neutral-800 overflow-y-auto ${navWidth} border-t-1.5 sm:right-0 sm:border-l-1.5 sm:border-t-0 lg:border-l `}
        layout
        onClick={(e) => e.stopPropagation()}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={navVariants}>

        <ul className="flex flex-col ">
          <Accordion items={[
            {
              title:
                <div className="flex items-center justify-between gap-4 border-moss-border px-5 py-4 text-left">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-green-400/15 bg-green-400/8">
                      <IconClockCheck className="size-5 text-green-400" />
                    </span>
                    <p className="truncate font-semibold text-white sm:text-lg">
                      <span className="text-green-300">Recent</span> SmLinks
                    </p>
                  </div>

                  <span aria-label={`${linkDetails.length} de 7 links recientes`} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-green-400/20 bg-green-400/8 px-3 py-1.5 text-xs font-medium text-green-200">
                    <span className="text-sm font-bold tabular-nums text-green-300">{linkDetails.length}</span>
                    <span className="text-green-200/65">de 7</span>
                  </span>
                </div>,
              content:
                <div className="p-4 pt-0 flex flex-col gap-4 sm:p-5 sm:pt-0 sm:gap-5" translate="no">
                  {
                    loading ?
                      // Skeleton
                      <div className="flex flex-col gap-4 sm:gap-5">
                        <LinkCardSkeleton />
                        <LinkCardSkeleton />
                      </div>
                      :
                      // Cards
                      linkDetails.length > 0 ?
                        linkDetails.map((element) => (
                          <SmLinkCard key={element.id} data={element} />
                        ))
                        :
                        <EmptyLinks type="recent" />
                  }
                </div>
            },
            {
              title:
                <div className="flex items-center gap-3 border-t border-subtle px-5 py-4 text-left">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-sky-400/15 bg-sky-400/8">
                    <IconLock className="size-5 text-sky-400" />
                  </span>
                  <p className="text-base font-semibold text-white sm:text-lg">
                    <span className="text-sky-300">Protected</span> SmLinks
                  </p>
                </div>,
              content:
                <div className="px-4 pb-4 flex flex-col gap-4 sm:p-5 sm:pt-0 sm:gap-5" translate="no">
                  {
                    loading ?
                      <div className="flex flex-col gap-4 sm:gap-5">
                        <ProtectedLinkCardSkeleton />
                        <ProtectedLinkCardSkeleton />
                      </div>
                      :
                      linkDetails.length > 0 ?
                        linkDetails.filter(element => element.has_password).length == 0 ?
                          <div className="">
                            <EmptyLinks type="protected" />
                          </div>
                          :
                          linkDetails.map((element) => (
                            <ProtectedLinkCard key={element.id} data={element} />
                          ))
                        :
                        <div className="">
                          <EmptyLinks type="protected" />
                        </div>
                  }
                </div>
            }
          ]} />
        </ul>
      </motion.nav>
    </motion.section>
  )
}