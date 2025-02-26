import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isEmpty } from "validator";


interface Props {

  params: Promise<{ shortUrl: string }>;

}

async function ShortURL( { params }: Props) {

  const { shortUrl } = await params

  const { data: link, error } = await supabase.from("link").select("*").eq('short', shortUrl)

  // si hay error se imprime por consola

  if(error){

    console.log(error)

  }

  if(link?.length == 0){

    return <p>No hay</p>

  }else{

    return <p>Si hay</p>

  }

  













  

}

export default ShortURL

















