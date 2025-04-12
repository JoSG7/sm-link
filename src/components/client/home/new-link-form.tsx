"use client"

import { IconInfoCircle, IconScissors, IconWand } from "@tabler/icons-react"
import { createShortLink } from "@/logic/server-functions"
import { useState, type FormEvent } from "react"
import { toast } from "sonner"

interface apiError {
  error: string
}

export function LinkForm () {

  const [shortURL, setShortURL] = useState("")
    
  const handleSubmit = async (e: FormEvent) => {
    
    e.preventDefault()

    const loadingToast = toast.loading("Creating short link...")
    const response: string | apiError = await createShortLink()
    
    if(typeof(response) == "object"){
      toast.error(response.error, { id: loadingToast })
    }else{
      
      toast.success("Se genero correctamente", { id: loadingToast })
      setShortURL(response)
    }
    
  }

  // MAIN RETURN

  return(

    <section className="pt-4 pb-14 duration-300 flex justify-center
    sm:pb-20 md:gap-5 md:pb-28">

      <div className="w-[90%] md:w-[94%] md:flex md:gap-5">

        <form onSubmit={handleSubmit} className="rounded-lg border border-neutral-800 p-4 bg-neutral-950
        sm:p-7 md:p-5 md:w-7/12
        ">

          <div className="flex justify-between">
            <label htmlFor="txtUrl" className="flex items-center gap-2">
              <IconScissors size={20} className="sm:size-7"></IconScissors>
              <span className="sm:text-xl">Short a long link</span>
            </label>
            <IconInfoCircle className="size-7 hidden md:block" color="#a3a3a3" />
          </div>

          <input type="url" id="txtUrl" autoComplete="off" className="w-full p-2 my-3 text-neutral-400 bg-neutral-950 outline-none 
          rounded-md border border-zinc-900 placeholder:text-neutral-800
          sm:text-xl sm:my-5"
          placeholder="Enter a long Link to short" required/>

          <div className="flex items-center gap-2">
            <IconWand size={20} className="sm:size-7"></IconWand>
            <span className="sm:text-xl">Your new short Link here!</span>
          </div>

          <div className="w-full p-2 mt-3 bg-neutral-950 rounded-md border border-zinc-900 text-neutral-400 mb-5
          sm:mt-5">
            <p className="sm:text-xl">sm-link.vercel.app/{shortURL}</p>
          </div>

          <button className="w-full text-center py-2 rounded-lg bg-gradient-to-r from-[#55a346] to-[#2e7e1d] 
          sm:text-lg md:from-purple-500 md:to-purple-900">
            Shorten Link
          </button>

          {/* Show with the info button */}

          {/* <article className="p-5 rounded-lg border border-neutral-800 max-w-[330px]">

            <h1 className="text-xl pb-2">How it works?</h1>

            <div className="flex gap-3">

              <div className="size-10 mt-1.5 bg-blue-500"></div>

              <div className="">
                <p className="text-[#C4CAd4]">Usa el formulario para cortar tu link</p>
              </div>

            </div>

          </article> */}

        </form>

        {/* Show since 768px */}

        <div className="w-5/12 hidden flex-col gap-5 max-w-[340px] md:flex">
          
          <article className="rounded-lg border border-neutral-800 p-4 bg-neutral-950">
            <h1 className="text-xl pb-2">Para qué sirve?</h1>
            <p className="text-[#C4CAd4]">Usalos para compartir archivos de negocios o en redes sociales  </p>
          </article>

          <article className="rounded-lg border border-neutral-800 p-4 bg-neutral-950">
            <h1 className="text-xl pb-2">Puedo cortar el link que quiera?</h1>
            <p className="text-[#C4CAd4] pb-1">
              Sí, sin embargo debes revisar nuestra politica de uso primero para tener mas conocimiento
            </p>
          </article>

        </div>

      </div>

    </section>

  )

}

// #0a7246

// #006239