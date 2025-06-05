import { supabase } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

async function ShortURL({ params }: { params: Promise<{ shortUrl: string }> }) {

  const { shortUrl } = await params
  const { data: link, error } = await supabase.from("link").select("*").eq('short', shortUrl).single()

  if (error) {
    console.log(error)
  } else if (link) {
    redirect(`/api/${shortUrl}`)
  } else {
    return <p>No hay</p>
  }

}

export default ShortURL

















