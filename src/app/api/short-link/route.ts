import { supabase } from "@/lib/supabase/client"
import { createBase64Code } from "@/logic/server-functions"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: Request | NextRequest){
  
  const shortLink = createBase64Code()

  const { guessID, originalLink }: {guessID: string, originalLink: string} = await request.json()

  try {

    const { data: alredyExist } = await supabase.from("link").select("*")
    .eq("guess_id", guessID)
    .eq("original", originalLink)

    if(alredyExist?.length != 0){

      return NextResponse.json({ error: "Ya tienes una version corta de este link!" })

    }else{

      const { error } = await supabase.from("link").insert({

        original: originalLink,
        short: shortLink,
        guess_id: guessID

      })

      if(error){

        return NextResponse.json(error)

      }else{

        return NextResponse.json(shortLink)

      }

    }

  } catch (error) {

    return NextResponse.json(error)
    
  }

}