"use client"

import { useContext } from "react";
import { DeleteLinkModal, LinkChanges, MenuDrawer, ProtectedLinkModal, RemoveLinkPwdModal, SetLinkExpiration } from "../contexts/ModalContext";

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

export function useRemoveLinkPwdModal () {
  const context = useContext(RemoveLinkPwdModal)
  if (!context) throw new Error("useMenuDrawer must be used within a RemoveLinkPwdProvider")
  return context
}

export function useSetLinkExpiration () {
  const context = useContext(SetLinkExpiration)
  if (!context) throw new Error("useMenuDrawer must be used within a SetExpirationProvider")
  return context
}