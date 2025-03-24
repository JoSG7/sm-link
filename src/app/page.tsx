import { LoginDetails } from "@/components/client/home/login-details";
import { NavBar } from "@/components/client/home/header-navbar";
import { OptionsMenu } from "@/components/client/home/menu-options";
import { LinkForm } from "@/components/client/home/new-link-form";
import { serverAuthSupabase } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

const HomeTitle = () => {

  return (

    <section className="py-10 relative z-0">

      <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-emerald-800/30 to-[#09090b]"></div>

      <div className="relative z-10 text-center py-4">

        <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-300 to-emerald-400 tracking-tight"
        style={{WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text"}}
        >
          Link's <br /> Shortener
        </h1>

        <p className="text-gray-300 mt-2">
          Smaller Links, bigger impact
        </p>

      </div>

    </section>

  )

}

const LoginTitle = () => {

  return(

    <section className="py-10 relative z-0">

      {/* <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-emerald-800/30 to-[#09090b]"></div> */}

      <div className="relative z-10 text-center">

        <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-300 to-emerald-400 tracking-tight"
        style={{WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text"}}
        >
          Log in <br /> to start
        </h1>

        {/* <p className="text-gray-300 mt-2">
          Customizing and manage your links!
        </p> */}

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

      <main className="w-full h-screen flex flex-col bg-[#09090b] text-white relative">
    
        <OptionsMenu />
        <NavBar />
    
        <div className="overflow-y-auto">
    
          <HomeTitle />
          <LinkForm />
          <LoginTitle />
          <LoginDetails />
  
        </div>
          
      </main>
      
    )

  }
  
}
