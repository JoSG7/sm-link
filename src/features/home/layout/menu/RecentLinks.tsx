"use client"

import { LinkDetails } from "@/global"
import { LinkCardSkeleton } from "../../components/ui/LoadingSkeleton"
import { LinkCard } from "./LinkCard"
import { NoFound } from "../../components/ui/NoFound"

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
      lg:gap-4">
        {
          loading ?
            <div className="flex flex-col gap-4 2xl:gap-5 3xl:gap-6 4xl:gap-8">
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



