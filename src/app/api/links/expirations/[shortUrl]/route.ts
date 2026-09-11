import { createSupabaseServerClient } from "@/lib/supabase/server"
import { apiError } from "@/utils/api/error-handler"
import { NextRequest, NextResponse } from "next/server"

interface ParamsProps {
  params: Promise<{ shortUrl: string }>
}

export async function PATCH(request: NextRequest, { params }: ParamsProps) {
  const { shortUrl } = await params
  const { expiresAt }: { expiresAt: string } = await request.json()
  const supabase = await createSupabaseServerClient()

  const { data: link, error: linkError } = await supabase
    .from("links")
    .select("id")
    .eq("short", shortUrl)
    .single()

  if (linkError || !link) {
    return apiError("Link not found", 404, linkError)
  }

  const { error: expirationError } = await supabase
    .from("link_expiration")
    .update({ expires_at: expiresAt })
    .eq("link_id", link.id)

  if (expirationError) {
    return apiError("Unable to update expiration", 500, expirationError)
  }

  return NextResponse.json({ data: "Success" }, { status: 200 })
}

export async function DELETE(_request: NextRequest, { params }: ParamsProps) {
  const { shortUrl } = await params
  const supabase = await createSupabaseServerClient()

  const { data: link, error: linkError } = await supabase
    .from("links")
    .select("id")
    .eq("short", shortUrl)
    .single()

  if (linkError || !link) {
    return apiError("Link not found", 404, linkError)
  }

  const { error } = await supabase
    .from("link_expiration")
    .delete()
    .eq("link_id", link.id)

  if (error) {
    return apiError("Unable to delete expiration", 500, error)
  }

  return NextResponse.json({ data: "Success" }, { status: 200 })
}
