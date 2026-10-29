import { toggleMenuDrawer } from "@/store/modal-slice";
import { IconPlus } from "@tabler/icons-react";
import { useDispatch } from "react-redux";

interface Props {
  type: "recent" | "protected"
}

const contentByType: Record<Props["type"], { title: string; description: string; actionLabel: string | null }> = {
  recent: {
    title: "No shortened links yet",
    description: "Create your first shortened link now",
    actionLabel: "Create first link",
  },
  protected: {
    title: "No protected links yet",
    description: "Keep your content safe and private. Use the shield button to protect",
    actionLabel: null,
  },
}

export function EmptyLinks({ type }: Props) {

  const dispatch = useDispatch()
  const content = contentByType[type]

  return (

    <section className="relative isolate overflow-hidden rounded-2xl border border-neutral-800/80 bg-card p-5 ">

      <div>
        <h1 className="text-lg font-semibold text-neutral-100">
          {content.title}
        </h1>

        <p className="text-sm leading-6 text-neutral-400">
          {content.description}
        </p>
      </div>

      {
        content.actionLabel &&

        <button className="mt-4 flex shrink-0 w-fit items-center justify-center gap-2 rounded-lg bg-linear-to-r from-green-500 to-sky-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-950/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-sky-900/30"
          type="button"
          onClick={() => dispatch(toggleMenuDrawer())}>

          <IconPlus className="size-4" />
          {content.actionLabel}

        </button>
      }
    </section>
  )
}