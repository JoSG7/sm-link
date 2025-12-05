import { getGuestID } from "@/features/shared/auth/cookies";
import { createSupabase } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ shortUrl: string }>
}

export async function DELETE (request: NextRequest, { params }: Props) {

  const { shortUrl } = await params
  const guestID = await getGuestID()
  const supabase = createSupabase(guestID)

  const { error } = await supabase.from("link").delete().eq("short", shortUrl)
  
  if (error) {

    console.log(error)
    return NextResponse.json({ error: "Error in server" })
    
  } else {
    return NextResponse.json({ response: "Deleted Succesfully" })
  }
}