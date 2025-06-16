import { SignOutButton } from "@/components/dashboard/sign-out-button"
import { createSupabaseServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

async function Dashboard () {

  const supabaseServer = await createSupabaseServer()
  const { data: { user } } = await supabaseServer.auth.getUser()
  console.log(user)

  if(!user){

    console.log(`no se encontro usuario ${user}`)
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