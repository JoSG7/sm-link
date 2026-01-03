"use client"

import { IconChartBar, IconLayoutDashboard, IconLink, IconSettings, IconUser, IconWindmillFilled } from "@tabler/icons-react"
import { UserProfile } from "./components/UserProfile"

export function SideBar() {

  return(

    <aside className="w-72 lg:p-5 bg-neutral-950 border-r-2 border-neutral-900 relative overflow-y-auto">

      <UserProfile />
      
      {/* Title and Logo */}
      <header className="flex items-center gap-3">

        <div className="p-2 bg-neutral-900 rounded-lg ">
          <IconWindmillFilled className="size-5" />
        </div>

        <h1 className="text-xl font-medium">SmLink</h1>
      </header>

      {/* Feature title */}
      <h2 className="text-neutral-400 text-sm pt-6 pb-3">GENERAL</h2>

      {/* Group of features */}
      <ul className="flex flex-col gap-3 text-neutral-300">

        <div className="flex items-center gap-2 cursor-pointer duration-300 hover:text-white">
          <IconLayoutDashboard className="size-5" />
          Dashboard
        </div>

        <div className="flex items-center gap-2 cursor-pointer duration-300 hover:text-white">
          <IconLink className="size-5" />
          Your SmLinks
        </div>

        <div className="flex items-center gap-2 cursor-pointer duration-300 hover:text-white">
          <IconChartBar className="size-5" />
          Analytics
        </div>

      </ul>

      <h2 className="text-neutral-400 text-sm pt-6 pb-3">SETTINGS</h2>

      <ul className="flex flex-col gap-3 text-neutral-300">

        <div className="flex items-center gap-2 cursor-pointer duration-300 hover:text-white">
          <IconSettings className="size-5" />
          Settings
        </div>

        <div className="flex items-center gap-2 cursor-pointer duration-300 hover:text-white">
          <IconUser className="size-5" />
          Account
        </div>

      </ul>

    </aside>

  )

}