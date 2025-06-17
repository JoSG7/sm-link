import { createSupabase } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

async function ShortURL({ params }: { params: Promise<{ shortUrl: string }> }) {

  const supabase = createSupabase()
  const { shortUrl } = await params
  const { data: link, error } = await supabase.rpc("get_link_by_short", { short_url: shortUrl })

  if (error) {
    console.log(error)
  } else if (link) {
    redirect(`/api/${shortUrl}`)
  } else {
    return <p>No hay</p>
  }

}

export default ShortURL

















