"use client"

import { createContext } from "react";

type MenuDrawerType = {
  isMenuOpen: boolean,
  toggleMenu: () => void
}

type DeleteLinkType = {
  isDeleteLinkOpen: boolean
  shortLink: string | null
  toggleDeleteLinkModal: (short?: string) => void
}

type SetLinkPasswordType = { 
  isSetLinkPasswordOpen: boolean
  shortLink: string | null
  toggleSetLinkPasswordModal: (short?: string) => void
}

type DeleteLinkPasswordType = {
  isDeleteLinkPasswordOpen: boolean
  shortLink: string | null
  toggleDeleteLinkPasswordModal: (short?: string) => void
}

type SetLinkExpirationType = {
  isSetLinkExpirationOpen: boolean
  shortLink: string | null
  toggleSetLinkExpirationModal: (short?: string) => void
}

export const MenuDrawerContext = createContext<MenuDrawerType | null>(null)
export const DeleteLinkContext = createContext<DeleteLinkType | null>(null)
export const SetLinkPasswordContext = createContext<SetLinkPasswordType | null>(null)
export const DeleteLinkPasswordContext = createContext<DeleteLinkPasswordType | null>(null)
export const SetLinkExpirationContext = createContext<SetLinkExpirationType | null>(null)

