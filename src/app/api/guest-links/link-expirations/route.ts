import { createSupabase } from "@/lib/supabase/client"
import { getGuestID } from "@/utils/auth/cookies"
import { NextRequest, NextResponse } from "next/server"


export async function POST( request : NextRequest) {

  const guestID = await getGuestID()
  const supabase = createSupabase(guestID)
  const { short, expires_at } = await request.json()

  const { data, error } = await supabase.from("link").select("id").eq("short", short).single()
  if(error) console.log(error)

  if(data?.id){

    const { error } = await supabase.from("link_expiration").insert({
      link_id: data.id,
      expires_at
    })
  
    if (error) {
      console.log(error)
      return NextResponse.json({ error: "Error, look the console" })
    } else {
      return NextResponse.json({ response: "Expiration set successfully" })
    }
  } else {
    return NextResponse.json({ error: "You don't have permissions" })
  }
}



