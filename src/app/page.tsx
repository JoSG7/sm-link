'use client'

import { createShortLink } from "@/logic/functions"
import { FormEvent, useState } from "react"

export default function Home() {

  const [shortURL, setShortURL] = useState("")

  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault()

    const shortLink: string = await createShortLink()

    setShortURL(shortLink)

  }

  return (

    <div className="p-3">

      <form onSubmit={handleSubmit}>

        <input type="url" className="text-black px-3 outline-none w-96" required id="txtUrl" />
        
        <button className="px-3 bg-sky-600" >Cortar Link</button>

        <div className="p-3 bg-green-700 w-96">

          <p>https://sm-link.vercel.app/:{shortURL}</p>

        </div>

      </form>

    </div>
    
  )

}
