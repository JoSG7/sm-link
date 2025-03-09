"use client"

import { closeOptionsMenu } from "@/logic/functions"

export function OptionsMenu () {

  return(

    <section className="w-full h-full absolute hidden bottom-0 left-0 bg-modal z-10 backdrop-blur-sm" 
    id="optionsMenu"
    onClick={closeOptionsMenu}>

      

    </section>

  )

}