import { LinkDetails } from "@/types/global"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { StatCard } from "@/features/protected/links/components/StatCard"
import { AdminLinksTable } from "@/features/protected/links/components/AdminLinksTable"

export default async function AdminLinks() {

  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.rpc("get_links")
  const links = data as LinkDetails[]

  return (

    <section className="min-h-screen flex flex-col gap-7 md:py-7 xl:py-8">

      <header>
        <h1 className="text-3xl font-semibold">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-sky-500">SmLinks </span>
          Overview
        </h1>

        <p className="pt-2 text-neutral-300">
          Manage and track all your shortened links
        </p>
      </header>

      <div className="flex flex-col gap-4 lg:flex-row ">
        <StatCard links={links} type="total" />
        <StatCard links={links} type="protected" />
        <StatCard links={links} type="expiration" />
        <StatCard links={links} type="expired" />
      </div>

      <AdminLinksTable links={links} />

    </section>

  )

}