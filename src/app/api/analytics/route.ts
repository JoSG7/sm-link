import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getMetricMetadata } from "@/utils/analytics/metric-data"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const body = await request.json().catch(() => null)

  if (!body || typeof body.linkId !== "string" || !body.linkId.trim()) {
    return NextResponse.json({ error: "linkId is required" }, { status: 400 })
  }

  const userAgent = request.headers.get("user-agent") || ""
  const metricMetadata = getMetricMetadata(
    userAgent,
    request.cookies.get("guest-id")?.value || null,
    request.headers.get("x-vercel-ip-country"),
    request.headers.get("referer"),
  )
  const { data: metricRecorded, error } = await supabase.rpc("record_link_metric", {
    x_link_id: body.linkId.trim(),
    x_visitor_hash: metricMetadata.visitorHash,
    x_country: metricMetadata.country,
    x_device_type: metricMetadata.deviceType,
    x_browser: metricMetadata.browser,
    x_operating_system: metricMetadata.operatingSystem,
    x_referer: metricMetadata.referer,
    x_status: "success",
    x_is_bot: metricMetadata.isBot,
  })

  if (error) {
    console.error(error)
    return NextResponse.json({ error: "Error in server" }, { status: 500 })
  }

  if (!metricRecorded) {
    return NextResponse.json({ error: "Link not found" }, { status: 404 })
  }

  return NextResponse.json({ data: "Metric recorded" }, { status: 201 })
}


export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: claims } = await supabase.auth.getClaims()

  if (!claims?.claims) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: links, error: linksError } = await supabase.rpc("get_links")
  if (linksError) {
    return NextResponse.json({ error: "Error in server" }, { status: 500 })
  }

  const params = request.nextUrl.searchParams
  const requestedLinkId = params.get("linkId")
  const linkIds = (links || [])
    .map((link: { id: string }) => link.id)
    .filter((id: string) => !requestedLinkId || id === requestedLinkId)

  if (requestedLinkId && !linkIds.includes(requestedLinkId)) {
    return NextResponse.json({ error: "Link not found" }, { status: 404 })
  }

  if (!linkIds.length) return NextResponse.json({ data: [] }, { status: 200 })

  let query = supabase
    .from("link_metrics")
    .select("*")
    .in("link_id", linkIds)
    .order("visited_at", { ascending: false })

  const from = params.get("from")
  const to = params.get("to")
  if (from) query = query.gte("visited_at", from)
  if (to) query = query.lt("visited_at", to)

  const { data, error } = await query
  if (error) {
    console.error(error)
    return NextResponse.json({ error: "Error in server" }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 200 })
}