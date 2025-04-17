"use client"

import { showMainMenu } from "@/utils/ui/menu-functions";
import { IconMenu2 } from "@tabler/icons-react";
import { IconUnlink } from "@tabler/icons-react";

export function NavBar () {

  return (

    <header className="flex py-4 border-b border-gray-800 sticky top-0 left-0 right-0 justify-center z-20
    bg-[rgba(14,14,14,0.9)] backdrop-blur-sm">

      <div className="w-[90%] md:w-[94%] max-w-[1195px] flex justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <IconUnlink size={30}></IconUnlink>
          <span className="text-xl">SmLink</span>
        </div>

        <button type="button" className="flex justify-center items-center" onClick={showMainMenu}>
          <IconMenu2 size={30} className="sm:size-7" id="menu-icon"></IconMenu2>
        </button>
      </div>

    </header>

  )

}

