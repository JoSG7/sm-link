import { createSupabaseServerClient } from "@/lib/supabase/server";
import { apiError } from "@/utils/api/error-handler";
import { NextRequest, NextResponse } from "next/server";


interface Props {
  params: Promise<{ shortUrl: string }>
}

export async function DELETE(_req: NextRequest, { params }: Props) {

  const supabase = await createSupabaseServerClient()
  const { shortUrl } = await params

  const { data: link, error } = await supabase.from("links").select("id").eq("short", shortUrl).single()

  if (error || !link) return apiError("Link not found", 404, error)

  const { error: deleteError } = await supabase.from("protected_link").delete().eq("link_id", link.id)

  if (deleteError) return apiError("Unable to delete password", 500, deleteError)

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

  if (error) return apiError(error.message, 500, error)

  return NextResponse.json({ data: "Success" }, { status: 200 })

}