import { LoginBenefits } from "@/components/home/login-benefits";
import { NavBar } from "@/components/home/header-navbar";
import { LinkForm } from "@/components/home/new-link-form";
import { serverAuthSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Footer } from "@/components/layout/footer";

const HomeTitle = () => {

  return (

    <section className="py-14 relative z-0 flex justify-center">

      <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-emerald-800/30 to-[#09090b] lg-2:
      lg-2:via-purple-800/30 md:via-sky-800/30"></div>

      <div className="relative w-[94%] max-w-[1080px] z-10 flex gap-3 text-center justify-center lg-2:justify-between">

        <img src="svg/rocket-purple.svg" alt="rocket" className="size-[280px] duration-500 hidden md:block lg:size-[380px] lg-2:hidden"/>
        <img src="svg/share-link.svg" alt="share" className="size-[430px] duration-500 hidden lg-2:block" />

        <div className="flex justify-center items-center">
          
          <div className="text-gray-300 sm:text-xl lg:text-2xl lg-2:text-3xl">

            <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-300 to-emerald-400 tracking-tight pb-2 duration-300
            sm:text-7xl lg-2:from-purple-400 lg-2:to-purple-900 lg:text-8xl lg-2:text-9xl md:from-sky-300 md:to-blue-700"
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

    <section className="py-14 z-0 sm:py-20 lg-2:py-24">

      {/* <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-emerald-800/30 to-[#09090b]"></div> */}

      <div className="relative z-10 text-center flex gap-7 justify-center lg-2:gap-10">

        <div className="flex justify-center items-center">

          <div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-300 to-emerald-400 tracking-tight
            sm:text-7xl lg-2:from-purple-400 lg-2:to-purple-900 lg:text-8xl lg-2:text-9xl md:from-sky-400 md:to-blue-900"
            style={{WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text"}}>
              Log in <br /> to start
            </h1>
          </div>

        </div>

        <img src="svg/auth.svg" alt="rocket" className="size-[280px] hidden md:block lg:size-[380px] lg-2:hidden"/>
        <img src="svg/login.svg" alt="auth" className="size-[430px] hidden lg-2:block"/>

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

      <main className="flex flex-col bg-[#001413] text-white lg-2:bg-[#0e051a] md:bg-[#040f1e]">
        <NavBar />
        <div>

          <div className="bg-[#09090b] rounded-b-[50%_20px] md:rounded-b-[50%_30px] lg-2:rounded-b-[100%_10%]">
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

