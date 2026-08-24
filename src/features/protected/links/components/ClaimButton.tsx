'use client'

import { useState } from "react"
import { UnclaimedLinksModal } from "../modals/UnclaimedLinks"


export function UnclaimedButton({ isAuthenticated }: { isAuthenticated: boolean }) {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {
        isAuthenticated && (
          <>
            <button className="p-2 rounded-xl border border-neutral-900 text-sm font-medium"
              onClick={() => setIsOpen(true)}>
              Claim
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