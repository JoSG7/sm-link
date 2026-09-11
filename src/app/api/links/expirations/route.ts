import { createSupabaseServerClient } from "@/lib/supabase/server";
import { apiError } from "@/utils/api/error-handler";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

  const supabase = await createSupabaseServerClient()
  const { short, expiresAt } = await req.json()

  const { data, error } = await supabase.from("links").select("id").eq("short", short).single()

  if (error) return apiError("Error in server", 500, error)

  const { error: e } = await supabase.from("link_expiration").insert({
    link_id: data.id,
    expires_at: expiresAt
  })

  if(e) {
    return apiError("Error in server", 500, e)
  } 
    
  return NextResponse.json({ data: "Success" }, { status: 200 })

}