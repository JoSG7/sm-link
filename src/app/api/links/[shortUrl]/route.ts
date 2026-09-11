import { createSupabaseServerClient } from "@/lib/supabase/server";
import { apiError } from "@/utils/api/error-handler";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ shortUrl: string }>
}

export async function DELETE(req: NextRequest, { params }: Props) {

  const supabase = await createSupabaseServerClient()
  const { shortUrl } = await params

  const { error } = await supabase.from("links").delete().eq("short", shortUrl)

  if(error) return apiError("Error in server", 500, error)

  return NextResponse.json({ data: "Success" }, { status: 200 })

}