import { ProtectedLinkCardSkeleton } from "@/components/shared/LoadingSkeleton";
import { NoFound } from "@/components/shared/NoFound";
import { ProtectedLinkCard } from "@/components/shared/ProtectedLinkCard";
import { LinkDetails } from "@/types/global";

export function ProtectedLinks({ loading, data }: { loading: boolean, data: LinkDetails[] | [] }) {

  return (

    <div className="px-4 pb-4 grid grid-cols-2 gap-4
    xs:px-5 xs:pb-5 xs:gap-5
    lg:grid-cols-3 lg:gap-4
    2xl:px-5 2xl:pb-5 2xl:gap-5
    3xl:px-6 3xl:pb-6 3xl:gap-6
    4xl:px-8 4xl:pb-8 4xl:gap-8">
      {
        loading ?
          <div className="col-span-2 grid
          xs:px-5 xs:pb-5 xs:gap-5
          lg:grid-cols-3 lg:gap-4
          lg-2:gap-5 ">
            <ProtectedLinkCardSkeleton />
            <ProtectedLinkCardSkeleton />
            <ProtectedLinkCardSkeleton />
            <ProtectedLinkCardSkeleton />
            <ProtectedLinkCardSkeleton />
          </div>
          :
          data.length > 0 ?
            data.map((element) => (
              <ProtectedLinkCard key={element.id} data={element} />
            ))
            :
            <NoFound />
      }
    </div>
  )
}