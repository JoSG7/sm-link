"use client"

import { LinkServices } from "@/services/link.service"
import { DomainLogo } from "@/components/ui/DomainLogo"
import { LinkDetails } from "@/types/global"
import { IconCheck, IconLoader } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { AnimatePresence, motion } from "framer-motion"
import ModalLayout from "@/components/modals/ModalLayout"
import { useRouter } from "next/navigation"


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

    <article className={`p-3 flex gap-3 rounded-lg border-2 cursor-pointer duration-100 transition ${isSelected ? "border-green-500/40 bg-green-500/20" : "border-neutral-800/50 bg-neutral-800/50"}`}
      key={info.id}
      onClick={handleClick}>

      <DomainLogo domain={imgDomain} className="min-w-10 min-h-10" />

      <div className="text-sm">
        {info.short}
        <p className="line-clamp-1 max-w-48 text-neutral-300 text-sm overflow-x-hidden">
          {info.original}
        </p>
      </div>

    </article>
  )
}


export function UnclaimedLinksModal({ isOpen, onClose }: {
  isOpen: boolean,
  onClose: () => void
}) {

  const [loading, setLoading] = useState(true)
  const [guestLinks, setGuestLinks] = useState<LinkDetails[] | []>([])
  const [selectedLinks, setSelectedLinks] = useState<string[]>([])
  const [submiting, setSubmiting] = useState(false)
  const router = useRouter()

  const addToSelected = (id: string) => {

    if (selectedLinks.includes(id)) {
      setSelectedLinks(selectedLinks.filter(value => value != id))
    } else {
      setSelectedLinks([...selectedLinks, id])
    }

  }


  useEffect(() => {

    const fetchGuestLinks = async () => {
      try {

        const response = await new LinkServices().getSmLinks(true)
        setGuestLinks(response.filter(el => !el.has_user_id))

      } catch (e) {

        toast.error((e as Error).message)

      } finally {

        setLoading(false)

      }
    }

    fetchGuestLinks()

  }, [])


  const handleClaim = async () => {

    if (selectedLinks.length < 1) {
      toast.error("Please, select one")

    } else {

      setSubmiting(true)

      try {

        const { data } = await new LinkServices().claim(selectedLinks)
        toast.success(data)
        onClose()
        router.refresh()

      } catch (e) {

        toast.error((e as Error).message)

      } finally {

        setSubmiting(false)

      }
    }
  }


  return (

    <ModalLayout>
      <AnimatePresence>
        {
          isOpen && (

            <motion.section className={`fixed inset-0 z-30 bg-black/80 flex items-center justify-center backdrop-blur-sm ${submiting && "pointer-events-none"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                onClose()
              }}>

              <motion.form className="w-[90vw] p-6 bg-neutral-950 rounded-2xl border border-neutral-800 max-w-150 sm:w-[70vw] lg:w-[50vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.1 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleClaim}>

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

                  <div className="flex items-center gap-3">
                    <button className="py-2 px-4 flex items-center gap-2 rounded-lg cursor-pointer hover:scale-105 duration-300
                    bg-linear-to-r from-green-500 to-sky-600 disabled:opacity-50"
                      onClick={handleClaim}
                      disabled={submiting}>
                      {submiting ? <IconLoader className="animate-spin " /> : <IconCheck />}
                      Claim
                    </button>
                  </div>
                </header>

                <div className="grid gap-4 lg:grid-cols-2">
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
              </motion.form>
            </motion.section>
          )}
      </AnimatePresence>
    </ModalLayout>
  )
}