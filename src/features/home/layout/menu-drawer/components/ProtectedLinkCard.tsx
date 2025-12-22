import { LinkDetails } from "@/global";
import { IconTrashFilled } from "@tabler/icons-react";
import { DomainLogo } from "../../../components/ui/DomainLogo";
import { useDispatch } from "react-redux";
import { toggleDeletePassword } from "@/store/modal-slice";


export function ProtectedLinkCard({ data }: { data: LinkDetails }) {
  const url = new URL(data.original)
  const domain = url.hostname

  const dispatch = useDispatch()

  if (!data.has_password) return

  return (
    <article className="rounded-xl border border-neutral-800 p-3 flex duration-300 ">

      <section className="w-full">
        <div className="flex justify-center pb-3 ">
          <DomainLogo domain={domain} />
        </div>

        <p className="font-semibold text-center text-sm ">
          {data.short}
        </p>
      </section>

      <aside>
        <button className="p-2 rounded-md bg-neutral-900 "
          onClick={() => dispatch(toggleDeletePassword(data.short))}>

          <IconTrashFilled className="size-4 " />
        </button>
      </aside>
    </article>
  )
}