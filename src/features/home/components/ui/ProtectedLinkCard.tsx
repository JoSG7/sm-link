import { useRemovePasswordModal } from "@/hooks/useModal";
import { LinkDetails } from "@/global";
import { IconTrashFilled } from "@tabler/icons-react";
import Image from "next/image";
import { RemoveLinkPwdModal } from "../../modals/home/RemoveLinkPwd";

export function ProtectedLinkCard({ data }: { data: LinkDetails }) {
  const url = new URL(data.original)
  const domain = url.hostname
  const { toggleRemovePasswordModal } = useRemovePasswordModal()

  if (!data.has_password) return

  return (
    <article className="rounded-xl border border-graphite p-3 flex xs:p-4
    2xl:p-5
    3xl:p-6
    4xl:p-8">
      <RemoveLinkPwdModal />
      <section className="w-full">
        <div className="flex justify-center pb-3">
          <Image className="size-12 rounded-full xs:size-14
          2xl:size-16 3xl:size-[72px] 4xl:size-24"
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} alt="logo" width={60} height={60} />
        </div>
        <p className="font-semibold text-center text-sm-movil
        lg:text-sm-desktop-sm
        lg-2:text-sm-desktop ">
          {data.short}
        </p>
      </section>
      <aside>
        <button className="p-2 rounded-md bg-neutral-900 3xl:p-2.5 4xl:p-3"
          onClick={() => toggleRemovePasswordModal(data.short)}>
          <IconTrashFilled className="size-4 xs:size-5 2xl:size-6 3xl:size-7 4xl:size-9" />
        </button>
      </aside>
    </article>
  )
}