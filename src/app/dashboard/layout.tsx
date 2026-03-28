import { SideBar } from "@/features/dashboard/layout/sidebar/SideBar";
import { createSupabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";


export default async function DashboardLayout({ children }: { children: ReactNode }) {

  const supabaseServer = await createSupabaseServer()
  const { data: { user } } = await supabaseServer.auth.getUser()

  if(!user) return redirect("/")

  return (

    <section className="w-screen min-h-screen flex bg-neutral-950/50 text-white">

      <SideBar user={user} />

      <main className="max-h-screen grow overflow-y-auto md:px-7 xl:px-8">
        {children}
      </main>

    </section>

  )

}