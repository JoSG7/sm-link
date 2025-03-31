import { clientAuthSupabase } from "@/lib/supabase-client"
import type { Provider } from "@supabase/supabase-js"
import { redirect } from "next/navigation"

// Show and hide mainMenu

export function showMainMenu () {

  const background = document.querySelector("#bgMenu")
  const menu = document.querySelector("#menu")
  
  background?.classList.remove("hidden")
  background?.classList.add("grid")
  
  setTimeout(() => {
    menu?.classList.remove("h-0")
    menu?.classList.add("h-[556px]")
  }, 50)
  
} 

export function closeMainMenu () {

  const background = document.querySelector("#bgMenu")
  const menu = document.querySelector("#menu")

  menu?.classList.remove("h-[556px]")
  menu?.classList.add("h-0")

  setTimeout(() => {
    background?.classList.remove("grid")
    background?.classList.add("hidden")
  }, 200)

}

//Show the option contains

export function toggleOption () {

  const option = document.querySelector("#menu .option-list div")

  option?.classList.toggle("h-0")
  option?.classList.toggle("h-80")
  option?.classList.toggle("py-4")

  return option

}

// Auth and SignOut on client Component

export async function signInWithOAuth (provider : Provider) {

  await clientAuthSupabase.auth.signInWithOAuth({

    provider,
    options: {
      redirectTo: "https://sm-link.vercel.app/auth/callback"
    }

  })

}

export async function signOut () {

  await clientAuthSupabase.auth.signOut()

  redirect("/")

}