import { createSupabaseServerClient } from "@/lib/supabase/server"
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
    return NextResponse.json({ error: "Link not found" }, { status: 404 })
  }

  const { error: expirationError } = await supabase
    .from("link_expiration")
    .update({ expires_at: expiresAt })
    .eq("link_id", link.id)

  if (expirationError) {
    return NextResponse.json({ error: "Unable to update expiration" }, { status: 500 })
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
    return NextResponse.json({ error: "Link not found" }, { status: 404 })
  }

  const { error } = await supabase
    .from("link_expiration")
    .delete()
    .eq("link_id", link.id)

  if (error) {
    return NextResponse.json({ error: "Unable to delete expiration" }, { status: 500 })
  }

  return NextResponse.json({ data: "Success" }, { status: 200 })
}
