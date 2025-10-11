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
    sm:p-6
    md:p-7
    3xl:py-6 
    4xl:py-8 ">

      <div className="w-[90vw] flex justify-between xl:w-[85vw] 4xl:max-w-[2060px]">
        <div className="flex items-center gap-1 
        sm:gap-2 
        xl:gap-2 
        2xl:gap-3 
        3xl:gap-4">

          <Image src="/imgs/Espada1.png" alt="Icono" width={40} height={28} className="w-10 h-7 
          xs:w-11 xs:h-8 
          sm:w-14 sm:h-11
          md:w-16 md:h-12
          lg:w-10 lg:h-7 
          xl:w-11 xl:h-8
          2xl:w-14 2xl:h-10 
          3xl:w-16 3xl:h-12
          4xl:w-20 4xl:h-14"/>

          <p className="text-base-movil text-neutral-200 
          sm:text-2xl-tablet 
          lg:text-lg ">
            SmLink
          </p>
        </div>

        <button type="button" className="flex justify-center items-center cursor-pointer" 
        onClick={toggleMenu}>

          <IconMenu2 className="sm:size-8 md:size-9 2xl:size-9 3xl:size-11 4xl:size-12" />
        </button>
      </div>

    </motion.header>

  )

}

