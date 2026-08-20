import { createSupabaseServerClient } from "@/lib/supabase/server"

export default async function AdminLinks() {

  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from("links").select("*")

  return (

    <section className="min-h-screen flex flex-col gap-7 md:py-7 xl:py-8">

      <h1>Links</h1>
      <div>
        {
          data?.map((el, i)=> (
            <h1 key={i}>{ el.original }</h1>
          ))
        }
      </div>

    </section>

  )

}