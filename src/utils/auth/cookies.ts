import { cookies } from "next/headers";

export async function getGuestID () {
  const cookieStore = await cookies()
  const guestID = cookieStore.get("guestID")?.value
  return guestID
}