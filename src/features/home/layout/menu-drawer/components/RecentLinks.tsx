"use client"

import { LinkDetails } from "@/types/global"
import { LinkCardSkeleton } from "../../../ui/LoadingSkeleton"
import { EmptyLinks } from "../../../ui/EmptyLinks"
import { SmLinkCard } from "./SmLinkCard"

interface Props {
  loading: boolean
  data: LinkDetails[] | []
}

export function RecentLinks({loading, data} : Props) {

  return (
    <>
      {/* Layout for Cards */}
      <div className="px-4 pb-4 flex flex-col gap-4 xl:px-5 xl:pb-5 xl:gap-5">
        {
          loading ?
            // Skeleton
            <div className="flex flex-col gap-4 xl:gap-5">
              <LinkCardSkeleton />
              <LinkCardSkeleton />
            </div>
            :
            // Cards
            data.length > 0 ?
              data.map((element) => (
                <SmLinkCard key={element.id} data={element} />
              ))
              :
              <EmptyLinks type="recent" />
        }
      </div>
    </>
  )
}



