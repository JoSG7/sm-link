import { createSupabaseServer } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    
  const requestURL = new URL(request.url)
  const code = requestURL.searchParams.get("code")

  if(code){
    const supabaseServer = await createSupabaseServer()
    await supabaseServer.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(requestURL.origin)
  
}