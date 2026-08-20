import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const supabase = await createSupabaseServerClient()
  const { short, password } = await req.json()

  const { data, error } = await supabase.rpc("validate_link_password", { x_short: short, x_password: password })

  if (error) {
    console.log(error)
    return NextResponse.json({ error: "Error in server" }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 200 })

}