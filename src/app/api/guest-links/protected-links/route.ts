import { createSupabase } from "@/lib/supabase/client";
import { GuestLinks } from "@/types/global";
import { getGuestID } from "@/utils/auth/cookies";
import { NextRequest, NextResponse } from "next/server";
import { hash } from 'bcryptjs'

// export async function GET(request: NextRequest) {




// }


export async function POST(request: NextRequest) {

  const { short, password }: { short: string, password: string } = await request.json()
  const guestID = await getGuestID()
  const supabase = createSupabase(guestID)
  const hashedPassword = await hash(password, 10)

  if (!guestID) {
    return NextResponse.json({ error: "Unauthorized" });
  } else {

    const { data, error } = await supabase.rpc("get_link_by_short", { short_url: short })
    const link = data as GuestLinks

    if(error){
      console.log(error)
    }

    const { error: e } = await supabase.from("protected_link").insert({
      password: hashedPassword,
      link_id: link.id
    })
    
    if(e){
      console.log(e)
      return NextResponse.json({ error: "Failed to protect link" })
    }

    return NextResponse.json({ response: "Protecting Succes" })
  }
}

