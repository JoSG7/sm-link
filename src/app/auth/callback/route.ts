import { NextResponse, type NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    
  const requestURL = new URL(request.url)
  const code = requestURL.searchParams.get("code")

  if(code){
    supabaseServer.auth.exchangeCodeForSession(code)
    // const supabase = createRouteHandlerClient({ cookies })
    // await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(requestURL.origin)
  
}