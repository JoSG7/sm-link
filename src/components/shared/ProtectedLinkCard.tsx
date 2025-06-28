import { useRemoveLinkPwdModal } from "@/hooks/useModal";
import { LinkDetails } from "@/types/global";
import { IconTrashFilled } from "@tabler/icons-react";
import Image from "next/image";
import { RemoveLinkPwdModal } from "../../modals/home/RemoveLinkPwd";

export function ProtectedLinkCard({ data }: { data: LinkDetails }) {
  const url = new URL(data.original)
  const domain = url.hostname
  const { toggleRemoveLinkPwdModal } = useRemoveLinkPwdModal()


  if (!data.has_password) return

  return (
    <article className="rounded-xl border border-[#1c1c1d] p-3 flex">
      <RemoveLinkPwdModal />
      <section className="w-full">
        <div className="flex justify-center pb-3">
          <Image src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} alt="logo" width={60} height={60}
            className="size-12 rounded-full sm:size-14" />
        </div>
        <p className="font-semibold text-center text-sm">{data.short}</p>
      </section>
      <aside>
        <button className="p-2 rounded-md bg-neutral-900 flex gap-1 items-center text-sm"
          onClick={() => toggleRemoveLinkPwdModal(data.short)}>
          <IconTrashFilled className="size-4 " />
        </button>
      </aside>
    </article>
  )
}