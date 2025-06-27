"use client"

import { ReactNode, useState } from "react";
import { DeleteLinkModal, LinkChanges, MenuDrawer, ProtectedLinkModal, RemoveLinkPwdModal } from "../../../contexts/ModalContext";

export function HomeModals({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [pwdLinkModal, setPwdLinkModal] = useState(false)
  const [removeLinkPwdModal, setRemoveLinkPwdModal] = useState(false)
  const [short, setShort] = useState("")
  const [linkChanges, setLinkChange] = useState(0)

  const toggleMenu = () => {
    setMenu(prev => !prev)
  }

  const toggleDeleteModal = (short?: string) => {
    setDeleteModal(prev => !prev)
    if (short) setShort(short)
  }

  const togglePwdLinkModal = (short?: string) => {
    setPwdLinkModal(prev => !prev)
    if (short) setShort(short)
  }

  const toggleRemoveLinkPwdModal = (short?: string) => {
    setRemoveLinkPwdModal(prev => !prev)
    if (short) setShort(short)
  }

  const recordLinkChanges = () => {
    setLinkChange(prev => prev + 1)
  }

  return (
    <MenuDrawer.Provider value={{ menu, toggleMenu }}>
      <DeleteLinkModal.Provider value={{ deleteModal, short, toggleDeleteModal }}>
        <ProtectedLinkModal.Provider value={{ pwdLinkModal, short, togglePwdLinkModal }}>
          <RemoveLinkPwdModal.Provider value={{ removeLinkPwdModal, short, toggleRemoveLinkPwdModal }}>
            <LinkChanges.Provider value={{ linkChanges, recordLinkChanges }}>
              {children}
            </LinkChanges.Provider>
          </RemoveLinkPwdModal.Provider>
        </ProtectedLinkModal.Provider>
      </DeleteLinkModal.Provider>
    </MenuDrawer.Provider>
  )

}