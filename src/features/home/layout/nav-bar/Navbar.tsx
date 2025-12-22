"use client"

import { IconMenu } from "@tabler/icons-react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { toggleMenuDrawer } from "@/store/modal-slice";


export function HomeNavBar() {

  const dispatch = useDispatch()

  return (

    <header className="flex py-4 bg-[rgba(0,0,0,0.7)] sticky top-0 left-0 right-0 justify-center z-10
    backdrop-blur-sm ">

      <div className="w-full flex justify-between px-4 xs:px-6
      xl:w-full xl:max-w-8xl">

        <div className="flex items-center gap-1
        xl:gap-2 ">

          <Image className="w-10 h-7 "
          src="/imgs/Espada1.png" 
          alt="Icono" 
          width={40} height={28}/>

          <p className="text-xl font-medium ">
            SmLink
          </p>
        </div>

        <button className="flex justify-center items-center cursor-pointer p-2 rounded-full border border-neutral-700"
          type="button"
          onClick={() => { dispatch(toggleMenuDrawer()) }}>

          <IconMenu className="size-6" />
        </button>
      </div>

    </header>

  )

}

