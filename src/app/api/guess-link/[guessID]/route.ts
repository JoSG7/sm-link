import { supabase } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ guessID: string }>
}

export async function GET(request: NextRequest, { params }: Props) {

  const { guessID } = await params

  const { data: guessLinks, error } = await supabase.from("link").select("*")
    .eq("guess_id", guessID).order("created_at", { ascending: false })

  return error ? NextResponse.json({ error: "Error" }) : NextResponse.json(guessLinks)

}

export async function DELETE(request: NextRequest, { params }: Props) {

  const { guessID } = await params

  const { error } = await supabase.from("link").delete().eq("guess_id", guessID)

  // return error ? NextResponse.json({ error: "Error al eliminar" }) : NextResponse.json({ response: "Eliminado correctamente" })

  if (error) {
    console.log(error)
    return NextResponse.json(error) 
  } else {
    return NextResponse.json({ response: "Eliminado correctamente" })
  }

}
