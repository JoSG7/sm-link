import { redirect } from "next/navigation";
import { Hero } from "@/features/home/hero-section/Hero";
import { HomeNavBar } from "@/features/home/layout/nav-bar/Navbar";
import { MenuDrawer } from "@/features/home/layout/menu-drawer/MenuDrawer";
import { createSupabaseServer } from "@/lib/supabase/server";


export default async function Home() {

  const supabaseServer = await createSupabaseServer()
  const { data: { user } } = await supabaseServer.auth.getUser()

  if (user) {
    redirect("/dashboard")
  } else {

    return (
      <main className="flex flex-col text-white bg-black">
        <HomeNavBar />
        <MenuDrawer />
        <div className="flex flex-col gap-28 lg:gap-10">
          <Hero />
        </div>
      </main>
    )
  }
}



