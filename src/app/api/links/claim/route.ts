import { createSupabaseServerClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {

    const supabase = await createSupabaseServerClient()
    const { linksID } = await req.json()

    const { error } = await supabase.rpc("claim_guest_links", {
      x_links_id: linksID
    })
  
    if(error) return NextResponse.json({ error: error.message }, { status: 403 })
  
    return NextResponse.json({ data: "Success" }, { status: 200 })
  
  }
  