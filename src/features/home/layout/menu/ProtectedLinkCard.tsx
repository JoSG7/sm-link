import { LinkDetails } from "@/global";
import { IconTrashFilled } from "@tabler/icons-react";
import { useDeleteLinkPasswordModal } from "../../hooks/useModals";
import { DomainLogo } from "../../components/ui/DomainLogo";

export function ProtectedLinkCard({ data }: { data: LinkDetails }) {
  const url = new URL(data.original)
  const domain = url.hostname
  const { toggleDeleteLinkPasswordModal } = useDeleteLinkPasswordModal()

  if (!data.has_password) return

  return (
    <article className="rounded-xl border border-neutral-800 p-3 flex duration-300
    xs:p-4 sm:p-5 md:p-6 lg:p-4
    2xl:p-5 3xl:p-6 4xl:p-8">

      <section className="w-full">
        <div className="flex justify-center pb-3
        2xl:pb-4 3xl:pb-5 4xl:pb-7">
          <DomainLogo domain={domain} />
        </div>

        <p className="font-semibold text-center text-sm-movil
        sm:text-xl
        lg:text-sm 
        xl:text-sm-desktop">
          {data.short}
        </p>
      </section>

      <aside>
        <button className="p-2 rounded-md bg-neutral-900 
        3xl:p-2.5 4xl:p-3"
          onClick={() => toggleDeleteLinkPasswordModal(data.short)}>

          <IconTrashFilled className="size-4 
          xs:size-5 sm:size-6 md:size-7 lg:size-5
          2xl:size-6 3xl:size-7 4xl:size-9" />
        </button>
      </aside>
    </article>
  )
}