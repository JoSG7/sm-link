import { LinkDetails } from "@/types/global";
import { EmptyLinks } from "../../../ui/EmptyLinks";
import { ProtectedLinkCard } from "./ProtectedLinkCard";
import { ProtectedLinkCardSkeleton } from "@/features/home/ui/LoadingSkeleton";

export function ProtectedLinks({ loading, data }: { loading: boolean, data: LinkDetails[] | [] }) {

  return (

    <div className="px-4 pb-4 grid grid-cols-2 gap-4 ">
      {
        loading ?
          <div className="col-span-2 grid grid-cols-2 gap-4 ">
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




