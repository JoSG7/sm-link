import { AccessLinkForm } from "@/features/home/components/ui/AccessLinkForm";
import { LinkIsExpired } from "@/features/home/components/ui/LinkIsExpired";
import { createSupabase } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

interface Link {
  id: string
  short: string
  original: string | null
  has_password: boolean
  is_expired: boolean
}

async function ShortURL({ params }: { params: Promise<{ shortUrl: string }> }) {

  const supabase = createSupabase()
  const { shortUrl } = await params
  const { data, error } = await supabase.rpc("get_link_with_details", { x_short: shortUrl }).maybeSingle()
  const link = data as Link | null

  if (error) {
    console.log(error)
    return <p>Has ocurred an unexpected error, please try again</p>
  } else if (link) {

    if (link.is_expired) {
      return <LinkIsExpired />
    } else if (link.has_password) {
      return <AccessLinkForm short={shortUrl} link_id={link.id} />
    } else {
      const { error } = await supabase.rpc("record_monthly_visits", { x_link_id: link.id })
      if (error) console.log(error)
      redirect(link.original!)
    }
    
  } else {
    return <p>No hay</p>
  }
}

export default ShortURL

















