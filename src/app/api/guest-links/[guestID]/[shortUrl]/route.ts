import { createSupabase } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ shortUrl: string, guestID: string }>
}

export async function DELETE (request: NextRequest, { params }: Props) {

  const { guestID, shortUrl } = await params
  const supabase = createSupabase(guestID)

  const { error } = await supabase.rpc("delete_link_by_short_url", { short_input: shortUrl })
  if (error) {
    console.log(error)
    return NextResponse.json({ error: "Error al eliminar" })
  } else {
    return NextResponse.json({ response: "Eliminado correctamente" })
  }
}