"use client"

import { showMainMenu } from "@/logic/client-functions";
import { IconMenu2 } from "@tabler/icons-react";
import { IconUnlink } from "@tabler/icons-react";

export function NavBar () {

  return (

    <header className="w-full flex py-4 px-5 border-b border-gray-800 fixed top-0 left-0 right-0 justify-between z-20
    bg-[rgba(14,14,14,0.9)]">

      <div className="flex items-center gap-2">

        <IconUnlink size={35}></IconUnlink>
        <span className="text-xl">SmLink</span>

      </div>

      <button type="button" className="flex justify-center items-center" onClick={showMainMenu}>

        <IconMenu2 size={30} ></IconMenu2>

      </button>

    </header>

  )

}

