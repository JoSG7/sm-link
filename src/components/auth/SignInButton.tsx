'use client'

import { signInWithOAuth } from "@/utils/auth/auth-client"
import { IconBrandGithubFilled, IconBrandGoogleFilled } from "@tabler/icons-react"


export function GitHubAuthButton() {
  return (
    <button className="py-2 px-3 flex items-center gap-1 rounded-lg hover:bg-neutral-800 cursor-pointer duration-300"
      type="button"
      onClick={() => { signInWithOAuth("github") }}>
      <IconBrandGithubFilled className="size-4" />
      Continue with GitHub
    </button>
  )
}

export function GoogleAuthButton() {
  return (
    <button type="button" className="py-2 px-4 flex gap-2 items-center rounded-lg bg-red-700 
    border border-red-800" onClick={() => { alert("comingsoon") }}>
      <IconBrandGoogleFilled className="size-5"></IconBrandGoogleFilled>
      Gmail
    </button>
  )
}
