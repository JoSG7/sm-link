import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface Props {

  params: Promise<{ shortUrl: string }>;

}

export async function GET(request: NextRequest, { params }: Props) {

  const { shortUrl } = await params
  const { data: link, error } = await supabase.from("link").select("*").eq('short', shortUrl)

  if(error){
    return NextResponse.json(error.message)
  }

  if (!link || link.length === 0) {

    return NextResponse.json("No encontrado")

  } else {

    const linkID = link[0].id
    const year = new Date().getFullYear()
    const month = new Date().getMonth()

    const { data: metric, error } = await supabase
    .from("monthly_metric")
    .select("*")
    .match({
      link_id: linkID,
      year: year,
      month: month + 1
    })

    if(error){
      console.error(error)
    }

    if(metric && metric.length > 0){

      await supabase.from("monthly_metric").update({
        views: metric[0].views + 1
      })
      .eq("id", metric[0].id)

    }

    if(metric?.length == 0){

      const { error } = await supabase.from("monthly_metric").insert({

        year: year,
        month: month + 1,
        views: 1,
        link_id: linkID

      })

      if(error){
        console.error(error)
      }

    }

    return NextResponse.redirect(link[0].original)

  }

}





















