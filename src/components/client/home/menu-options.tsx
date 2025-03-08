"use client"

import { closeOptionsMenu } from "@/logic/functions"

export function OptionsMenu () {

  return(

    <section className="w-full h-screen absolute hidden bottom-0 left-0 bg-modal z-10" id="optionsMenu"
    onClick={closeOptionsMenu}>

      

    </section>

  )

}