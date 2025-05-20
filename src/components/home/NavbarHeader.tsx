"use client"

import { showMainMenu } from "@/utils/ui/home/menu-functions";
import { IconMenu2 } from "@tabler/icons-react";
import { IconUnlink } from "@tabler/icons-react";

export function NavBar () {

  return (

    <header className="flex py-5 border-b border-[#1c1d1d] sticky top-0 left-0 right-0 justify-center z-20
    bg-[rgba(0,0,0,0.9)] backdrop-blur-sm">

      <div className="w-[90%] md:w-[94%] max-w-5xl  flex justify-between">
        <div className="flex items-center gap-1 sm:gap-1 lg-2:gap-2">
          {/* <img src="imgs/Logo6.png" alt="Logo1" className="w-32 md:w-40"/> */}
          <img src="imgs/Espada1.png" alt="Icono" className="w-9"/>
          <img src="imgs/Titulo.png" alt="Logo" className="w-16"/>
        </div>

        <button type="button" className="flex justify-center items-center" onClick={showMainMenu}>
          <IconMenu2 size={30} className="sm:size-7" id="menu-icon"></IconMenu2>
        </button>
      </div>

    </header>

  )

}

