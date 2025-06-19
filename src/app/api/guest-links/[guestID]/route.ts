import { createSupabase } from "@/lib/supabase/client";
import { createBase64Code } from "@/utils/links/id-utils";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ short: string, guestID: string }>
}

export async function GET(request: NextRequest, { params }: Props) {

  const { guestID } = await params
  const supabase = createSupabase(guestID)

  const { data: guestLinks, error } = await supabase.rpc("get_links_by_guest_id")

  return error ? NextResponse.json({ error: error }) : NextResponse.json(guestLinks)
}



export async function POST(request: NextRequest, { params }: Props) {

  const { original }: { original: string } = await request.json()
  const { guestID } = await params
  const shortLink = createBase64Code()
  const supabase = createSupabase(guestID)

  const { data: exist, error } = await supabase.rpc("check_existing_link", { x_original: original })

  if (error) {
    console.log(error)
    return NextResponse.json({ error: "Error, intentelo nuevamente" })
  }

  if (exist) {
    return NextResponse.json({ error: "Ya tienes una version corta de este link" })
  } else {
    const { error } = await supabase.from("link").insert({
      original: original,
      short: shortLink,
      guess_id: guestID
    })

    if (error) {
      console.log(error)
      if (error.code == '42501') { return NextResponse.json({ error: "You have reached the limit of links" }) }

      return NextResponse.json({ error: "Error al crear" })
    } else {
      return NextResponse.json({ response: shortLink })
    }
  }
}



