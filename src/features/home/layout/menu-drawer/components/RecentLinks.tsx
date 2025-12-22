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
      <div className="px-4 pb-4 flex flex-col gap-4 ">
        {
          loading ?
            // Skeleton
            <div className="flex flex-col gap-4 ">
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



