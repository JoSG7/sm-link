'use client'

import { signInWithOAuth } from "@/features/shared/auth/auth-client"
import { IconBrandGithubFilled, IconBrandGoogleFilled } from "@tabler/icons-react"


export function GitHubAuthButton() {
  return (
    <button className="py-3 px-5 flex gap-2 items-center text-sm rounded-full cursor-pointer duration-300
    border-2 border-neutral-900 hover:scale-105 "
      type="button"
      onClick={() => { signInWithOAuth("github") }}>

      <IconBrandGithubFilled className="size-5"></IconBrandGithubFilled>
      Get started with Git Hub
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
