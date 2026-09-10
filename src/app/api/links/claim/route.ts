import { createSupabaseServerClient } from "@/lib/supabase/server"
import { apiError } from "@/utils/api/error-handler"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {

    const supabase = await createSupabaseServerClient()
    const { linksID } = await req.json()

    const { error } = await supabase.rpc("claim_guest_links", {
      x_links_id: linksID
    })
  
    if(error) return apiError(error.message, 403, error)
  
    return NextResponse.json({ data: "Success" }, { status: 200 })
  
  }
  