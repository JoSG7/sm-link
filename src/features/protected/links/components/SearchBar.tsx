"use client"

import { ChangeEvent } from "react"


export function SearchBar({ onChange }: { onChange: (value: string) => void }) {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    onChange(e.currentTarget.value)

  }

  return (

    <input className="w-64 text-sm py-2 px-3 rounded-lg border-1.5 border-neutral-800/70 bg-neutral-950
    focus:border-green-400"
      type="text"
      placeholder="Search by original URL"
      onChange={(e) => handleChange(e)} />

  )

}