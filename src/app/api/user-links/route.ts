import { createSupabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";



export async function GET() {

  const supabase = await createSupabaseServer()

  const {data, error} = await supabase.from("link").select("*")

  if(error) return NextResponse.json([])

  return NextResponse.json(data)

}