"use client"

import { closeOptionsMenu } from "@/logic/functions"

export function OptionsMenu () {

  return(

    <section className="w-full h-full absolute hidden bottom-0 left-0 bg-modal z-10" id="optionsMenu"
    onClick={closeOptionsMenu}>

      <div className="w-full h-96 bg-neutral-900 rounded-t-xl border-t border-neutral-950 flex-col self-end duration-200">

        

      </div>

    </section>

  )

}