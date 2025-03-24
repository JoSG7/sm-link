import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { AuthButtonClient } from "../client/home/auth-button-client"


async function AuthButtonServer () {

  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return <AuthButtonClient session={user} />

}

export default AuthButtonServer