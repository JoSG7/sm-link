import { AccessLinkForm } from "@/features/home/ui/AccessLinkForm";
import { LinkIsExpired } from "@/features/home/ui/LinkIsExpired";
import { SmLink } from "@/types/global";
import { createSupabase } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

async function ShortURL({ params }: { params: Promise<{ shortUrl: string }> }) {

  const supabase = createSupabase()
  const { shortUrl } = await params
  const { data, error } = await supabase.rpc("get_link_to_redirect", { x_short: shortUrl.trim() }).maybeSingle()
  const link = data as SmLink | null

  if (error) return <p>Has ocurred an unexpected error, we are working to fix it</p>

  if (!link) return <p>Link not found</p>

  if (link.is_expired) return <LinkIsExpired />

  if (link.has_password) return <AccessLinkForm short={shortUrl} linkID={link.id} />

  supabase.rpc("record_monthly_visits", { x_link_id: link.id })
  redirect(link.original!)

}

export default ShortURL
