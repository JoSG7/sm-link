import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getGuestID } from "@/utils/auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const createBase64Code = (): string => {
  const array = new Uint8Array(Math.ceil(7 * 0.75))
  crypto.getRandomValues(array)
  const base64 = btoa(String.fromCharCode(...array)).replace(/[^a-zA-Z0-9]/g, '')
  return base64.slice(0, 7)
}


export async function GET() {

  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase.from("links").select("*")

  if (error) return NextResponse.json({ error: "Error in server" }, { status: 500 })

  return NextResponse.json(data, { status: 200 })

}



export async function POST(req: NextRequest) {

  const supabase = await createSupabaseServerClient()

  const { original }: { original: string } = await req.json()
  const short = createBase64Code()

  const { data, error } = await supabase.from("links").select("id").eq("original", original).maybeSingle()

  if (error) return NextResponse.json({ error: "Error in server" }, { status: 500 })

  if (data) return NextResponse.json({ error: "You already have a short version of this link" }, { status: 500 })

  const res = await supabase.from("links").insert({
    original,
    short,
    guest_id: await getGuestID()
  })

  if (res.error) {

    if (res.error.code == '42501') return NextResponse.json({ error: "You have reached the limit of links" }, { status: 500 })
    return NextResponse.json({ error: "Error in Server" }, { status: 500 })

  }

  return NextResponse.json({ data: short }, { status: 200 })

}