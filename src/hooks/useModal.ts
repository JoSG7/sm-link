"use client"

import { useContext } from "react";
import { DeleteLinkModal, LinkChanges, MenuDrawer, ProtectedLinkModal } from "../contexts/ModalContext";

export function useMenuDrawer() {
  const context = useContext(MenuDrawer)
  if (!context) throw new Error("useMenuDrawer must be used within a MenuDrawerProvider")
  return context
}

export function useDeleteLinkModal () {
  const context = useContext(DeleteLinkModal)
  if (!context) throw new Error("useMenuDrawer must be used within a DeleteLinkProvider")
  return context
}

export function usePwdLinkModal () {
  const context = useContext(ProtectedLinkModal)
  if (!context) throw new Error("useMenuDrawer must be used within a ProtectedProvider")
  return context
}


export function useLinkChanges () {
  const context = useContext(LinkChanges)
  if (!context) throw new Error("useMenuDrawer must be used within a LinkChangesProvider")
  return context
}