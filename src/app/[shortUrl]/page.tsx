import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";


interface Props {

  params: Promise<{ shortUrl: string }>;

}

async function ShortURL( { params }: Props) {

  const { shortUrl } = await params

  const data = supabase.from("public.link").select("*")

  console.log(data)

  return <p>{shortUrl}</p>

}

export default ShortURL

















