import { GuessLinks } from "@/types/global"
import { getGuestID } from "./id-utils"

export async function getGuestLinks() {
  const guestID = getGuestID()
  const res = await fetch(`api/guess-link/${guestID}`)
  const data: GuessLinks[] = await res.json()
  return data
}

export async function deleteGuessLink(short: string) {
  const guestID = getGuestID()
  const res = await fetch(`api/guess-link/${guestID}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ short })
  })
  const data: { error: string, response: string } = await res.json()
  return data
}

export async function createShortLink(original: string) {
  const guestID = getGuestID()
  const res = await fetch("/api/short-link", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ guestID, original })
  })
  const data: { response: string, error: string } = await res.json()
  return data
}

