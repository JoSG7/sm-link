"use client"

import { ReactNode, useState } from "react";
import { DeleteLinkModal, LinkChanges, MenuDrawer } from "../../../contexts/ModalContext";

export function HomeModals({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [shortToDelete, setShortToDelete] = useState("")
  const [linkChanges, setLinkChange] = useState(0)

  const toggleMenu = () => {
    if (menu) {
      setMenu(false)
    } else {
      setMenu(true)
    }
  }

  const toggleDeleteModal = (short?: string) => {
    setDeleteModal(prev => !prev)
    if(short) setShortToDelete(short)
  }

  const recordLinkChanges = () => {
    setLinkChange(prev => prev + 1)
  }

  return (
    <MenuDrawer.Provider value={{ menu, toggleMenu }}>
      <DeleteLinkModal.Provider value={{ deleteModal, shortToDelete, toggleDeleteModal }}>
        <LinkChanges.Provider value={{ linkChanges, recordLinkChanges }}>
          {children}
        </LinkChanges.Provider>
      </DeleteLinkModal.Provider>
    </MenuDrawer.Provider>
  )

}