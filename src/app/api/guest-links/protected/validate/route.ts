import { createSupabase } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {

  const supabase = createSupabase()
  const { short, password } = await request.json()

  const { data, error } = await supabase.rpc("validate_link_password", { x_short: short, x_password: password })

  if(error){
    console.log(error)
    return NextResponse.json({ error: "Error, look the console" })
  } else {
    // return the original link, else return null
    return NextResponse.json({ response: data })
  }

}