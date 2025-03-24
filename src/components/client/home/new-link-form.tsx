"use client"

import { IconScissors, IconWand } from "@tabler/icons-react"
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
    
    const response: string | apiError = await createShortLink()
    
    if(typeof(response) == "object"){
    
      toast.error(response.error)
    
    }else{
      
      toast.success("Se genero correctamente")
      setShortURL(response)
    
    }
    
  }

  // MAIN RETURN

  return(

    <section className="p-4">

      <form onSubmit={handleSubmit} className="rounded-lg border border-neutral-900 px-3 py-4 bg-neutral-950">

        <label htmlFor="txtUrl" className="flex mb-3 items-center gap-2">

          <IconScissors size={20}></IconScissors>
          <span>Short a long link</span>

        </label>

        <input type="url" id="txtUrl" className="w-full p-2 text-neutral-400 bg-neutral-950 outline-none rounded-md border border-zinc-900 placeholder:text-neutral-800" placeholder="Enter a long Link to short" required/>

        <div className="flex items-center gap-2 py-3">

          <IconWand size={20}></IconWand>
          <span>Your new short Link here!</span>

        </div>

        <div className="w-full p-2 bg-neutral-950 rounded-md border border-zinc-900 text-neutral-400 mb-5">

          <p>sm-link.vercel.app/{shortURL}</p>

        </div>

        <button className="w-full text-center py-2 rounded-lg bg-gradient-to-r from-amber-500 to-emerald-500">
          Shorten Link
        </button>

      </form>

    </section>

  )

}