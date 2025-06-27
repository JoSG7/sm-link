"use client"

import { createContext } from "react";

type MenuDrawerType = {
  menu: boolean
  toggleMenu: () => void
}

type DeleteLinkType = {
  deleteModal: boolean
  short: string | null
  toggleDeleteModal: (short?: string) => void
}


type ProtectedLinkType = {
  pwdLinkModal: boolean
  short: string | null
  togglePwdLinkModal: (short?: string) => void
}

type RemoveLinkPwdType = {
  removeLinkPwdModal: boolean
  short: string | null
  toggleRemoveLinkPwdModal: (short?: string) => void
}



type LinkChangesType = {
  linkChanges: number
  recordLinkChanges: () => void;
}

export const MenuDrawer = createContext<MenuDrawerType | null>(null)
export const DeleteLinkModal = createContext<DeleteLinkType | null>(null)
export const LinkChanges = createContext<LinkChangesType | null>(null)
export const ProtectedLinkModal = createContext<ProtectedLinkType | null>(null)
export const RemoveLinkPwdModal = createContext<RemoveLinkPwdType | null>(null)

