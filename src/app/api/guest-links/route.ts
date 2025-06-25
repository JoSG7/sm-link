import { createSupabase } from "@/lib/supabase/client"
import { getGuestID } from "@/utils/auth/cookies"
import { createBase64Code } from "@/utils/links/id-utils"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {

  const guestID = await getGuestID()
  const supabase = createSupabase(guestID)

  if (!guestID) {
    return NextResponse.json({ error: "Unauthorized" })
  } else {
    const { data: guestLinks, error } = await supabase.rpc("get_links_details")
    return error ? NextResponse.json({ error: "Error, try again" }) : NextResponse.json(guestLinks)
  }
}



export async function POST(request: NextRequest) {

  const { original }: { original: string } = await request.json()
  const shortLink = createBase64Code()

  let guestID = await getGuestID()
  let newGuest = false

  if (!guestID) {
    guestID = crypto.randomUUID()
    newGuest = true
  }

  const supabase = createSupabase(guestID)
  const { data: exist, error } = await supabase.from("link").select("*").eq("original", original)

  if (error) {
    console.log(error)
    return NextResponse.json({ error: "Error, try again" })
  }

  if (exist && exist.length > 0) {
    return NextResponse.json({ error: "You already have a short version of this link" })
  } else {
    const { error } = await supabase.from("link").insert({
      original: original,
      short: shortLink,
      guess_id: guestID
    })

    if (error) {
      console.log(error)
      if (error.code == '42501') { return NextResponse.json({ error: "You have reached the limit of links" }) }
      return NextResponse.json({ error: "Error, view the console" })
    }

    const response = NextResponse.json({ response: shortLink })

    if (newGuest) {
      response.cookies.set("guestID", guestID, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30
      })
    }

    return response
  }
}