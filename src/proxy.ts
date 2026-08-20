import { NextRequest, NextResponse } from "next/server"

const guestCookieName = "guest-id"
const guestCookieMaxAge = 60 * 60 * 24 * 30

export function proxy(request: NextRequest) {
  const response = NextResponse.next()

  if (!request.cookies.has(guestCookieName)) {
    response.cookies.set(guestCookieName, crypto.randomUUID(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: guestCookieMaxAge,
    })
  }

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
}
