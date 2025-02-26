import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";


interface Props {

  params: Promise<{ shortUrl: string }>;

}

async function ShortURL( { params }: Props) {

  const { shortUrl } = await params

  const { data, error } = await supabase.from("link").select("*")

  if(error){

    console.log(error)

  }else{

    console.log(data)

  }

  return <p>{shortUrl}</p>

}

export default ShortURL

















