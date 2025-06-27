import { createSupabase } from "@/lib/supabase/client";
import { getGuestID } from "@/utils/auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE (request: NextRequest, { params }: { params: Promise<{ shortUrl: string }> }) {
  
  const { shortUrl } = await params
  const guestID = await getGuestID()

  if(!guestID){
    return NextResponse.json({ error: "Unauthorized" })
  } else {

    const supabase = createSupabase(guestID)
    const { data, error } = await supabase.from("link").select("id").eq("short", shortUrl).maybeSingle()
    
    if(!data || error){
      console.log(error)
      return NextResponse.json({ error: "Link not found" })
    } else {

      const { error} = await supabase.from("protected_link").delete().eq("link_id", data.id)

      if (error){
        console.log(error)
        return NextResponse.json({ error: "Error, look the console" })
      }
      return NextResponse.json({ response: "Removed Succesfully" })
    }
  }

  




}