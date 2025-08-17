export function useScrollTo() {
  return (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }
}