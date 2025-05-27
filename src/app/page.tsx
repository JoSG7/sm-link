import { LoginBenefits } from "@/components/home/LoginBenefits";
import { NavBar } from "@/components/home/NavbarHeader";
import { LinkForm } from "@/components/home/NewLinkForm";
import { serverAuthSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
 import { HomeTitle } from "@/components/home/Title";

export default async function Home() {

  const { data: { user } } = await serverAuthSupabase.auth.getUser()

  if(user){
    redirect("/dashboard")
  }else{

    return (

      <main className="flex flex-col text-white bg-black">
        <NavBar />
        <div>
          <div className="bg-black">
            <HomeTitle />
            {/* <LinkForm /> */}
          </div>

          <div>
            {/* <LoginBenefits /> */}
          </div>
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
