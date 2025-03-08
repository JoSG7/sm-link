import isURL from "validator/lib/isURL"

export function showOptionsMenu () {

  const background = document.querySelector("#optionsMenu")
  const menu = document.querySelector("#optionsMenu nav")

  background?.classList.remove("hidden")
  background?.classList.add("grid")

  

}

export function closeOptionsMenu () {

  const background = document.querySelector("#optionsMenu")
  const menu = document.querySelector("#optionsMenu nav")

  background?.classList.add("hidden")

}

// VALIDACION

const verifieURL = (url: string | undefined) => {

  const inputLink = document.querySelector<HTMLInputElement>("#txtUrl")

  if(isURL(`${url}`)){

    inputLink?.classList.add("outline-green-400")
    inputLink?.classList.remove("outline-red-400")
    return true

  }else{

    inputLink?.classList.add("outline-red-400")
    inputLink?.classList.remove("outline-green-400")
    return false

  }
  
}

//Crear un Link Corto

export async function createShortLink () {

  const originalLink = document.querySelector<HTMLInputElement>("#txtUrl")?.value

  if(!verifieURL(originalLink)){

    return { error: "Ingrese link válido" }

  }else{

    // si no existe guessid en localstorage, se crea y se almacena

    let guessID = localStorage.getItem("guessID")

    if(!guessID){

      guessID = crypto.randomUUID()
      localStorage.setItem("guessID", guessID)

    }

    // Se envia datos a la API

    const res = await fetch("/api/shortlink", {

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