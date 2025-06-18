import { createSupabase } from "@/lib/supabase/client";
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

export async function DELETE(request: NextRequest, { params }: Props) {

  const { guestID } = await params
  const { short } = await request.json()
  const supabase = createSupabase(guestID)

  const { error } = await supabase.rpc("delete_link_by_short_url", { short_input: short })

  // return error ? NextResponse.json({ error: "Error al eliminar" }) : NextResponse.json({ response: "Eliminado correctamente" })

  if (error) {
    console.log(error)
    return NextResponse.json(error)
  } else {
    return NextResponse.json({ response: "Eliminado correctamente" })
  }

}
