import { createSupabaseServerClient } from "@/lib/supabase/server";
import { apiError } from "@/utils/api/error-handler";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const supabase = await createSupabaseServerClient()
  const { short, password } = await req.json()

  const { data, error } = await supabase.rpc("validate_link_password", { x_short: short, x_password: password })

  if (error) {
    return apiError("Error in server", 500, error)
  }

  if (!data) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  return NextResponse.json({ data }, { status: 200 })

}