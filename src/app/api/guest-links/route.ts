import { getGuestID } from "@/features/shared/auth/cookies"
import { createSupabase } from "@/lib/supabase/client"
import { NextRequest, NextResponse } from "next/server"

const createBase64Code = (): string => {
  const array = new Uint8Array(Math.ceil(7 * 0.75))
  crypto.getRandomValues(array)
  const base64 = btoa(String.fromCharCode(...array)).replace(/[^a-zA-Z0-9]/g, '')
  return base64.slice(0, 7)
}


export async function GET() {

  const guestID = await getGuestID()
  const supabase = createSupabase(guestID)

  if (!guestID) return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  const { data, error } = await supabase.rpc("get_links_with_details")

  if (error) return NextResponse.json({ error: "Error in Server" }, { status: 500 })

  return NextResponse.json(data, { status: 200 })

}


export async function POST(request: NextRequest) {

  // get the original link from the body of the request
  const { original }: { original: string } = await request.json()

  // create a base64 code
  const shortLink = createBase64Code()

  // get the GuestID from the cookie
  let guestID = await getGuestID()
  let newGuest = false

  // if there's no guestID, create new a UUID
  if (!guestID) {
    guestID = crypto.randomUUID()
    newGuest = true
  }

  // verifie if the link already exists in the DB
  const supabase = createSupabase(guestID)
  const { data, error } = await supabase.from("link").select("*").eq("original", original)

  if (error) {

    console.log(error)
    return NextResponse.json({ error: "Error in Server" }, { status: 500 })
  }

  if (data && data.length > 0) {

    return NextResponse.json({ error: "You already have a short version of this link" }, { status: 500 })
  } else {

    // insert the short version, original and the guestID in the DB
    const { error } = await supabase.from("link").insert({
      original,
      short: shortLink,
      guess_id: guestID
    })

    if (error) {

      console.log(error)
      // there is a policy in Supabase that limits the number of short links each guest can create
      if (error.code == '42501') { return NextResponse.json({ error: "You have reached the limit of links" }, { status: 500 }) }
      return NextResponse.json({ error: "Error in Sercer" }, { status: 500 })
    }

    const response = NextResponse.json({ response: shortLink }, { status: 200 })

    // if is a new guest, set a cookie with the new UUID
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