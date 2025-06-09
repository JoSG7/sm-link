'use client'

import { signInWithOAuth } from "@/utils/auth/client-auth"
import { IconBrandGithubFilled, IconBrandGoogleFilled } from "@tabler/icons-react"

// Auth with GitHub

export function GitHubAuthButton() {

  return (
    <button type="button" className="py-2 px-4 flex gap-2 items-center rounded-lg bg-[#1a1d1f] 
    border border-neutral-800" onClick={() => { signInWithOAuth("github") }}>
      <IconBrandGithubFilled size={20}></IconBrandGithubFilled>
      Git Hub
    </button>
  )

}

export function GoogleAuthButton() {

  return (
    <button type="button" className="py-2 px-4 flex gap-2 items-center rounded-lg bg-red-700 
    border border-red-800" onClick={() => { alert("comingsoon") }}>
      <IconBrandGoogleFilled size={20}></IconBrandGoogleFilled>
      Gmail
    </button>
  )

}
