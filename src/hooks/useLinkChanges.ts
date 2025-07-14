import { LinkChanges } from "@/contexts/LinkChangesContext"
import { useContext } from "react"

export function useLinkChanges () {
  const context = useContext(LinkChanges)
  if (!context) throw new Error("useMenuDrawer must be used within a LinkChangesProvider")
  return context
}