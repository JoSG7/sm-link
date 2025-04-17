export function showMainMenu () {

  const background = document.querySelector("#bgMenu")?.classList
  const menu = document.querySelector("#menu")?.classList
  
  background?.remove("hidden")
  background?.add("grid")

  setTimeout(() => {
    menu?.remove("h-0")
    menu?.add("h-[560px]")
  }, 50)

}

export function closeMainMenu () {

  const background = document.querySelector("#bgMenu")?.classList
  const menu = document.querySelector("#menu")?.classList

  menu?.remove("h-[560px]")
  menu?.add("h-0")

  setTimeout(() => {
    background?.remove("grid")
    background?.add("hidden")
  }, 200)

}

export function toggleMenuOption () {

  const option = document.querySelector("#recent-links")?.classList

  option?.toggle("h-0")
  option?.toggle("h-[310px]")

  return option

}