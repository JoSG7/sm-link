import { GuessLinks } from "@/types/global"
import { getGuestID } from "./id-utils"

// Get the guest links 

export async function getGuestLinks() {
  const guestID = getGuestID()
  const res = await fetch(`api/guest-links/${guestID}`)
  const data: GuessLinks[] = await res.json()
  return data
}

// Create a short link

export async function createShortLink(original: string) {
  const guestID = getGuestID()
  const res = await fetch(`/api/guest-links/${guestID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ original })
  })
  const data: { response: string, error: string } = await res.json()
  return data
}

// Delete a guest link

export async function deleteGuessLink(short: string) {
  const guestID = getGuestID()
  const res = await fetch(`api/guest-links/${guestID}/${short}`, {
    method: "DELETE",
  })
  const data: { error: string, response: string } = await res.json()
  return data
}


