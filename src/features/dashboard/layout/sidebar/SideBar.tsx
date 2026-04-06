"use client"

import { IconChartBar, IconLayoutDashboard, IconLink } from "@tabler/icons-react"
import { ReactNode } from "react"
import Link from "next/link"
import { Tooltip } from "@radix-ui/react-tooltip"
import { TooltipContent, TooltipTrigger } from "@/features/shared/components/shadcn/tooltip"
import { User } from "@supabase/supabase-js"
import { UserProfile } from "./components/UserProfile"

interface SideBarContent {
  title: string | ReactNode
  icon?: ReactNode
  route: string
}

export function SideBar({ user }: { user: User }) {

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

    <aside className="w-16 p-3 py-4 max-h-screen flex flex-col justify-between items-center 
    bg-neutral-950 border-r-2 border-neutral-900">

      <section className="overflow-y-auto">

        {/* General features */}
        <ul className="flex flex-col gap-2 text-neutral-300">
          {
            generalContent.map((el, i) => (
              <Tooltip key={i} >
                <TooltipTrigger asChild>
                  <Link className="p-1.5 cursor-pointer duration-300 hover:text-white"
                    href={el.route}>
                    {el.icon}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-sm border border-neutral-700 translate-x-2" >
                  <h1>{el.title}</h1>
                </TooltipContent>
              </Tooltip>
            ))
          }
        </ul>

      </section>

      <UserProfile user={user} />

    </aside>

  )

}
