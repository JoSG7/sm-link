"use client"

import { UserLinkServices } from "@/features/dashboard/services/user-link.service"
import { GuestLinkServices } from "@/features/home/services/guest-link.service"
import { DomainLogo } from "@/features/shared/components/DomainLogo"
import { LinkDetails } from "@/global"
import { recordChange } from "@/store/link-changes-slice"
import { RootState } from "@/store/store-config"
import { IconCheck, IconLoader } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { AnimatePresence, motion } from "framer-motion"


const UnclaimedLink = ({ info, imgDomain, onClick }: {
  info: LinkDetails,
  imgDomain: string,
  onClick: () => void
}) => {

  const [isSelected, setIsSelected] = useState(false)

  const handleClick = () => {
    setIsSelected(prev => !prev)
    onClick()
  }

  return (

    <article className={`p-3 flex gap-3 rounded-lg border-2 cursor-pointer duration-100 transition ${isSelected ? "border-green-500/60 bg-green-500/50" : "border-neutral-800/50 bg-neutral-800/50"}`}
      key={info.id}
      onClick={handleClick}>

      <DomainLogo domain={imgDomain} className="min-w-10 min-h-10" />

      <div className="text-sm">
        {info.short}
        <p className="text-nowrap max-w-48 text-neutral-300 text-sm overflow-x-hidden">
          {info.original}
        </p>
      </div>

    </article>
  )
}


export function UnclaimedLinks() {

  const [loading, setLoading] = useState(true)
  const [guestLinks, setGuestLinks] = useState<LinkDetails[] | []>([])
  const [selectedLinks, setSelectedLinks] = useState<string[]>([])
  const [submiting, setSubmiting] = useState(false)

  const dispatch = useDispatch()

  const { changes } = useSelector(
    (state: RootState) => state.linkChanges
  )

  const addToSelected = (id: string) => {

    if (selectedLinks.includes(id)) {
      setSelectedLinks(selectedLinks.filter(value => value != id))
    } else {
      setSelectedLinks([...selectedLinks, id])
    }

  }


  useEffect(() => {

    const fetchGuestLinks = async () => {

      const guestLinkServices = new GuestLinkServices()

      guestLinkServices.getLinks()
        .then((res) => {
          setGuestLinks(res.filter(el => !el.has_user_id))
        })
        .finally(() => setLoading(false))

    }
    fetchGuestLinks()

  }, [changes])


  const handleClaim = () => {

    if (selectedLinks.length < 1) {
      toast.error("Please, select one")
      
    } else {
      
      setSubmiting(true)
      const userLinksServices = new UserLinkServices()
  
      userLinksServices.claim(selectedLinks)
        .then(res => {
  
          if (res.error) {
            toast.error(res.error)
          } else {
            dispatch(recordChange())
            toast.success(res.response)
          }
  
        })
        .finally(() => {
          setSubmiting(false)
        })
    }
  }


  return (

    <AnimatePresence>

      {guestLinks.length > 0 && (

        <motion.section className="w-full rounded-lg border-2 border-neutral-900 bg-neutral-900/50 lg:p-5"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3, ease: "easeIn" },
          }}>

          {/* Header Title */}
          <header className="flex justify-between lg:pb-5">
            <div>
              <h1 className="text-lg font-semibold">
                We found links created before you signed in
              </h1>
              <p className="pt-1 text-neutral-300">
                Please, select the links that you want to claim
              </p>
            </div>

            <div className="flex items-center">
              <button className="py-2 px-4 flex items-center gap-2 rounded-lg cursor-pointer hover:scale-105 duration-300
              bg-gradient-to-r from-green-500 to-sky-600 disabled:opacity-50"
                onClick={handleClaim}
                disabled={submiting}>
                {submiting ? <IconLoader className="animate-spin lg:size-4" /> : <IconCheck className="lg:size-4" />}
                Claim
              </button>
            </div>
          </header>

          {/* Guest links */}
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:gap-5 2xl:grid-cols-4">
            {
              loading ?
                <>
                  <div className="h-16 rounded-lg border-2 border-neutral-800/50 bg-neutral-800/50 animate-pulse" />
                  <div className="h-16 rounded-lg border-2 border-neutral-800/50 bg-neutral-800/50 animate-pulse" />
                  <div className="h-16 rounded-lg border-2 border-neutral-800/50 bg-neutral-800/50 animate-pulse" />
                </>
                :
                guestLinks.map((el) => {

                  const domain = new URL(el.original).hostname

                  return (

                    <UnclaimedLink
                      key={el.id}
                      imgDomain={domain}
                      info={el}
                      onClick={() => addToSelected(el.id)} />

                  )
                })
            }
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}