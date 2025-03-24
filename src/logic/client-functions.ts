
// Show and hide mainMenu

export function showMainMenu () {

  const background = document.querySelector("#bgMenu")
  const menu = document.querySelector("#menu")
  
  background?.classList.remove("hidden")
  background?.classList.add("grid")
  
  setTimeout(() => {
    menu?.classList.remove("h-0")
    menu?.classList.add("h-5/6")
  }, 50)
  
}

export function closeMainMenu () {

  const background = document.querySelector("#bgMenu")
  const menu = document.querySelector("#menu")

  menu?.classList.remove("h-5/6")
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




// Auth on client Component

