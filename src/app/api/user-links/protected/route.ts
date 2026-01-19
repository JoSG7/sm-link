import { createSupabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {

  const { short, password }: { short: string, password: string } = await request.json()
  const supabase = await createSupabaseServer()

  const { error } = await supabase.rpc("insert_link_password", {
    x_password: password,
    x_short: short
  })

  if(error){
    console.log(error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  return NextResponse.json({ response: "Success" }, { status: 200 })

}


