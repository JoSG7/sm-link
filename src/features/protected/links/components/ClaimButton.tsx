'use client'

import { useState } from "react"
import { ArrowDownToLine } from "lucide-react"
import { UnclaimedLinksModal } from "../modals/UnclaimedLinks"


export function ClaimButton({ isAuthenticated }: { isAuthenticated: boolean }) {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {
        isAuthenticated && (
          <>
            <button
              type="button"
              aria-label="Claim unclaimed links"
              className="group inline-flex h-10 items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3.5 text-sm font-semibold text-emerald-200 transition-colors hover:border-emerald-300/60 hover:bg-emerald-400/20 hover:text-emerald-100 focus-visible:ring-2 focus-visible:ring-emerald-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              onClick={() => setIsOpen(true)}>
              <ArrowDownToLine className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              <span>Claim links</span>
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