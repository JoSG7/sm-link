import { AuthListener } from "@/features/dashboard/layout/AuthListener";
import { SideBar } from "@/features/dashboard/layout/side-bar/SideBar";
import { createSupabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";


export default async function DashboardLayout({ children }: { children: ReactNode }) {

  const supabaseServer = await createSupabaseServer()
  const { data: { user } } = await supabaseServer.auth.getUser()

  if(!user) return redirect("/")

  return (

    <section className="w-screen min-h-screen flex bg-neutral-950/80 ">

      <SideBar />
      <AuthListener />

      <main className="grow lg:px-5">
        {children}
      </main>

    </section>

  )

}