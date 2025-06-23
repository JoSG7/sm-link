"use client"

import { ReactNode, useState } from "react";
import { MenuDrawer } from "../contexts/ModalContext";

export function HomeModals ({children}: {children: ReactNode}) {
  const [menu, setMenu] = useState(false)

  const toggleMenu = () => {
    if(menu){
      setMenu(false)
    }else {
      setMenu(true)
    }
    console.log("ashdkjs")
  }

  return (
    <MenuDrawer.Provider value={{menu, toggleMenu}}>
      {children}
    </MenuDrawer.Provider>
  )

}