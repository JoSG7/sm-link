"use client"

import { IconMenu } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { toggleMenuDrawer } from "@/store/modal-slice";
import { LogoBrand } from "./components/LogoBrand";
// import { LoginButton } from "./components/LoginButton";


export function HomeNavBar() {

  const dispatch = useDispatch()

  return (

    <header className="h-16 flex justify-center bg-black/70 sticky top-0 left-0 right-0  z-10
    backdrop-blur-sm sm:h-18">

      <div className="w-full flex justify-between px-4 xs:px-6
      xl:w-full xl:max-w-8xl">

        <LogoBrand />

        <div className="flex items-center gap-4">

          {/* <LoginButton /> */}

          <button className="flex justify-center items-center cursor-pointer p-2 rounded-full border border-neutral-700"
            type="button"
            onClick={() => { dispatch(toggleMenuDrawer()) }}>

            <IconMenu className="size-5 xl:size-6" />
          </button>
        </div>

      </div>

    </header>

  )

}

