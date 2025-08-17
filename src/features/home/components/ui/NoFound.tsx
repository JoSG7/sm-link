import { IconExclamationCircleFilled, IconPlus } from "@tabler/icons-react";
import { useMenuDrawer } from "../../hooks/useModals";
import { useScrollTo } from "../../hooks/useScrollTo";

export function NoFound() {

  const { toggleMenu } = useMenuDrawer()
  const scrollTo = useScrollTo()

  return (

    <section className="rounded-lg border border-graphite p-6 lg-2:col-span-4">
      <div className="flex justify-center">
        <IconExclamationCircleFilled className="size-16 text-sky-300" />
      </div>

      <p className="text-center text-lg font-semibold py-2">You haven’t created any SmLink yet</p>
      <p className="text-center text-neutral-300 pb-3">Ready to shorten your first link?</p>

      <div className="flex justify-center">
        <button className="py-2 px-3 rounded-xl border border-green-200 flex items-center gap-1 text-green-300" 
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