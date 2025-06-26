import { GuestLinks, LinkDetails } from "@/types/global"
// Get the guest links 

export async function getGuestLinks() {
  const res = await fetch(`api/guest-links`)
  const data: GuestLinks[] = await res.json()
  return data
}

export async function getLinkDetails() {
  const res = await fetch(`api/guest-links`)
  const data: LinkDetails[] = await res.json()
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

export async function deleteGuestLink(short: string) {
  const res = await fetch(`api/guest-links/${short}`, {
    method: "DELETE",
  })
  const data: { error: string, response: string } = await res.json()
  return data
}

// Create Protected Link

export async function createProtectedLink (short: string, password: string) {
  const res = await fetch("api/guest-links/protected-links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ short, password })
  })
  const data: { error: string, response: string } = await res.json()
  return data
}

// Validate link password

export async function validateLinkPassword (short: string, password: string) {
  const res = await fetch("api/guest-links/protected-links/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ short, password })
  })
  const data : { error: string, response: string | null } = await res.json()
  return data
}


