"use client"

import { GitHubAuthButton } from "@/components/auth/SignInButton";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/shadcn/hover-card";

export function LoginButton() {

  return (

    <HoverCard openDelay={200}>

      <HoverCardTrigger className="hidden px-3 py-2 items-center rounded-lg text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white lg:flex">
        Log in
      </HoverCardTrigger>

      <HoverCardContent className="w-max p-1 text-sm text-neutral-200 bg-neutral-950 border border-neutral-800">
        <GitHubAuthButton />
      </HoverCardContent>

    </HoverCard>

  )

}