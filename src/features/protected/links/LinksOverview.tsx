import { LinkDetails } from "@/types/global"
import { LinksTable } from "./components/LinksTable"
import { StatCard } from "./components/StatCard"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function LinksOverview() {

  const supabase = await createSupabaseServerClient()
  const { data: auth } = await supabase.auth.getClaims()
  const [{ data }, { data: guestLinks }] = await Promise.all([
    supabase.rpc("get_links"),
    supabase.rpc("get_guest_links"),
  ])
  const links = data as LinkDetails[]
  const guestLinksCount = (guestLinks as LinkDetails[] | null)?.filter(link => !link.has_user_id).length ?? 0

  return (
    <div className="flex flex-col gap-7">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard links={links} type="total" />
        <StatCard links={links} type="protected" />
        <StatCard links={links} type="expiration" />
        <StatCard links={links} type="expired" />
      </div>

      <LinksTable
        links={links}
        isAuthenticated={Boolean(auth)}
        guestLinksCount={guestLinksCount}
      />

    </div>

  )
}
