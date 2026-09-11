import { createSupabaseServerClient } from "@/lib/supabase/server";
import { apiError } from "@/utils/api/error-handler";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {

  const supabase = await createSupabaseServerClient()
  const { short, password }: { short: string, password: string } = await req.json()

  const { error } = await supabase.rpc("insert_link_password", {
    x_short: short,
    x_password: password
  })

  if (error) {
    return apiError("Error in server", 500, error)

  }

  return NextResponse.json({ data: "Success" }, { status: 200 })

}




