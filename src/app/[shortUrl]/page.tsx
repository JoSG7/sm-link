import { AccessLinkForm } from "@/features/home/ui/AccessLinkForm";
import { LinkIsExpired } from "@/features/home/ui/LinkIsExpired";
import { LinkAccessMessage } from "@/features/home/ui/LinkAccessMessage";
import { SmLink } from "@/types/global";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getGuestID } from "@/utils/auth/cookies";
import { getMetricMetadata } from "@/utils/analytics/metric-data";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

async function ShortURL({ params }: { params: Promise<{ shortUrl: string }> }) {

  const supabase = await createSupabaseServerClient()
  const { shortUrl } = await params
  const { data, error } = await supabase.rpc("get_link_to_redirect", { x_short: shortUrl.trim() }).maybeSingle()
  const link = data as SmLink | null

  if (error) return <LinkAccessMessage type="error" />

  if (!link) return <LinkAccessMessage type="not-found" />

  const requestHeaders = await headers()
  const userAgent = requestHeaders.get("user-agent") || ""
  const metricMetadata = getMetricMetadata(
    userAgent,
    await getGuestID() || null,
    requestHeaders.get("x-vercel-ip-country"),
    requestHeaders.get("referer"),
  )

  if (link.is_expired) {
    const { error: metricError } = await supabase.rpc("record_link_metric", {
      x_link_id: link.id,
      x_visitor_hash: metricMetadata.visitorHash,
      x_country: metricMetadata.country,
      x_device_type: metricMetadata.deviceType,
      x_browser: metricMetadata.browser,
      x_operating_system: metricMetadata.operatingSystem,
      x_referer: metricMetadata.referer,
      x_status: "expired",
      x_is_bot: metricMetadata.isBot,
    })

    if (metricError) {
      console.error("Could not record expired link metric", metricError)
    }

    return <LinkIsExpired />
  }

  if (link.has_password) return <AccessLinkForm short={shortUrl} linkID={link.id} />

  const { data: metricRecorded, error: metricError } = await supabase.rpc("record_link_metric", {
    x_link_id: link.id,
    x_visitor_hash: metricMetadata.visitorHash,
    x_country: metricMetadata.country,
    x_device_type: metricMetadata.deviceType,
    x_browser: metricMetadata.browser,
    x_operating_system: metricMetadata.operatingSystem,
    x_referer: metricMetadata.referer,
    x_status: "success",
    x_is_bot: metricMetadata.isBot,
  })

  if (metricError || !metricRecorded) {
    console.error("Could not record link metric", metricError || link.id)
    return <LinkAccessMessage type="error" />
  }

  redirect(link.original!)

}

export default ShortURL
