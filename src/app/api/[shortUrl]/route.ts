import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface Props {

  params: Promise<{ shortUrl: string }>;

}

export async function GET(request: NextRequest, { params }: Props) {

  const { shortUrl } = await params

  const { data: link, error } = await supabase.from("link").select("*").eq('short', shortUrl)

  if (!link || link.length === 0) {

    return NextResponse.json("No encontrado")

  } else {

    const linkID = link[0].id

    // await supabase.from("metric").insert({views: 2}).eq('link_id', linkID)


  }

  if(error){

    console.log(error)

  }

  return NextResponse.json(link)

}





















