import { createSupabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const createBase64Code = (): string => {
  const array = new Uint8Array(Math.ceil(7 * 0.75))
  crypto.getRandomValues(array)
  const base64 = btoa(String.fromCharCode(...array)).replace(/[^a-zA-Z0-9]/g, '')
  return base64.slice(0, 7)
}


export async function GET() {

  const supabase = await createSupabaseServer()

  const { data, error } = await supabase.rpc("get_user_links")

  if(error) return NextResponse.json({ error: "Error in server" }, { status: 500 })

  return NextResponse.json(data, { status: 200 })

}


export async function POST(request: NextRequest) {

  const { original, short } : { original: string, short: string } = await request.json()
  const supabase = await createSupabaseServer()

  const { error } = await supabase.rpc("insert_user_link", {
    x_original: original,
    x_short: short == "" ? createBase64Code() : short
  })  

  if(error) {
    const errorMsg = error.code == "P0001" ? error.message : "Error in server"  
    return NextResponse.json({ error: errorMsg }, { status: 500 })
  }

  return NextResponse.json({ response: "Success" }, { status: 200 })

}