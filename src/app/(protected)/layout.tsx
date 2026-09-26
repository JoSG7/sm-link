import { SideBar } from "@/features/protected/layout/sidebar/SideBar";
import { MobileNav } from "@/features/protected/layout/navbar/MobileNav";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ReactNode } from "react";


export default async function ProtectedLayout({ children }: { children: ReactNode }) {

  const supabaseServer = await createSupabaseServerClient()
  const { data: { user } } = await supabaseServer.auth.getUser()

  return (

    <section className="w-screen min-h-screen flex bg-moss-950 text-white">

      <SideBar user={user} />

      <main className="max-h-screen grow overflow-y-auto px-5 pb-24 md:px-7 sm:pb-0">
        <MobileNav />
        {children}
      </main>

    </section>

  )

}


// if(!user) return redirect("/")