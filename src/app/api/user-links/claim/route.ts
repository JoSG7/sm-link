import { createSupabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {

  const { linksID }: { linksID: string[] } = await req.json()

  // Create a supabase server to cookies access
  const supabase = await createSupabaseServer()

  const { error } = await supabase.rpc("claim_guest_links", {
    x_links_id: linksID
  })

  if(error) return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  return NextResponse.json({ response: "Success" }, { status: 200 })

}
