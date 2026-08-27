import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";


interface Props {
  params: Promise<{ shortUrl: string }>
}

export async function DELETE(_req: NextRequest, { params }: Props) {

  const supabase = await createSupabaseServerClient()
  const { shortUrl } = await params

  const { data: link, error } = await supabase.from("links").select("id").eq("short", shortUrl).single()

  if (error || !link) return NextResponse.json({ error: "Link not found" }, { status: 404 })

  const { error: deleteError } = await supabase.from("protected_link").delete().eq("link_id", link.id)

  if (deleteError) return NextResponse.json({ error: "Unable to delete password" }, { status: 500 })

  return NextResponse.json({ data: "Success" }, { status: 200 })

}


export async function PATCH(req: NextRequest, { params }: Props) {

  const supabase = await createSupabaseServerClient()
  const { shortUrl } = await params
  const { currentPassword, newPassword } = await req.json()

  const { error } = await supabase.rpc("update_link_password", {
    x_short: shortUrl,
    x_current_password: currentPassword,
    x_new_password: newPassword
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data: "Success" }, { status: 200 })

}