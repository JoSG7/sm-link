import { getGuestID } from "@/features/shared/auth/cookies";
import { createSupabase } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {

  const { short, password }: { short: string, password: string } = await request.json()
  const guestID = await getGuestID()
  const supabase = createSupabase(guestID)

  if (!guestID) return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  const { error } = await supabase.rpc("insert_link_password", {
    x_short: short,
    x_password: password
  })

  if(error) return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  
  return NextResponse.json({ response: "Success" }, { status: 200 })

}

