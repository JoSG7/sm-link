import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";
import { Metric, ShortLink } from "@/types/global";

interface Props {
  params: Promise<{ shortUrl: string }>;
}

export async function GET(request: NextRequest, { params }: Props) {

  const { shortUrl } = await params
  const { data, error } = await supabase.rpc("get_link_by_short", { short_url: shortUrl })
  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  const link = data as ShortLink | null

  if (error) console.log(error)

  if (!link) {
    // Si no se encuentra, se muestra pantallazo
    return NextResponse.json("No encontrado")

  } else {
    // Obtenemos las todas las metricas del short link
    const { data, error } = await supabase.from("monthly_metric")
      .select("*")
      .match({
        link_id: link.id,
        year: year,
        month: month + 1
      })
      .single()
    const metric = data as Metric | null

    if (error) console.log(error)
    // si ya tiene, solo se aumenta las vistas + 1
    if (metric) {
      await supabase.from("monthly_metric").update({ views: metric.views + 1 })
        .eq("id", metric.id)

    } else {
      // Sino, se crea la fila, con la metrica mensual
      const { error } = await supabase.from("monthly_metric").insert({
        year: year,
        month: month + 1,
        views: 1,
        link_id: link.id
      })
      if (error) console.log(error)
    }

    return NextResponse.redirect(link.original)
  }
}





















