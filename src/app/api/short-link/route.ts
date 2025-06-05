import { supabase } from "@/lib/supabase/client"
import { createBase64Code } from "@/logic/server-functions"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: Request | NextRequest) {

  const shortLink = createBase64Code()
  const { guessID, originalLink }: { guessID: string, originalLink: string } = await request.json()

  const { data: exist, error } = await supabase.from("link").select("*").match({
    guess_id: guessID,
    original: originalLink
  })

  if(error) { 
    console.log(error)
    return NextResponse.json({ error: "Error, intentelo nuevamente" })
  }

  if (exist && exist?.length > 0) {
    return NextResponse.json({ error: "Ya tienes una version corta de este link" })
  } else {
    const { error } = await supabase.from("link").insert({
      original: originalLink,
      short: shortLink,
      guess_id: guessID
    })

    if(error) {
      console.log(error)
      return NextResponse.json({ error: "Error al crear" })
    } else {
      return NextResponse.json(shortLink)
    }
  }
}




