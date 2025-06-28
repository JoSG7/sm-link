import { LoginBenefits } from "@/components/home/LoginBenefits";
import { NavBar } from "@/components/home/NavbarHeader";
import { LinkForm } from "@/components/home/ShortLinkForm";
import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import { HomeModals } from "@/modals/home/Provider";
import { MainMenu } from "@/components/home/menu/Menu";
import { Hero } from "@/components/home/sections/Hero/Hero";

// export const dynamic = "force-dynamic"

export default async function Home() {

  const supabaseServer = await createSupabaseServer()
  const { data: { user } } = await supabaseServer.auth.getUser()

  if (user) {
    redirect("/dashboard")
  } else {

    return (

      <HomeModals>
        <main className="flex flex-col text-white bg-black">
          <NavBar />
          <MainMenu />
          <div className="flex flex-col gap-28">
            <Hero />
            <LinkForm />
            <LoginBenefits />
            {/* <Footer /> */}
          </div>
        </main>
      </HomeModals>

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
