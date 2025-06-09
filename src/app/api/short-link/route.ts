import { supabase } from "@/lib/supabase/client"
import { createBase64Code } from "@/utils/links/id-utils"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: Request | NextRequest) {

  const shortLink = createBase64Code()
  const { guessID, original }: { guessID: string, original: string } = await request.json()

  const { data: exist, error } = await supabase.from("link").select("*").match({
    guess_id: guessID,
    original: original
  })

  if(error) { 
    console.log(error)
    return NextResponse.json({ error: "Error, intentelo nuevamente" })
  }

  if (exist && exist?.length > 0) {
    return NextResponse.json({ error: "Ya tienes una version corta de este link" })
  } else {
    const { error } = await supabase.from("link").insert({
      original: original,
      short: shortLink,
      guess_id: guessID
    })

    if(error) {
      console.log(error)
      return NextResponse.json({ error: "Error al crear" })
    } else {
      return NextResponse.json({ response: shortLink })
    }
  }
}




