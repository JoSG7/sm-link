"use client"

import { LinkCard } from "@/components/shared/LinkCard"
import { LinkCardSkeleton } from "@/components/shared/LoadingSkeleton"
import { NoFound } from "@/components/shared/NoFound"
import { LinkDetails } from "@/types/global"

export function RecentLinks({loading, data} : { loading: boolean, data: LinkDetails[] | []}) {

  return (
    <>
      <div className="px-4 pb-4 flex flex-col gap-4">
        {
          loading ?
            <div className="flex flex-col gap-4">
              <LinkCardSkeleton />
              <LinkCardSkeleton />
            </div>
            :
            data.length > 0 ?
              data.map((element) => (
                <LinkCard key={element.id} data={element} />
              ))
              :
              <NoFound />
        }
      </div>
    </>
  )
}



