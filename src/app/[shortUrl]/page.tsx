import { supabase } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

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

    redirect(`/api/${shortUrl}`)

  }

}

export default ShortURL

















