import { createSupabaseServerClient } from "@/lib/supabase/server";
import { apiError } from "@/utils/api/error-handler";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ shortUrl: string }>
}

export async function PATCH(req: NextRequest, { params }: Props) {

  const { shortUrl } = await params
  const { newShort } = await req.json()

  if (!/^[a-zA-Z0-9_-]{1,19}$/.test(newShort)) {
    return apiError("Short link must be 1-19 characters using only letters, numbers, hyphens, or underscores", 400)
  }

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("links")
    .update({ short: newShort })
    .eq("short", shortUrl)
    .select("short")
    .maybeSingle()

  if (error?.code === "23505") {
    return apiError("That short link is already in use", 409)
  }

  if (error?.code === "42501") {
    return apiError("You don't have permission to update this link", 403)
  }

  if (error) return apiError("Unable to update short link", 500, error)
  if (!data) return apiError("Link not found", 404)

  return NextResponse.json({ data: data.short }, { status: 200 })
}


export async function DELETE(req: NextRequest, { params }: Props) {

  const supabase = await createSupabaseServerClient()
  const { shortUrl } = await params

  const { error } = await supabase.from("links").delete().eq("short", shortUrl)

  if(error) return apiError("Error in server", 500, error)

  return NextResponse.json({ data: "Success" }, { status: 200 })

}