'use client'

import { useState, FormEvent } from "react"
import { createShortLink } from "@/logic/functions"

export function ShortLinkForm () {

  const [shortURL, setShortURL] = useState("")
  
  const handleSubmit = async (e: FormEvent) => {
  
    e.preventDefault()
  
    const response: string | object = await createShortLink()
  
    if(typeof(response) == "object"){
  
      console.log(response)
  
    }else{
  
      setShortURL(response)
  
    }
  
  }

  return(

    <form onSubmit={handleSubmit}>

      <input type="url" className="text-black px-3 outline-none w-96" required id="txtUrl" />
        
      <button className="px-3 bg-sky-600" >Cortar Link</button>

      <div className="p-3 bg-green-700 w-96">

        <p>https://sm-link.vercel.app/{shortURL}</p>

      </div>

    </form>

  )

}



