import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";


interface Props {
  params: Promise<{ shortUrl: string }>
}

export async function DELETE(req: NextRequest, { params }: Props) {

  const supabase = await createSupabaseServerClient()
  const { shortUrl } = await params

  const { data: id, error } = await supabase.from("links").select("id").eq("short", shortUrl)

  if (error) return NextResponse.json({ erorr: "Error in server" }, { status: 500 })

  const { error: e } = await supabase.from("protected_link").delete().eq("link_id", id)

  if (e) return NextResponse.json({ erorr: "Error in server" }, { status: 500 })

  return NextResponse.json({ data: "Success" }, { status: 200 })

}