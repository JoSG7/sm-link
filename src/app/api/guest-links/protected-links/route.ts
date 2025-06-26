import { createSupabase } from "@/lib/supabase/client";
import { GuestLinks } from "@/types/global";
import { getGuestID } from "@/utils/auth/cookies";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {




// }


export async function POST(request: NextRequest) {

  const { short, password }: { short: string, password: string } = await request.json()
  const guestID = await getGuestID()
  const supabase = createSupabase(guestID)

  if (!guestID) {
    return NextResponse.json({ error: "Unauthorized" })
  } else {

    const { data, error } = await supabase.rpc("get_link_by_short", { short_url: short })

    if (!data || error) {
      console.log(error)
      return NextResponse.json({ error: "Link not found" })
    }

    const link = data as GuestLinks

    const { error: e } = await supabase.rpc("insert_protected_link", { x_password: password, x_link_id: link.id })

    if (e) {
      console.log(e)
      return NextResponse.json({ error: "Failed to protect link" })
    }

    return NextResponse.json({ response: "Protecting Succes" })
  }
}

