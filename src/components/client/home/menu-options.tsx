"use client"

import { closeOptionsMenu } from "@/logic/functions"

export function OptionsMenu () {

  return(

    <section className="w-full h-full absolute hidden bottom-0 left-0 bg-modal z-10 backdrop-blur-sm" id="bgMenu" onClick={closeOptionsMenu}>

      <nav className="w-full h-0 bg-neutral-900 rounded-t-lg border-t border-gray-800 self-end 
      duration-200" id="menu">

        

      </nav>

    </section>

  )

}