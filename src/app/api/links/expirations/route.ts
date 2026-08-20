import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

  const supabase = await createSupabaseServerClient()
  const { short, expiresAt } = await req.json()

  const { data: id, error } = await supabase.from("links").select("id").eq("short", short).single()

  if (error) return NextResponse.json({ error: "Error in server" }, { status: 500 })

  const { error: e } = await supabase.from("link_expiration").insert({
    link_id: id,
    expires_at: expiresAt
  })

  if(e) {
    console.log(e)
    return NextResponse.json({ error: "Error in Server" }, { status: 500 })
  } 
    
  return NextResponse.json({ response: "Success" }, { status: 200 })

}