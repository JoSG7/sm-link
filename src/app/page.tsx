import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import { Hero } from "@/features/home/components/hero";
import { HomeNavBar } from "@/features/home/layout/Navbar";
import { MenuDrawer } from "@/features/home/components/menu";

// export const dynamic = "force-dynamic"

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
          {/* <LinkFormSection />
          <LoginDetails />
          <Footer /> */}
        </div>
      </main>
    )
  }
}



