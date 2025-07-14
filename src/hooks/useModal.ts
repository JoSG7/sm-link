"use client"

import { AddExpirationModalContext, AddPasswordModalContext, DeleteLinkModalContext, MenuDrawerContext, RemovePasswordModalContext } from "@/contexts/ModalContext";
import { useContext } from "react";

export function useMenuDrawer() {
  const context = useContext(MenuDrawerContext)
  if (!context) throw new Error("useMenuDrawer must be used within a MenuDrawerProvider")
  return context
}

export function useDeleteLinkModal () {
  const context = useContext(DeleteLinkModalContext)
  if (!context) throw new Error("useMenuDrawer must be used within a DeleteLinkProvider")
  return context
}

export function useAddPasswordModal () {
  const context = useContext(AddPasswordModalContext)
  if (!context) throw new Error("useMenuDrawer must be used within a ProtectedProvider")
  return context
}

export function useRemovePasswordModal () {
  const context = useContext(RemovePasswordModalContext)
  if (!context) throw new Error("useMenuDrawer must be used within a RemoveLinkPwdProvider")
  return context
}

export function useAddExpirationModal () {
  const context = useContext(AddExpirationModalContext)
  if (!context) throw new Error("useMenuDrawer must be used within a SetExpirationProvider")
  return context
}