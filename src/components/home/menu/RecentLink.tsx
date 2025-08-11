"use client"

import { LinkCard } from "@/components/shared/LinkCard"
import { LinkCardSkeleton } from "@/components/shared/LoadingSkeleton"
import { NoFound } from "@/components/shared/NoFound"
import { LinkDetails } from "@/types/global"

export function RecentLinks({loading, data} : { loading: boolean, data: LinkDetails[] | []}) {

  return (
    <>
      <div className="px-4 pb-4 flex flex-col gap-4 xs:px-5 xs:pb-5 xs:gap-5
      lg:px-4 lg:pb-4 lg:gap-4
      2xl:px-5 2xl:pb-5 2xl:gap-5
      3xl:px-6 3xl:pb-6 3xl:gap-6
      4xl:px-8 4xl:pb-8 4xl:gap-8">
        {
          loading ?
            <div className="flex flex-col gap-4 ">
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



