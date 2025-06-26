import { PasswordForm } from "@/components/home/PasswordForm";
import { createSupabase } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

interface Link {
  id: string
  short: string
  original: string | null
  has_password: boolean
}

async function ShortURL({ params }: { params: Promise<{ shortUrl: string }> }) {

  const supabase = createSupabase()
  const { shortUrl } = await params
  const { data, error } = await supabase.rpc("get_link_details", { x_short: shortUrl }).maybeSingle()
  const link = data as Link | null

  if(error){
    console.log(error)
    return <p>Has ocurred an unexpected error, please try again</p>
  } else if(link) {

    if(link.has_password){
      return <PasswordForm short={shortUrl} />
    } else if(link.original) {
      redirect(link.original)
    }
    
  } else {
    return <p>No hay</p>
  }
}

export default ShortURL

















