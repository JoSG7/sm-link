import { NavBar } from "@/components/home/NavbarHeader";
import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import { MainMenu } from "@/components/home/menu/Menu";
import { Hero } from "@/features/home/components/hero";
import { LinkFormSection } from "@/features/home/components/shortener-section";
import { LoginDetails } from "@/features/home/components/login-details";
import { Footer } from "@/features/home/layout/HomeFooter";

// export const dynamic = "force-dynamic"

export default async function Home() {

  const supabaseServer = await createSupabaseServer()
  const { data: { user } } = await supabaseServer.auth.getUser()

  if (user) {
    redirect("/dashboard")
  } else {

    return (
      <main className="flex flex-col text-white bg-black">
        <NavBar />
        <MainMenu />
        <div className="flex flex-col gap-28 lg:gap-10">
          <Hero />
          <LinkFormSection />
          <LoginDetails />
          <Footer />
        </div>
      </main>
    )
  }
}


// Fondos

// 001413 verdoso
// 060B0F oscuro
// 040c10 otro oscuro
// md:bg-[#040f1e]
// lg-2:bg-[#0e051a]
// bg-[#001413]

//  rounded-b-[50%_20px] md:rounded-b-[50%_30px] lg-2:rounded-b-[100%_10%]
