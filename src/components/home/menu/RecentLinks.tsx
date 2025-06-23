"use client"

import { LinkCard } from "@/components/shared/LinkCard"
import { LinkCardSkeleton } from "@/components/shared/LoadingSkeleton"
import { NoFound } from "@/components/shared/NoFound"
import { GuestLinks } from "@/types/global"

export function RecentLinks({loading, data} : { loading: boolean, data: GuestLinks[] | []}) {

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
                <LinkCard key={element.id} short={element.short} original={element.original} created_at={element.created_at} />
              ))
              :
              <NoFound />
        }
      </div>
    </>
  )
}



