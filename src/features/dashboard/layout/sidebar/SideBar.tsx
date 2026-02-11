"use client"

import { IconChartBar, IconLayoutDashboard, IconLink } from "@tabler/icons-react"
// import { UserProfile } from "./components/UserProfile"
import { ReactNode } from "react"
import Link from "next/link"
import { Tooltip } from "@radix-ui/react-tooltip"
import { TooltipContent, TooltipTrigger } from "@/features/shared/components/shadcn/tooltip"

interface SideBarContent {
  title: string | ReactNode
  icon?: ReactNode
  route: string
}

export function SideBar() {

  const generalContent: SideBarContent[] = [
    {
      title: "Dashboard",
      icon: <IconLayoutDashboard className="size-5 lg:size-6" />,
      route: "/dashboard"
    },
    {
      title: "Analytics",
      icon: <IconChartBar className="size-5 lg:size-6" />,
      route: "/dashboard/analytics"
    },
    {
      title: "SmLinks",
      icon: <IconLink className="size-5 lg:size-6" />,
      route: "/dashboard/links"
    }
  ]


  return (

    <aside className="max-h-screen w-max flex flex-col bg-neutral-950 border-r-2 border-neutral-900">

      <section className="grow overflow-y-auto mask-b-from-90% lg:p-4">

        {/* General features */}
        <ul className="flex flex-col gap-4 text-neutral-300">
          {
            generalContent.map((el, i) => (
              <Tooltip key={i} >
                <TooltipTrigger asChild>
                  <Link className="cursor-pointer duration-300 hover:text-white"
                    href={el.route}>
                    {el.icon}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-sm border border-neutral-700 translate-x-3" >
                  <h1>{el.title}</h1>
                </TooltipContent>
              </Tooltip>
            ))
          }
        </ul>

        {/* Settings Title */}
        {/* <h2 className="text-neutral-400 text-sm pt-6 pb-3">SETTINGS</h2> */}

        {/* Settings Features */}
        {/* <ul className="flex flex-col gap-3 text-neutral-300">

          <div className="flex items-center gap-2 cursor-pointer duration-300 hover:text-white">
            <IconSettings className="size-5 lg:size-7" />
            Settings
          </div>

          <div className="flex items-center gap-2 cursor-pointer duration-300 hover:text-white">
            <IconUser className="size-5" />
            Account
          </div>

        </ul> */}

      </section>

      {/* <UserProfile /> */}

    </aside>

  )

}