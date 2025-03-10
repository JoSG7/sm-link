import isURL from "validator/lib/isURL"





// Show and Hide Menu Navigation

export function showOptionsMenu () {

  const background = document.querySelector("#bgMenu")
  const menu = document.querySelector("#menu")

  background?.classList.remove("hidden")
  background?.classList.add("grid")

  menu?.addEventListener("click", (event: Event) => {
    event.stopPropagation()
  })

  setTimeout(() => {
    menu?.classList.remove("h-0")
    menu?.classList.add("h-96")
  }, 50)

}

export function closeOptionsMenu () {

  const background = document.querySelector("#bgMenu")
  const menu = document.querySelector("#menu")

  menu?.classList.remove("h-96")
  menu?.classList.add("h-0")

  setTimeout(() => {
    background?.classList.remove("grid")
    background?.classList.add("hidden")
  }, 200)

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