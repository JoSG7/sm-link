import { createSupabase } from "@/lib/supabase/client"
import { createBase64Code } from "@/utils/links/id-utils"
import { NextRequest, NextResponse } from "next/server"


export async function POST(request: Request | NextRequest) {
  
  const { guessID, original }: { guessID: string, original: string } = await request.json()
  const shortLink = createBase64Code()
  const supabase = createSupabase(guessID)

  const { data: exist, error } = await supabase.rpc("check_existing_link", { p_guess_id: guessID, p_original: original })

  if(error) { 
    console.log(error)
    return NextResponse.json({ error: "Error, intentelo nuevamente" })
  }

  if (exist) {
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




