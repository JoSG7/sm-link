import { getGuestID } from "@/features/shared/auth/cookies";
import { createSupabase } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ shortUrl: string }> }) {

  const { shortUrl } = await params
  const guestID = await getGuestID()

  if (!guestID) return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  const supabase = createSupabase(guestID)

  const { data, error } = await supabase.from("link").select("id").eq("short", shortUrl).maybeSingle()

  if (!data || error) {

    return NextResponse.json({ error: "Link not found" }, { status: 500 })

  } else {

    const { error } = await supabase.from("protected_link").delete().eq("link_id", data.id)

    if (error) return NextResponse.json({ error: "Error in Server" }, { status: 500 })
    
    return NextResponse.json({ response: "Removed Succesfully" }, { status: 200 })
    
  }
}