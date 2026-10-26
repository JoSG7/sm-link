import { toggleMenuDrawer } from "@/store/modal-slice";
import { IconPaperclip, IconPlus, IconShield } from "@tabler/icons-react";
import { useDispatch } from "react-redux";

interface Props {
  type: "recent" | "protected"
}

export function EmptyLinks({ type }: Props) {

  const dispatch = useDispatch()

  return (

    <section className="relative isolate overflow-hidden rounded-2xl border border-neutral-800/80 bg-card p-5 ">

      <div className="flex items-start gap-4">

        <div className={`flex items-center justify-center rounded-xl p-2.5 ring-1 ${type === "recent" ? "bg-green-500/15 text-green-300 ring-green-400/20" : "bg-blue-500/15 text-blue-300 ring-blue-400/20"}`}>
          {
            type == "recent" ?
              <IconPaperclip className="size-6" /> 
              :
              <IconShield className="size-6" />
          }
        </div>

        <div>
          <h1 className="text-xl font-semibold text-neutral-100">
            {
              type == "recent" ?
                "No shortened links yet" :
                "No protected links yet"
            }
          </h1>

          <p className="text-sm leading-6 text-neutral-400">
            {
              type == "recent" ?
                "Create your first shortened link now" :
                "Keep your content safe and private. Use the shield button to protect"
            }
          </p>
        </div>
      </div>

      {/* Card button only for Recent Links */}
      {
        type == "recent" &&

        <button className="mt-5 flex shrink-0 w-fit items-center justify-center gap-2 rounded-lg bg-linear-to-r from-green-500 to-sky-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-950/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-sky-900/30"
          type="button"
          onClick={() => dispatch(toggleMenuDrawer())}>

          <IconPlus className="size-4" />
          Create first link

        </button>
      }
    </section>
  )
}