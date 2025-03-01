import { headers } from "next/headers";
import { IconMenu2 } from "@tabler/icons-react";
import { IconUnlink } from "@tabler/icons-react";

export function NavBar () {

  return (

    <header className="w-full flex py-4 px-5 border-b border-gray-800 justify-between">

      <div className="flex items-center gap-2">

        <IconUnlink size={35}></IconUnlink>
        <span className="text-xl">SmLink</span>

      </div>

      <div className="flex justify-center items-center">

        <IconMenu2 size={30} ></IconMenu2>

      </div>

    </header>

  )

}

