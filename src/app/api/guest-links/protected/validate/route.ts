import { createSupabase } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  const supabase = createSupabase()
  const { short, password } = await request.json()

  const { data, error } = await supabase.rpc("validate_link_password", { x_short: short, x_password: password })

  if (error) return NextResponse.json({ error: "Unexpected error in Server" }, { status: 500 })
  
  // return the original link, else return null
  return NextResponse.json({ response: data }, { status: 200 })


}