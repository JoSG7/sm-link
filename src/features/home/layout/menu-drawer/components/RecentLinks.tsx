"use client"

import { LinkDetails } from "@/global"
import { LinkCardSkeleton } from "../../../components/ui/LoadingSkeleton"
import { LinkCard } from "./LinkCard"
import { EmptyLinks } from "../../../components/ui/EmptyLinks"

interface Props {
  loading: boolean
  data: LinkDetails[] | []
}

export function RecentLinks({loading, data} : Props) {

  return (
    <>
      {/* Layout for Cards */}
      <div className="px-4 pb-4 flex flex-col gap-4 
      xs:px-5 xs:pb-5 xs:gap-5
      sm:px-6 sm:pb-6 sm:gap-6
      md:px-7 md:pb-7 md:gap-7
      lg:px-5 lg:pb-5 lg:gap-5
      2xl:px-6 2xl:pb-6 2xl:gap-6
      3xl:px-7 3xl:pb-7 3xl:gap-7
      4xl:px-9 4xl:pb-9 4xl:gap-9">
        {
          loading ?
            // Skeleton
            <div className="flex flex-col gap-4 
            sm:gap-6 md:gap-7 lg:gap-5
            2xl:gap-6 3xl:gap-7 4xl:gap-9">
              <LinkCardSkeleton />
              <LinkCardSkeleton />
            </div>
            :
            // Cards
            data.length > 0 ?
              data.map((element) => (
                <LinkCard key={element.id} data={element} />
              ))
              :
              <EmptyLinks type="recent" />
        }
      </div>
    </>
  )
}



