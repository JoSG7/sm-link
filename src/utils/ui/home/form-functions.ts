export function showFormInfo () {

  const formInfo = document.querySelector("#form-info")?.classList

  formInfo?.remove("w-0")
  formInfo?.remove("opacity-0")
  formInfo?.add("w-[73%]")  

}

export function closeFormInfo () {

  const formInfo = document.querySelector("#form-info")?.classList

  formInfo?.remove("w-[73%]")
  formInfo?.add("w-0")

  setTimeout(() => {
    formInfo?.add("opacity-0")
  }, 100);

}