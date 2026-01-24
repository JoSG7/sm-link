import { createSupabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {

  const { short, expirationDate }: { short: string, expirationDate: string } = await request.json()
  const supabase = await createSupabaseServer()

  const { data } = await supabase.from("link").select("id").eq("short", short).single()

  if (!data) return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  const { error } = await supabase.from("link_expiration").insert({
    link_id: data.id,
    expires_at: expirationDate
  })

  if (error) {

    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  return NextResponse.json({ response: "Success" })

}
