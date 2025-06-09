import { supabase } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET (request: NextRequest, { params } : { params: Promise<{ guessID: string }> }) {

  const { guessID } = await params

  const { data: guessLinks, error } = await supabase.from("link").select("*")
  .eq("guess_id", guessID).order("created_at", { ascending: false })
  
  return error ? NextResponse.json({ error: "Error" }) :  NextResponse.json(guessLinks)

}