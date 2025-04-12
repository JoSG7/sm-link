import { LoginBenefits } from "@/components/client/home/login-benefits";
import { NavBar } from "@/components/client/home/header-navbar";
import { LinkForm } from "@/components/client/home/new-link-form";
import { serverAuthSupabase } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { Footer } from "@/components/utils/footer";

const HomeTitle = () => {

  return (

    <section className="py-14 relative z-0">

      <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-emerald-800/30 to-[#09090b]
      md:via-purple-800/30"></div>

      <div className="relative z-10 flex gap-3 text-center justify-center">

        <img src="svg/rocket.svg" alt="rocket" width={280} height={280} className="hidden md:block"/>

        <div className="flex justify-center items-center">
          
          <div className="text-gray-300 sm:text-xl">

            <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-300 to-emerald-400 tracking-tight pb-2
            sm:text-7xl md:from-purple-400 md:to-purple-900"
            style={{WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text"}}>
              Link's <br /> Shortener
            </h1>
            Smaller Links, bigger impact

          </div>

        </div>

      </div>

    </section>

  )

}

const LoginTitle = () => {

  return(

    <section className="py-14 z-0 sm:py-20">

      {/* <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-emerald-800/30 to-[#09090b]"></div> */}

      <div className="relative z-10 text-center flex gap-7 justify-center">

        <div className="flex justify-center items-center">

          <div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-300 to-emerald-400 tracking-tight
            sm:text-7xl md:from-purple-400 md:to-purple-900"
            style={{WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text"}}>
              Log in <br /> to start
            </h1>
          </div>

        </div>

        <img src="svg/login.svg" alt="rocket" width={280} height={280} className="hidden md:block"/>

      </div>

    </section>

  )

}

export default async function Home() {

  const { data: { user } } = await serverAuthSupabase.auth.getUser()

  if(user){

    redirect("/dashboard")

  }else{

    return (

      <main className="flex flex-col bg-[#001413] text-white md:bg-[#0e051a]">
        <NavBar />
        <div>

          <div className="bg-[#09090b] rounded-b-[50%_20px] md:rounded-b-[50%_30px]">
            <HomeTitle />
            <LinkForm />
          </div>

          <div>
            <LoginTitle />
            <LoginBenefits />
          </div>

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

