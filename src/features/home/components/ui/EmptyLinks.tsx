import { IconPaperclip, IconPlus, IconShield } from "@tabler/icons-react";
import { useMenuDrawer } from "../../hooks/useModals";

interface Props {
  type: "recent" | "protected"
}

export function NoFound({ type }: Props) {

  const { toggleMenu } = useMenuDrawer()

  return (

    <section className="p-4 rounded-lg border border-neutral-800 
    xs:p-5 sm:p-6 md:p-7">

      {/* Card Title */}
      <h1 className="text-2xl-movil font-medium flex gap-4 items-center text-transparent bg-clip-text 
      bg-gradient-to-b from-green-500 to-blue-700
      xs:gap-5 
      sm:gap-6 sm:text-3x-tablet 
      md:gap-7">

        {/* Icon */}
        <div className="p-2 flex items-center justify-center rounded-xl text-white
        bg-gradient-to-br from-green-500 via-emerald-500 to-blue-700">
          {
            type == "recent" ?
            <IconPaperclip className="size-7 xs:size-8 sm:size-9 md:size-10" /> :
            <IconShield className="size-7 xs:size-8 sm:size-9 md:size-10 " />
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
      <p className="pt-3 text-sm-movil text-neutral-300
      xs:pt-4 
      sm:pt-5 sm:text-lg-tablet 
      md:pt-6">
        {
          type == "recent" ? 
          "Start creating your first shortened links and manage all your URLs in one place" :
          "Keep your content safe and private. Use the shield button to protect"
        }
      </p>

      {/* Card button only for Recent Links */}
      {
        type == "recent" &&

        <button className="w-full py-2 px-3 mt-3 text-base-movil flex gap-1 items-center justify-center rounded-xl
        bg-gradient-to-r from-green-500 via-emerald-500 to-blue-700
        xs:mt-4 
        sm:mt-5 sm:gap-2
        md:mt-6 md:gap-3"
        type="button"
        onClick={() => toggleMenu()}>
          <IconPlus className="size-5 xs:size-6 sm:size-7 md:size-8" />
          Create first link
        </button>
      }
    </section>
  )
}