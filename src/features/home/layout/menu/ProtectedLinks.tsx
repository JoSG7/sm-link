import { LinkDetails } from "@/global";
import { ProtectedLinkCardSkeleton } from "../../components/ui/LoadingSkeleton";
import { NoFound } from "../../components/ui/NoFound";
import { ProtectedLinkCard } from "./ProtectedLinkCard";

export function ProtectedLinks({ loading, data }: { loading: boolean, data: LinkDetails[] | [] }) {

  return (

    <div className="px-4 pb-4 grid grid-cols-2 gap-4
    xs:px-5 xs:pb-5 xs:gap-5
    sm:px-6 sm:pb-6 sm:gap-6
    md:px-7 md:pb-7 md:gap-7
    lg:grid-cols-3 lg:gap-4
    2xl:px-5 2xl:pb-5 2xl:gap-5
    3xl:px-6 3xl:pb-6 3xl:gap-6
    4xl:px-8 4xl:pb-8 4xl:gap-8">
      {
        loading ?
          <div className="col-span-2 grid grid-cols-2 gap-4 
          xs:gap-5 sm:gap-6 md:gap-7
          lg:col-span-3 lg:grid-cols-3 lg:gap-4
          2xl:gap-5 3xl:gap-6 4xl:gap-8">
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
            <div className="col-span-2 lg:col-span-3">
              <NoFound />
            </div>
      }
    </div>
  )
}