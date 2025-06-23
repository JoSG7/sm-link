"use client"

import { IconMenu2 } from "@tabler/icons-react";
import Image from "next/image";
import { useMenuDrawer } from "../modals/hooks/useModal";

export function NavBar() {

  const { toggleMenu } = useMenuDrawer()

  return (

    <header className="flex py-5 border-b border-[#1c1d1d] sticky top-0 left-0 right-0 justify-center z-10
    bg-[rgba(0,0,0,0.9)] backdrop-blur-sm">

      <div className="w-[90vw] md:w-[94vw] max-w-5xl  flex justify-between">
        <div className="flex items-center gap-1 sm:gap-1 lg-2:gap-2">
          {/* <div className="relative w-12 h-7 ">
            <Image src="/imgs/Espada1.png" alt="Icono" fill className="object-contain"/>
          </div> */}
          <Image src="/imgs/Espada1.png" alt="Icono" width={40} height={28} className="w-10 h-7"/>
          <Image src="/imgs/Titulo.png" alt="Logo" width={64} height={16} className="w-16 h-4" />
          {/* <div className="relative w-16 h-7">
            <Image src="/imgs/Titulo.png" alt="Logo" fill className="object-contain" />
          </div> */}
        </div>

        <button type="button" className="flex justify-center items-center" onClick={toggleMenu}>
          <IconMenu2 size={30} className="sm:size-7" id="menu-icon"></IconMenu2>
        </button>
      </div>

    </header>

  )

}

