"use client"

import { LinkServices } from "@/services/link.service"
import { DomainLogo } from "@/components/ui/DomainLogo"
import { LinkDetails } from "@/types/global"
import { IconCheck, IconLoader, IconUserCheck } from "@tabler/icons-react"
import { SubmitEvent, useEffect, useState } from "react"
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

    <article className={`flex cursor-pointer gap-3 rounded-lg border-1.5 p-3 transition duration-100 ${isSelected ? "border-fuchsia-500/30 bg-fuchsia-500/10 ring-1 ring-fuchsia-500/20" : "border-neutral-800 bg-neutral-900/80 hover:border-neutral-700 hover:bg-neutral-800/80"}`}
      key={info.id}
      onClick={handleClick}>

      <DomainLogo domain={imgDomain} className="min-w-10 min-h-10" />

      <div className="min-w-0 text-sm">
        <p className="font-medium text-neutral-100">/{info.short}</p>
        <p className="mt-1 min-w-0 truncate text-sm text-neutral-400" title={info.original}>
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


  const handleClaim = async (e: SubmitEvent) => {

    e.preventDefault()

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

              <motion.form className="flex max-h-[90vh] min-h-0 w-[90vw] max-w-170 flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 sm:w-[80vw] lg:w-[70vw]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.1 }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleClaim}>

                <header className="flex shrink-0 items-center justify-between gap-4 border-b border-neutral-800 px-5 py-4 sm:px-6 sm:py-5">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/10 p-2.5">
                      <IconUserCheck className="size-5 text-fuchsia-300" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-fuchsia-300">Guest links</p>
                      <h1 className="truncate text-lg font-semibold text-white sm:text-xl">Claim your links</h1>
                    </div>
                  </div>

                  <button
                    className="flex shrink-0 items-center gap-2 rounded-lg bg-linear-to-b from-fuchsia-500 to-fuchsia-500/50 px-3 py-2 text-sm font-semibold text-white transition-colors hover:from-fuchsia-400 hover:to-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={submiting}
                  >
                    {submiting ? <IconLoader className="size-4 animate-spin" /> : <IconCheck className="size-4" />}
                    <span className="hidden sm:inline">Claim</span>
                  </button>
                </header>

                <section className="min-h-0 flex-1 overflow-y-auto p-6">
                  <div className="flex flex-col gap-4">
                    <div className="pb-1">
                      <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">SELECT LINKS</h2>
                      <p className="text-sm text-neutral-500">Choose the guest links you want to move to your account.</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {loading ? (
                        Array.from({ length: 4 }, (_, index) => (
                          <div className="h-16 animate-pulse rounded-lg border border-neutral-800 bg-neutral-900/80" key={index} />
                        ))
                      ) : (
                        guestLinks.map(el => {
                          const domain = new URL(el.original).hostname
                          return (
                            <UnclaimedLink
                              key={el.id}
                              imgDomain={domain}
                              info={el}
                              onClick={() => addToSelected(el.id)}
                            />
                          )
                        })
                      )}
                    </div>
                  </div>
                </section>
              </motion.form>
            </motion.section>
          )}
      </AnimatePresence>
    </ModalLayout>
  )
}