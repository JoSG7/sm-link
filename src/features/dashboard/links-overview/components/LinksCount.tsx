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
        <>

          <div>
            <h1 className="text-neutral-300 text-sm pb-1">
              Total links
            </h1>

            <div className="text-4xl font-semibold">
              {
                loading ? 
                <div className="size-10 bg-neutral-800 animate-pulse rounded-lg" />
                :
                <p>
                  {count}
                </p>
              }
            </div>
          </div>
        
          <div className="p-2 rounded-full bg-green-300">
            <IconLink className="size-10 text-green-500" />
          </div>
        </>
      }
    </article>

  )

}