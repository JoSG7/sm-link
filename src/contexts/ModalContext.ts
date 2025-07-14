"use client"

import { createContext } from "react";

type MenuDrawerType = {
  isMenuOpen: boolean,
  toggleMenu: () => void
}

type DeleteLinkModalType = {
  isDeleteModalOpen: boolean
  shortLink: string | null
  toggleDeleteModal: (short?: string) => void
}

type AddPasswordModaType = { 
  isAddPasswordModalOpen: boolean
  shortLink: string | null
  toggleAddPasswordModal: (short?: string) => void
}

type RemovePasswordModalType = {
  isRemovePasswordModalOpen: boolean
  shortLink: string | null
  toggleRemovePasswordModal: (short?: string) => void
}

type AddExpirationModalType = {
  isAddExpirationModalOpen: boolean
  shortLink: string | null
  toggleAddExpirationModal: (short?: string) => void
}

export const MenuDrawerContext = createContext<MenuDrawerType | null>(null)
export const DeleteLinkModalContext = createContext<DeleteLinkModalType | null>(null)
export const AddPasswordModalContext = createContext<AddPasswordModaType | null>(null)
export const RemovePasswordModalContext = createContext<RemovePasswordModalType | null>(null)
export const AddExpirationModalContext = createContext<AddExpirationModalType | null>(null)

