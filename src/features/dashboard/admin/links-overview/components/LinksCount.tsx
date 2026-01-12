"use client"

import { IconLink } from "@tabler/icons-react"

interface Props {
  loading: boolean
  count: number
}


export function LinksCount({ loading, count }: Props) {

  return (

    <article className="p-4 flex items-center justify-between rounded-lg border-2 border-neutral-900 bg-neutral-900/50 
    lg:p-5">
      {
        loading ? 
        <div>carg</div>
        :
        <>

          <div>
            <h1 className="text-neutral-300 text-sm">
              Total links
            </h1>

            <p className="pt-1 text-4xl font-semibold">
              {count}
            </p>
          </div>
        
          <div className="p-2 rounded-full bg-green-300">
            <IconLink className="size-10 text-green-500" />
          </div>
        </>
      }
    </article>

  )

}