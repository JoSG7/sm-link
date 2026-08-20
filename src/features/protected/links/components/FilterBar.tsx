"use client"

import clsx from "clsx"
import { useState } from "react"

export function FilterBar({ onChange }: { onChange: (value: string) => void }) {

  const [selected, setSelected] = useState("all")

  const handleSelect = (value: string) => {
    setSelected(value)
    onChange(value)
  }

  return (
    <section className="p-2 flex gap-1 text-sm rounded-lg border-1.5 border-neutral-800/70 bg-neutral-950">

      <button className={clsx("py-1 px-4 rounded-md cursor-pointer duration-300 ",
        selected == "all" && "text-green-300 bg-green-500/40"
      )}
        onClick={() => handleSelect("all")}>
        All
      </button>

      <button className={clsx("py-1 px-3 rounded-md cursor-pointer duration-300 ",
        selected == "protected" && "text-blue-300 bg-blue-500/40"
      )}
        onClick={() => handleSelect("protected")}>
        Protected
      </button>

      <button className={clsx("py-1 px-3 rounded-md cursor-pointer duration-300",
        selected == "expired" && "text-red-400 bg-red-500/40"
      )}
        onClick={() => handleSelect("expired")}>
        Expired
      </button>

    </section>
  )

}