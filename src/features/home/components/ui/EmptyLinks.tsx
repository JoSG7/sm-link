import { toggleMenuDrawer } from "@/store/modal-slice";
import { IconPaperclip, IconPlus, IconShield } from "@tabler/icons-react";
import { useDispatch } from "react-redux";

interface Props {
  type: "recent" | "protected"
}

export function EmptyLinks({ type }: Props) {

  const dispatch = useDispatch()  

  return (

    <section className="p-4 rounded-lg border border-neutral-800 ">

      {/* Card Title */}
      <h1 className="text-2xl font-medium flex gap-4 items-center text-transparent bg-clip-text 
      bg-gradient-to-b from-green-500 to-blue-700 ">

        {/* Icon */}
        <div className="p-2 flex items-center justify-center rounded-xl text-white
        bg-gradient-to-br from-green-500 via-emerald-500 to-blue-700 ">
          {
            type == "recent" ?
              <IconPaperclip className="size-7 " /> :

              <IconShield className="size-7 " />
          }
        </div>

        {/* Title */}
        {
          type == "recent" ?
            "No shortened links yet" :
            "No protected links yet"
        }
      </h1>

      {/* Card Text */}
      <p className="pt-3 text-sm text-neutral-300 ">
        {
          type == "recent" ?
            "Start creating your first shortened links and manage all your URLs in one place" :
            "Keep your content safe and private. Use the shield button to protect"
        }
      </p>

      {/* Card button only for Recent Links */}
      {
        type == "recent" &&

        <button className="w-full py-2 px-3 mt-3 text-base flex gap-1 items-center justify-center rounded-xl
        bg-gradient-to-r from-green-500 via-emerald-500 to-blue-700 cursor-pointer"
          type="button"
          onClick={() => dispatch(toggleMenuDrawer())}>

          <IconPlus className="size-5 " />
          Create first link

        </button>
      }
    </section>
  )
}