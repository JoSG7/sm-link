"use client"

import { useState } from "react"
import { AddExpirationModalContext, AddPasswordModalContext, DeleteLinkModalContext, MenuDrawerContext, RemovePasswordModalContext } from "../ModalContext"

export function ModalsProvider ({ children }: { children: React.ReactNode }) {

  const [shortLink, setShortLink] = useState<null | string>(null)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const toggleDeleteModal = (short?: string) => {
    setIsDeleteModalOpen(prev => !prev)
    if (short) setShortLink(short)
  }

  const [isAddPasswordModalOpen, setIsAddPasswordModalOpen] = useState(false)
  const toggleAddPasswordModal = (short?: string) => {
    setIsAddPasswordModalOpen(prev => !prev)
    if (short) setShortLink(short)
  }

  const [isRemovePasswordModalOpen, setIsRemovePasswordModalOpen] = useState(false)
  const toggleRemovePasswordModal = (short?: string) =>{
    setIsRemovePasswordModalOpen(prev => !prev)
    if (short) setShortLink(short)
  }

  const [isAddExpirationModalOpen, setIsAddExpirationModalOpen] = useState(false)
  const toggleAddExpirationModal = (short?: string) => {
    setIsAddExpirationModalOpen(prev => !prev)
    if (short) setShortLink(short)
  }

  return(
    <MenuDrawerContext.Provider value={ {isMenuOpen, toggleMenu} }>
      <DeleteLinkModalContext.Provider value={{ isDeleteModalOpen, shortLink, toggleDeleteModal }}>
        <AddPasswordModalContext.Provider value={{ isAddPasswordModalOpen, shortLink, toggleAddPasswordModal }}>
          <RemovePasswordModalContext.Provider value={{ isRemovePasswordModalOpen, shortLink, toggleRemovePasswordModal }}>
            <AddExpirationModalContext.Provider value={{ isAddExpirationModalOpen, shortLink, toggleAddExpirationModal }}>
              {children}
            </AddExpirationModalContext.Provider>
          </RemovePasswordModalContext.Provider>
        </AddPasswordModalContext.Provider>
      </DeleteLinkModalContext.Provider>
    </MenuDrawerContext.Provider>
  )
}