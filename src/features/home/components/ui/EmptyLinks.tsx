import { toggleMenuDrawer } from "@/store/modal-slice";
import { IconPaperclip, IconPlus, IconShield } from "@tabler/icons-react";
import { useDispatch } from "react-redux";

interface Props {
  type: "recent" | "protected"
}

export function EmptyLinks({ type }: Props) {

  const dispatch = useDispatch()  

  return (

    <section className="p-4 rounded-lg border border-neutral-800 
    xs:p-5 sm:p-6 md:p-7 lg:p-5 
    2xl:p-6 3xl:p-7 4xl:p-9 ">

      {/* Card Title */}
      <h1 className="text-2xl-movil font-medium flex gap-4 items-center text-transparent bg-clip-text 
      bg-gradient-to-b from-green-500 to-blue-700
      xs:gap-5 
      sm:gap-6 sm:text-3x-tablet 
      md:gap-7
      lg:gap-4 lg:text-2xl
      xl:text-2xl-desktop
      2xl:gap-5 3xl:gap-6 4xl:gap-8 ">

        {/* Icon */}
        <div className="p-2 flex items-center justify-center rounded-xl text-white
        bg-gradient-to-br from-green-500 via-emerald-500 to-blue-700 4xl:p-3">
          {
            type == "recent" ?
              <IconPaperclip className="size-7 xs:size-8 sm:size-9 md:size-10 
              lg:size-7 2xl:size-8 3xl:size-9 4xl:size-11" /> :

              <IconShield className="size-7 xs:size-8 sm:size-9 md:size-10 
              lg:size-7 2xl:size-8 3xl:size-9 4xl:size-11" />
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
      md:pt-6
      lg:pt-4 lg:text-sm
      xl:text-sm-desktop
      2xl:pt-5 3xl:pt-6 4xl:pt-8">
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
        bg-gradient-to-r from-green-500 via-emerald-500 to-blue-700 cursor-pointer
        xs:mt-4 
        sm:mt-5 sm:gap-2
        md:mt-6 md:gap-3
        lg:mt-4 lg:gap-1 lg:text-base
        xl:text-base-desktop
        2xl:mt-5 2xl:gap-2 2xl:py-3 2xl:px-4
        3xl:mt-6 3xl:gap-3
        4xl:mt-8 4xl:gap-5"
          type="button"
          onClick={() => dispatch(toggleMenuDrawer())}>

          <IconPlus className="size-5 xs:size-6 sm:size-7 
          md:size-8 lg:size-6 2xl:size-7 3xl:size-8 4xl:size-10" />
          Create first link

        </button>
      }
    </section>
  )
}