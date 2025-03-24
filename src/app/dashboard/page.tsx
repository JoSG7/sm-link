import { SignOutButton } from "@/components/client/dashboard/sign-out-button"
import { serverAuthSupabase } from "@/lib/supabase-server"

async function Home () {

  const { data: { user } } = await serverAuthSupabase.auth.getUser()

  console.log(user)

  return(

    <main>

      <h1>Welcome {user?.user_metadata?.user_name}</h1>

      <SignOutButton />

    </main>

  )

}

export default Home