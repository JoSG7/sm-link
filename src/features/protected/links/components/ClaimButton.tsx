'use client'

import { useState } from "react"
import { ArrowDownToLine, UserRoundCheck } from "lucide-react"
import { UnclaimedLinksModal } from "../modals/UnclaimedLinks"


export function ClaimButton({ isAuthenticated, guestLinksCount }: { isAuthenticated: boolean, guestLinksCount: number }) {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {
        isAuthenticated && guestLinksCount > 0 && (
          <>
            <button
              type="button"
              aria-label="Claim guest links"
              className="group relative inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-3 pl-4 text-sm font-medium text-neutral-200 transition hover:border-neutral-600 hover:bg-neutral-800 active:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              onClick={() => setIsOpen(true)}
            >
              <span className="absolute -left-2 -top-2 flex size-5 items-center justify-center rounded-full border border-neutral-950 bg-neutral-700 text-[10px] font-semibold text-neutral-100 ring-1 ring-neutral-600">
                {guestLinksCount > 99 ? "99+" : guestLinksCount}
              </span>
              <UserRoundCheck className="size-4 text-neutral-400" aria-hidden="true" />
              <span>Claim guest links</span>
              <ArrowDownToLine className="size-4 text-neutral-500 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
            </button>

            <UnclaimedLinksModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            />
          </>
        )
      }
    </>
  )
}