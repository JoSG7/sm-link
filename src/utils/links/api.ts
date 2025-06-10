import { GuessLinks } from "@/types/global"
import { getGuessID } from "./id-utils"

export async function getGuessLinks() {
  
  const guessID = getGuessID()
  const res = await fetch(`api/guess-link/${guessID}`)
  const data: GuessLinks[] = await res.json()
  return data
}

export async function deleteGuessLink() {
  const guessID = getGuessID()
  const res = await fetch(`api/guess-link/${guessID}`, {
    method: "DELETE"
  })
  const data: { error: string, response: string } = await res.json()
  return data
}

export async function createShortLink(original: string) {

  const guessID = getGuessID()
  const res = await fetch("/api/short-link", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ guessID, original })
  })
  const data: { response: string, error: string } = await res.json()
  return data
}

