import { LinkChanges } from "@/contexts/LinkChangesContext"
import { useContext } from "react"

export function useLinkChanges () {
  const context = useContext(LinkChanges)
  if (!context) throw new Error("NO hay provider del linkchanegs")
  return context
}