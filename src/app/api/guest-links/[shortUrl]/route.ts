import { createSupabase } from "@/lib/supabase/client";
import { getGuestID } from "@/utils/auth/cookies";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ shortUrl: string, guestID: string }>
}

export async function DELETE (request: NextRequest, { params }: Props) {

  const { shortUrl } = await params
  const guestID = await getGuestID()
  const supabase = createSupabase(guestID)

  const { error } = await supabase.rpc("delete_link_by_short_url", { short_input: shortUrl })
  if (error) {
    console.log(error)
    return NextResponse.json({ error: "Error al eliminar" })
  } else {
    return NextResponse.json({ response: "Eliminado correctamente" })
  }
}