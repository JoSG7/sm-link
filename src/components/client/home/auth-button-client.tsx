'use client'

import { signInWithOAuth } from "@/logic/client-functions"
import { IconBrandGithubFilled } from "@tabler/icons-react"

// Auth with GitHub

export function GitHubAuthButton () {

  return(

    <button type="button" className="py-2 px-4 flex gap-2 items-center rounded-lg bg-[#1a1d1f] 
    border border-neutral-800" onClick={() => { signInWithOAuth("github") }}>
      <IconBrandGithubFilled size={20}></IconBrandGithubFilled>
      Git Hub
    </button>

  )

}

// export function GoogleAuthButton () {



// }
