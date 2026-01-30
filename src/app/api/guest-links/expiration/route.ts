import { getGuestID } from "@/features/shared/auth/cookies"
import { createSupabase } from "@/lib/supabase/client"
import { NextRequest, NextResponse } from "next/server"


export async function POST(request: NextRequest) {

  const guestID = await getGuestID()
  const supabase = createSupabase(guestID)
  const { short, expiresAt } = await request.json()

  if (!guestID) return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  const { data, error } = await supabase.from("link").select("id").eq("short", short).single()

  if (error) return NextResponse.json({ error: "Error in server" }, { status: 500 })

  if (data?.id) {

    const { error } = await supabase.from("link_expiration").insert({
      link_id: data.id,
      expires_at: expiresAt
    })

    if (error) return NextResponse.json({ error: "Error in server" }, { status: 500 })

    return NextResponse.json({ response: "Expiration set successfully" }, { status: 200 })

  } else {

    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }
}



