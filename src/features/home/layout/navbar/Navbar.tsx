"use client"

import { IconMenu } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { toggleMenuDrawer } from "@/store/modal-slice";
import { LoginButton } from "./components/LoginButton";
import Link from "next/link";


export function HomeNavBar() {

  const dispatch = useDispatch()

  return (

    <header className="h-16 px-4 flex justify-center bg-transparent/70 sticky top-0 left-0 right-0 z-10 backdrop-blur-sm sm:h-18 sm:px-5">

      <div className="flex w-full max-w-7xl items-center justify-end">

        <div className="flex items-center gap-4">

          <Link href="/dashboard" >
            Dashboard
          </Link>

          {process.env.NODE_ENV !== "production" && <LoginButton />}

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

