import { toast } from "sonner"
import isURL from "validator/lib/isURL"

// Show and Hide Menu Navigation

export function showOptionsMenu () {

  const background = document.querySelector("#bgMenu")
  const menu = document.querySelector("#menu")

  background?.classList.remove("hidden")
  background?.classList.add("grid")

  setTimeout(() => {
    menu?.classList.remove("h-0")
    menu?.classList.add("h-5/6")
  }, 50)

}

export function closeOptionsMenu () {

  const background = document.querySelector("#bgMenu")
  const menu = document.querySelector("#menu")

  menu?.classList.remove("h-5/6")
  menu?.classList.add("h-0")

  setTimeout(() => {
    background?.classList.remove("grid")
    background?.classList.add("hidden")
  }, 200)

}

// Get Links from a guess

export async function getGuessShortLink () {

  const option = document.querySelector("#menu ul")

  option?.classList.toggle("h-0")
  option?.classList.toggle("h-80")
  option?.classList.toggle("py-4")

  const guessID = localStorage.getItem("guessID")

  // If the links are hidden, use the api

  if(option?.classList.contains("h-80")){

    const res = await fetch("api/get-guess-short-link", {

      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({guessID})

    })

    const data = await res.json()

    return data

  }

}






// VALIDACION

const verifieURL = (url: string | undefined) => {

  const inputLink = document.querySelector<HTMLInputElement>("#txtUrl")

  if(isURL(`${url}`)){

    inputLink?.classList.remove("border-zinc-900")
    inputLink?.classList.add("border-green-400")
    inputLink?.classList.remove("border-red-400")
    return true

  }else{

    inputLink?.classList.remove("border-zinc-900")
    inputLink?.classList.add("border-red-400")
    inputLink?.classList.remove("border-green-400")
    return false

  }
  
}

//Crear un Link Corto

export async function createShortLink () {

  const originalLink = document.querySelector<HTMLInputElement>("#txtUrl")?.value

  if(!verifieURL(originalLink)){

    toast.error("Ingrese un link válido")
    return { error: "Ingrese link válido" }
    
  }else{

    // si no existe guessid en localstorage, se crea y se almacena

    let guessID = localStorage.getItem("guessID")

    if(!guessID){
      guessID = crypto.randomUUID()
      localStorage.setItem("guessID", guessID)
    }

    // Se envia datos a la API

    const res = await fetch("/api/short-link", {

      method:"POST",
      body: JSON.stringify({guessID, originalLink}),
      headers: {
        "Content-Type": "application/json",
      }
      
    })

    const shortLink = await res.json()

    return shortLink

  }

}