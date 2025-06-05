import { supabase } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";


export async function POST (request: NextRequest | Request) {

  const { guessID } : { guessID: string } = await request.json()

  const { data: guessLinks, error } = await supabase.from("link").select("*")
  .eq("guess_id", guessID).order("created_at", { ascending: false })
  
  return error ? NextResponse.json({ error: "Error" }) :  NextResponse.json(guessLinks)

}