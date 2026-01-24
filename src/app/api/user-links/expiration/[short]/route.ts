import { createSupabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

interface ParamsProps {
  params: Promise<{ short: string }>
}

export async function PATCH(request: NextRequest, { params }: ParamsProps) {

  const { short } = await params
  const { newExpirationDate }: { newExpirationDate: string } = await request.json()
  const supabase = await createSupabaseServer()

  const { data } = await supabase.from("link").select("id").eq("short", short).single()

  if (!data) return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  const { error } = await supabase.from("link_expiration").update({ expires_at: newExpirationDate }).eq("link_id", data.id)

  if(error) {

    console.log(error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  }

  return NextResponse.json({ response: "Success" })


} 