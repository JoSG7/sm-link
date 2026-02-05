"use client"

import { IconMenu } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { toggleMenuDrawer } from "@/store/modal-slice";
import { LogoBrand } from "./components/LogoBrand";
import { LoginButton } from "./components/LoginButton";
import { useScreenSize } from "../../hooks/useScreenSize";


export function HomeNavBar() {

  const dispatch = useDispatch()
  const windowWidth = useScreenSize()

  return (

    <header className="flex py-4 bg-[rgba(0,0,0,0.7)] sticky top-0 left-0 right-0 justify-center z-10
    backdrop-blur-sm ">

      <div className="w-full flex justify-between px-4 xs:px-6
      xl:w-full xl:max-w-8xl">

        <LogoBrand />

        <div className="flex items-center gap-4">
          
          {
            windowWidth > 768 &&
            <LoginButton />
          }

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

