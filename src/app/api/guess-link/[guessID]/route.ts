import { createSupabase } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ guessID: string }>
}

export async function GET(request: NextRequest, { params }: Props) {

  const { guessID } = await params
  const supabase = createSupabase(guessID)

  const { data: guessLinks, error } = await supabase.rpc("get_links_by_guess_id")

  return error ? NextResponse.json({ error: error }) : NextResponse.json(guessLinks)

}

export async function DELETE(request: NextRequest, { params }: Props) {

  const { guessID } = await params
  const supabase = createSupabase(guessID)

  const { error } = await supabase.from("link").delete().eq("guess_id", guessID)

  // return error ? NextResponse.json({ error: "Error al eliminar" }) : NextResponse.json({ response: "Eliminado correctamente" })

  if (error) {
    console.log(error)
    return NextResponse.json(error)
  } else {
    return NextResponse.json({ response: "Eliminado correctamente" })
  }

}
