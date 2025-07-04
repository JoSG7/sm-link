import { useMenuDrawer } from "@/hooks/useModal";
import { useScrollTo } from "@/hooks/useScrollTo";
import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";

export function NoFound() {

  const { toggleMenu } = useMenuDrawer()
  const scrollTo = useScrollTo()

  return (

    <section className="rounded-lg border border-[#1c1d1d] p-5 lg-2:col-span-4">
      <div className="flex justify-center">
        <Image src="/imgs/clip.png" alt="NoLinksImg" width={80} height={80} className="rounded-full" />
      </div>

      <p className="text-center text-lg font-semibold py-2">You haven’t created any SmLinks yet</p>
      <p className="text-center text-neutral-300 pb-3">Ready to shorten your first link?</p>

      <div className="flex justify-center">
        <button className="py-2 px-3 rounded-xl border border-gold flex items-center gap-1 text-gold" 
        type="button" onClick={() => {
          toggleMenu()
          scrollTo("link-form-section")
        }}>
          <IconPlus className="size-5" />
          Create first SmLink
        </button>
      </div>

    </section>

  )

}