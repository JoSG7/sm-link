import { SideBar } from "@/features/protected/layout/sidebar/SideBar";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ReactNode } from "react";


export default async function ProtectedLayout({ children }: { children: ReactNode }) {

  const supabaseServer = await createSupabaseServerClient()
  const { data: { user } } = await supabaseServer.auth.getUser()

  return (

    <section className="w-screen min-h-screen flex bg-[#080a08] text-white">

      <SideBar user={user} />

      <main className="max-h-screen grow overflow-y-auto md:px-7 xl:px-">
        {children}
      </main>

    </section>

  )

}


// if(!user) return redirect("/")