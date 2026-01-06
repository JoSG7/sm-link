"use client"

import { IconChartBar, IconClockExclamation, IconLayoutDashboard, IconLink, IconSettings, IconShieldCheck, IconUser, IconWindmillFilled } from "@tabler/icons-react"
import { UserProfile } from "./components/UserProfile"
import { ReactNode } from "react"
import Link from "next/link"

interface SideBarContent {
  title: string | ReactNode
  icon?: ReactNode
  route: string
}

export function SideBar() {

  const generalContent: SideBarContent[] = [
    {
      title: "Dashboard",
      icon: <IconLayoutDashboard className="size-5" />,
      route: "/dashboard"
    },
    {
      title: "Analytics",
      icon: <IconChartBar className="size-5" />,
      route: "/dashboard/analytics"
    },
  ]

  const linksContent: SideBarContent[] = [
    {
      title: "SmLinks",
      icon: <IconLink className="size-5" />,
      route: "/dashboard/links"
    },
    {
      title: "Protected Links",
      icon: <IconShieldCheck className="size-5" />,
      route: "/dashboard/protected-links"
    },
    {
      title: "Link Expirations",
      icon: <IconClockExclamation className="size-5" />,
      route: "/dashboard/link-expirations"
    },
  ]


  return (

    <aside className="max-h-screen w-72 flex flex-col bg-neutral-950 border-r-2 border-neutral-900">

      {/* Title and Logo */}
      <header className="flex items-center gap-3 border-b-2 border-neutral-900 lg:p-5">

        <div className="p-2 bg-neutral-900 rounded-lg ">
          <IconWindmillFilled className="size-5" />
        </div>

        <h1 className="text-xl font-medium">SmLink</h1>
      </header>

      <section className="grow overflow-y-auto mask-b-from-90% lg:p-5">

        {/* Feature title */}
        <h2 className="text-neutral-400 text-sm pb-3">GENERAL</h2>

        {/* General features */}
        <ul className="flex flex-col gap-3 text-neutral-300">

          {
            generalContent.map((el, i) => (
              <Link key={i} className="flex items-center gap-2 cursor-pointer duration-300 hover:text-white"
                href={el.route}>
                {el.icon}
                {el.title}
              </Link>
            ))
          }

        </ul>

        {/* Links Title */}
        <h2 className="text-neutral-400 text-sm pt-6 pb-3">LINKS</h2>

        {/* Links Features */}
        <ul className="flex flex-col gap-3 text-neutral-300">

          {
            linksContent.map((el, i) => (
              <Link className="flex items-center gap-2 cursor-pointer duration-300 hover:text-white"
                href={el.route}
                key={i}>
                {el.icon}
                {el.title}
              </Link>
            ))
          }

        </ul>

        {/* Settings Title */}
        <h2 className="text-neutral-400 text-sm pt-6 pb-3">SETTINGS</h2>

        {/* Settings Features */}
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

      </section>

      <UserProfile />

    </aside>

  )

}