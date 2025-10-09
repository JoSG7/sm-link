"use client"

import { IconMenu2 } from "@tabler/icons-react";
import { motion } from 'framer-motion'
import Image from "next/image";
import { useMenuDrawer } from "../hooks/useModals";

export function HomeNavBar() {

  const { toggleMenu } = useMenuDrawer()

  return (

    <motion.header className="flex p-5 bg-[rgba(0,0,0,0.7)] border-b border-graphite sticky top-0 left-0 right-0 justify-center z-10
    backdrop-blur-sm 
    3xl:py-6 
    4xl:py-8 ">

      <div className="w-[90vw] flex justify-between xl:w-[85vw] 4xl:max-w-[2060px]">
        <div className="flex items-center gap-1 sm:gap-1 xl:gap-2 2xl:gap-3 3xl:gap-4">
          <Image src="/imgs/Espada1.png" alt="Icono" width={40} height={28} className="w-10 h-7 
          xs:w-11 xs:h-8 sm:w-14 sm:h-11 
          lg:w-10 lg:h-7 
          xl:w-11 xl:h-8
          2xl:w-14 2xl:h-10 
          3xl:w-16 3xl:h-12
          4xl:w-20 4xl:h-14"/>
          <p className="text-lg-fluid text-neutral-200 md:text-xl lg:text-lg 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl">SmLink</p>
        </div>

        <button type="button" className="flex justify-center items-center cursor-pointer" onClick={toggleMenu}>
          <IconMenu2 size={30} className="sm:size-7 2xl:size-9 3xl:size-11 4xl:size-12" ></IconMenu2>
        </button>
      </div>

    </motion.header>

  )

}

