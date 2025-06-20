import { GuessLinks } from "@/types/global"
// Get the guest links 

export async function getGuestLinks() {
  const res = await fetch(`api/guest-links`)
  const data: GuessLinks[] = await res.json()
  return data
}

// Create a short link

export async function createShortLink(original: string) {
  const res = await fetch(`/api/guest-links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ original })
  })
  const data: { response: string, error: string } = await res.json()
  return data
}

// Delete a guest link

export async function deleteGuessLink(short: string) {
  const res = await fetch(`api/guest-links/${short}`, {
    method: "DELETE",
  })
  const data: { error: string, response: string } = await res.json()
  return data
}


