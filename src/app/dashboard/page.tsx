import { SignOutButton } from "@/components/dashboard/sign-out-button"
import { supabaseServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

async function Dashboard () {

  const { data: { user } } = await supabaseServer.auth.getUser()

  if(!user){

    redirect("/")

  }else{

    return(
  
      <main>
  
        <h1>Welcome {user?.user_metadata?.user_name}</h1>
  
        <SignOutButton />
        
      </main>
  
    )

  }

}

export default Dashboard