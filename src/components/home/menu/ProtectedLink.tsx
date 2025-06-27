import { LinkCardSkeleton } from "@/components/shared/LoadingSkeleton";
import { NoFound } from "@/components/shared/NoFound";
import { ProtectedLinkCard } from "@/components/shared/ProtectedLinkCard";
import { LinkDetails } from "@/types/global";

export function ProtectedLinks({ loading, data }: { loading: boolean, data: LinkDetails[] | [] }) {

  return (

    <div className="px-4 pb-4 grid lg-2:grid-cols-3 lg-2:gap-4">
      {
        loading ?
          <div className="flex flex-col gap-4">
            <LinkCardSkeleton />
            <LinkCardSkeleton />
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