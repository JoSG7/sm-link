import { LoginBenefits } from "@/components/home/LoginBenefits";
import { NavBar } from "@/components/home/NavbarHeader";
import { LinkForm } from "@/components/home/NewLinkForm";
import { redirect } from "next/navigation";
import { HomeTitle } from "@/components/home/Title";
import { createSupabaseServer } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic'

export default async function Home() {

  const supabaseServer = await createSupabaseServer()
  const { data: { user } } = await supabaseServer.auth.getUser()
  console.log(user)

  if (user) {
    redirect("/dashboard")
  } else {

    return (

      <main className="flex flex-col text-white bg-black">
        <NavBar />
        <div className="flex flex-col gap-28">
          <HomeTitle />
          <LinkForm />
          <LoginBenefits />
          {/* <Footer /> */}
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
