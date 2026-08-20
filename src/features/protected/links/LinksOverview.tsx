"use client"

import { IconAlarm, IconClockExclamation, IconLink, IconPlus, IconShieldCheckFilled } from "@tabler/icons-react";
import { UnclaimedLinks } from "./components/UnclaimedLinks";
import { FilterBar } from "./components/FilterBar";
import { ReactNode, useDeferredValue, useEffect, useMemo, useState } from "react";
import { RootState } from "@/store/store-config";
import { useDispatch, useSelector } from "react-redux";
import { UserLinksTable } from "./components/LinksTable";
import { toast } from "sonner";
import { toggleCreateUserLink } from "@/store/user-modals-slice";
import { UserLinkServices } from "@/services/user-link.service";
import clsx from "clsx";
import { SearchBar } from "./components/SearchBar";
import { LinkDetails } from "@/types/global";

interface StatCard {
  count: number,
  title: string,
  color: "green" | "blue" | "red" | "yellow",
  icon?: ReactNode
}

export function LinksOverview() {

  const [userLinks, setUserLinks] = useState<LinkDetails[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("")
  const [loading, setLoading] = useState(true)
  const deferredSearch = useDeferredValue(searchTerm)
  
  const { changes } = useSelector((state: RootState) => state.linkChanges)
  const dispatch = useDispatch()

  const handleSelect = (value: string) => { setFilter(value) }

  const handleSearch = (value: string) => { setSearchTerm(value) }


  const filteredLinks = useMemo(() => {

    let result = userLinks

    if (filter === "protected") {
      result = result.filter(el => el.has_password)
    }

    if (filter === "expired") {
      result = result.filter(el => el.is_expired)
    }

    if (deferredSearch) {
      result = result.filter(el =>
        el.original.toLowerCase().includes(deferredSearch.toLowerCase())
      )
    }

    return result

  }, [deferredSearch, filter, userLinks])


  useEffect(() => {

    const fetchUserLinks = async () => {

      try {

        const response = await new UserLinkServices().getUserLinks()
        setUserLinks(response)

      } catch (e) {

        toast.error((e as Error).message)

      } finally {

        setLoading(false)

      }
    }

    fetchUserLinks()

  }, [changes])


  const statCards: StatCard[] = [
    {
      title: "Total links",
      count: userLinks.length,
      color: "green",
      icon: <IconLink className="size-4 lg:size-6" />
    },
    {
      title: "Protected links",
      count: userLinks.filter(el => el.has_password).length,
      color: "blue",
      icon: <IconShieldCheckFilled className="size-4 lg:size-6" />
    },
    {
      title: "Links with Expiration",
      count: userLinks.filter(el => el.expires_at).length,
      color: "yellow",
      icon: <IconAlarm className="size-4 lg:size-6" />
    },
    {
      title: "Links Expired",
      count: userLinks.filter(el => el.is_expired).length,
      color: "red",
      icon: <IconClockExclamation className="size-4 lg:size-6" />
    }
  ]


  return (

    <section className="min-h-screen flex flex-col gap-7 md:py-7 xl:py-8">

      <header>
        <h1 className="text-4xl font-semibold">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-sky-500">SmLinks </span>
          Overview
        </h1>

        <p className="pt-2 text-neutral-300">
          Manage and track all your shortened links
        </p>
      </header>

      <UnclaimedLinks />

      <section className="grid gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {
          statCards.map((el, i) => {
            return (
              <article className="p-4 flex items-center justify-between rounded-lg border-1.5 relative
              bg-neutral-950 border-neutral-800/70 lg:p-5"
                key={i}>
                <div>
                  <h1 className={"text-neutral-200 text-sm pb-1"}>
                    {el.title}
                  </h1>

                  <div className="text-4xl font-semibold">
                    {
                      loading ?
                        <div className="size-10 bg-neutral-800 animate-pulse rounded-lg" />
                        :
                        <p className={clsx(
                          el.color == "green" && "text-green-300",
                          el.color == "blue" && "text-blue-300",
                          el.color == "yellow" && "text-yellow-200",
                          el.color == "red" && "text-red-300"
                        )}>
                          {el.count}
                        </p>
                    }
                  </div>
                </div>

                <div className={clsx("absolute p-2 rounded-full right-3 top-3",
                  el.color == "green" && "bg-green-600/30 text-green-400",
                  el.color == "blue" && "bg-blue-600/30 text-blue-400",
                  el.color == "yellow" && "bg-yellow-500/30 text-yellow-200",
                  el.color == "red" && "bg-red-600/30 text-red-400"
                )}>
                  {el.icon}
                </div>
              </article>
            )
          })
        }

      </section>

      <section className="flex justify-between items-center">

        <div className="flex gap-4">
          <FilterBar onChange={handleSelect} />
          <SearchBar onChange={handleSearch} />
        </div>

        <button className="p-3 px-4 flex items-center gap-1 rounded-lg bg-linear-to-r from-green-500 to-sky-600 
        cursor-pointer hover:scale-105 disabled:opacity-50 duration-300"
          onClick={() => dispatch(toggleCreateUserLink())}>
          <IconPlus className="size-5" />
          Create Link
        </button>
      </section>

      <UserLinksTable data={filteredLinks} loading={loading} />

    </section>

  )

}