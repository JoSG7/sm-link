export function showMainMenu () {

  const background = document.querySelector("#bgMenu")?.classList
  const menu = document.querySelector("#menu")?.classList
  background?.remove("hidden")
  background?.add("grid")
  
  // For movil design
  if(window.innerWidth < 640){

    menu?.add("w-full")
    setTimeout(() => {
      menu?.remove("h-0")
      menu?.add("h-[560px]")
    }, 50)

  }else{

    setTimeout(() => {
      menu?.remove("w-full")
      menu?.remove("sm:w-0")
      menu?.add("w-4/6")
    }, 50)

  }

}

export function closeMainMenu () {

  const background = document.querySelector("#bgMenu")?.classList
  const menu = document.querySelector("#menu")?.classList
  if(window.innerWidth < 640){
    menu?.remove("h-[560px]")
    menu?.add("h-0")
  }else{
    menu?.remove("w-4/6")
    menu?.add("w-full")
    menu?.add("sm:w-0")
  }
  
  setTimeout(() => {
    background?.remove("grid")
    background?.add("hidden")
  }, 100)
}

export function toggleMenuOption () {

  const option = document.querySelector("#recent-links")?.classList

  option?.toggle("h-0")
  option?.toggle("h-[310px]")

  return option

}

