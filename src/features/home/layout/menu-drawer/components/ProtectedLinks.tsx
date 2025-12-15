import { LinkDetails } from "@/global";
import { ProtectedLinkCardSkeleton } from "../../../components/ui/LoadingSkeleton";
import { EmptyLinks } from "../../../components/ui/EmptyLinks";
import { ProtectedLinkCard } from "./ProtectedLinkCard";

export function ProtectedLinks({ loading, data }: { loading: boolean, data: LinkDetails[] | [] }) {

  return (

    <div className="px-4 pb-4 grid grid-cols-2 gap-4
    xs:px-5 xs:pb-5 xs:gap-5
    sm:px-6 sm:pb-6 sm:gap-6
    md:px-7 md:pb-7 md:gap-7
    lg:px-5 lg:pb-5 lg:gap-5
    2xl:px-6 2xl:pb-6 2xl:gap-6
    3xl:px-7 3xl:pb-7 3xl:gap-7
    4xl:px-9 4xl:pb-9 4xl:gap-9">
      {
        loading ?
          <div className="col-span-2 grid grid-cols-2 gap-4 
          xs:gap-5 sm:gap-6 md:gap-7
          lg:gap-5
          2xl:gap-5 3xl:gap-6 4xl:gap-8">
            <ProtectedLinkCardSkeleton />
            <ProtectedLinkCardSkeleton />
            <ProtectedLinkCardSkeleton />
            <ProtectedLinkCardSkeleton />
          </div>
          :
          data.length > 0 ?
            data.filter((element) => element.has_password).length == 0 ?
              <div className="col-span-2 lg:col-span-3">
                <EmptyLinks type="protected" />
              </div>
              :
              data.map((element) => (
                <ProtectedLinkCard key={element.id} data={element} />
              ))
            :
            <div className="col-span-2 lg:col-span-3">
              <EmptyLinks type="protected" />
            </div>
      }
    </div>
  )
}




