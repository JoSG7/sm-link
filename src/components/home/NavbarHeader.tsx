"use client"

import { IconMenu2 } from "@tabler/icons-react";
import Image from "next/image";
import { useMenuDrawer } from "../../hooks/useModal";

export function NavBar() {

  const { toggleMenu } = useMenuDrawer()

  return (

    <header className="flex py-5 border-b border-graphite sticky top-0 left-0 right-0 justify-center z-10
    bg-[rgba(0,0,0,0.7)] backdrop-blur-sm">

      <div className="w-[90vw] max-w-5xl  flex justify-between">
        <div className="flex items-center gap-1 sm:gap-1 lg-2:gap-2">
          
          <Image src="/imgs/Espada1.png" alt="Icono" width={40} height={28} className="w-10 h-7 
          xs:w-11 xs:h-8 sm:w-14 sm:h-11 lg-2:w-11 lg-2:h-8"/>
          <p className="text-lg-fluid text-neutral-200 md:text-2xl lg-2:text-lg">SmLink</p>
          
        </div>

        <button type="button" className="flex justify-center items-center" onClick={toggleMenu}>
          <IconMenu2 size={30} className="sm:size-7" id="menu-icon"></IconMenu2>
        </button>
      </div>

    </header>

  )

}

