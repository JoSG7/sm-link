import { LinkChanges } from "@/features/shared/contexts/LinkChangesContext"
import { useContext } from "react"

export function useLinkChanges () {
  const context = useContext(LinkChanges)
  if (!context) throw new Error("useLinkChanges must be used within a LinkChangesProvider")
  return context
}