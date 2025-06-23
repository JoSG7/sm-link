"use client"

import { createContext } from "react";

type MenuDrawerType = {
  menu: boolean;
  toggleMenu: () => void;
}

type DeleteLinkType = {
  deleteModal: boolean;
  shortToDelete: string | null
  toggleDeleteModal: (short?: string) => void;
}

type LinkChangesType = {
  linkChanges: number;
  recordLinkChanges: () => void;
}

export const MenuDrawer = createContext<MenuDrawerType | null>(null)
export const DeleteLinkModal = createContext<DeleteLinkType | null>(null)
export const LinkChanges = createContext<LinkChangesType | null>(null)


