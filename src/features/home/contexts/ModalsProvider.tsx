"use client"

import { useState } from "react"
import { DeleteLinkContext, DeleteLinkPasswordContext, MenuDrawerContext, SetLinkExpirationContext, SetLinkPasswordContext } 
from "./ModalsContext"

export function HomeModalsProvider({ children }: { children: React.ReactNode }) {

  const [shortLink, setShortLink] = useState<null | string>(null)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  const [isDeleteLinkOpen, setIsDeleteLinkOpen] = useState(false)
  const toggleDeleteLinkModal = (short?: string) => {
    setIsDeleteLinkOpen(prev => !prev)
    if (short) setShortLink(short)
  }

  const [isSetLinkPasswordOpen, setIsSetLinkPasswordOpen] = useState(false)
  const toggleSetLinkPasswordModal = (short?: string) => {
    setIsSetLinkPasswordOpen(prev => !prev)
    if (short) setShortLink(short)
  }

  const [isDeleteLinkPasswordOpen, setIsDeleteLinkPasswordOpen] = useState(false)
  const toggleDeleteLinkPasswordModal = (short?: string) =>{
    setIsDeleteLinkPasswordOpen(prev => !prev)
    if (short) setShortLink(short)
  }

  const [isSetLinkExpirationOpen, setIsSetLinkExpirationOpen] = useState(false)
  const toggleSetLinkExpirationModal = (short?: string) => {
    setIsSetLinkExpirationOpen(prev => !prev)
    if (short) setShortLink(short)
  }

  return(

    <MenuDrawerContext.Provider value={{isMenuOpen, toggleMenu}}>
      <DeleteLinkContext.Provider value={{ isDeleteLinkOpen, shortLink, toggleDeleteLinkModal }}>
        <SetLinkPasswordContext.Provider value={{ isSetLinkPasswordOpen, shortLink, toggleSetLinkPasswordModal }}>
          <DeleteLinkPasswordContext.Provider value={{ isDeleteLinkPasswordOpen, shortLink, toggleDeleteLinkPasswordModal }}>
            <SetLinkExpirationContext.Provider value={{ isSetLinkExpirationOpen, shortLink, toggleSetLinkExpirationModal }}>
              { children }
            </SetLinkExpirationContext.Provider>
          </DeleteLinkPasswordContext.Provider>
        </SetLinkPasswordContext.Provider>
      </DeleteLinkContext.Provider>
    </MenuDrawerContext.Provider>

  )

}