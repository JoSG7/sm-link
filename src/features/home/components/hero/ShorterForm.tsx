import { IconBolt } from "@tabler/icons-react"
import { FormEvent } from "react"

export function ShorterForm () {

  const handleSubmit = (e: FormEvent) => {

    e.preventDefault()

  }

  return(

    <form className="w-[75vw] flex rounded-xl bg-neutral-950 border border-neutral-800 overflow-hidden"   
    onSubmit={handleSubmit}>

      <div className="grow text-neutral-200
      xl:p-3 xl:pl-5">
        <input type="url" className="w-full outline-none placeholder:text-neutral-700 mask-r-from-90%" 
        placeholder="https://example.com/long-url-to-short" />
      </div>

      <button className="flex items-center bg-gradient-to-r from-green-500 to-blue-700 cursor-pointer
      xl:py-3 xl:px-5 xl:gap-1">
        <IconBolt className="xl:size-5" />
        Short
      </button>

    </form>
  )
}