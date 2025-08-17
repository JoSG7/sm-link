"use client"

import { useContext } from "react"
import { DeleteLinkContext, DeleteLinkPasswordContext, MenuDrawerContext, SetLinkExpirationContext, SetLinkPasswordContext } 
from "../contexts/ModalsContext"

export function useMenuDrawer() {
  const context = useContext(MenuDrawerContext)
  if (!context) throw new Error("useMenuDrawer must be used within a MenuDrawerProvider")
  return context
}

export function useDeleteLinkModal () {
  const context = useContext(DeleteLinkContext)
  if (!context) throw new Error("useDeleteLinkModal must be used within a DeleteLinkProvider")
  return context
}

export function useSetLinkPasswordModal () {
  const context = useContext(SetLinkPasswordContext)
  if (!context) throw new Error("useSetLinkPasswordModal must be used within a ProtectedProvider")
  return context
}

export function useDeleteLinkPasswordModal () {
  const context = useContext(DeleteLinkPasswordContext)
  if (!context) throw new Error("useDeleteLinkPasswordModal must be used within a RemoveLinkPwdProvider")
  return context
}

export function useSetLinkExpirationModal () {
  const context = useContext(SetLinkExpirationContext)
  if (!context) throw new Error("useSetLinkExpirationModal must be used within a SetExpirationProvider")
  return context
}

