"use client"

import { IconPlus } from "@tabler/icons-react";
import { LinksCount } from "./components/LinksCount";
import { UnclaimedLinks } from "./components/UnclaimedLinks";
import { SearchSelect } from "./components/SearchSelect";
import { SearchBar } from "./components/SearchBar";
import { useEffect, useState } from "react";
import { LinkDetails } from "@/global";
import { UserLinkServices } from "../../../../services/user-link.service";
import { RootState } from "@/store/store-config";
import { useDispatch, useSelector } from "react-redux";
import { UserLinksTable } from "./components/UserLinksTable";
import { toast } from "sonner";
import { toggleCreateUserLink } from "@/store/user-modals-slice";



export function LinksOverview() {

  const [userLinks, setUserLinks] = useState<LinkDetails[]>([])
  const [loading, setLoading] = useState(true)
  const { changes } = useSelector((state: RootState) => state.linkChanges)
  const dispatch = useDispatch()


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


  return (

    <section className="min-h-screen flex flex-col gap-7 md:py-7 xl:py-8">

      <header>
        <h1 className="text-4xl font-semibold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-sky-500">SmLinks </span>
          Overview
        </h1>

        <p className="pt-2 text-neutral-300">
          Manage and track all your shortened links
        </p>
      </header>

      <UnclaimedLinks />

      <section className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
        <LinksCount
          loading={loading}
          count={userLinks.length} />
      </section>

      <section className="flex justify-between items-center">
        <div className="flex gap-4">
          <SearchSelect />
          <SearchBar />
        </div>

        <button className="p-3 px-4 flex items-center gap-1 rounded-lg bg-gradient-to-r from-green-500 to-sky-600 
        cursor-pointer hover:scale-105 disabled:opacity-50 duration-300"
        onClick={() => dispatch(toggleCreateUserLink())}>
          <IconPlus className="size-5" />
          Create Link
        </button>
      </section>

      <UserLinksTable data={userLinks} loading={loading} />

    </section>

  )

}