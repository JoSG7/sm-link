import { toast } from "sonner"
import isURL from "validator/lib/isURL"
import { toggleOption } from "./client-functions"

export async function getGuessLinks () {

  const option = toggleOption()
  const guessID = localStorage.getItem("guessID")

  // If the links are hidden, use the api

  if(option?.classList.contains("h-80")){

    const res = await fetch("api/get-guess-link", {

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

