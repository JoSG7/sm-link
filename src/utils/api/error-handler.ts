import { NextResponse } from "next/server"

type ApiHandler<TArgs extends unknown[]> = (...args: TArgs) => Promise<Response>

export function apiError(message = "Error in server", status = 500, cause?: unknown) {
  if (cause && status >= 500) console.error(cause)

  return NextResponse.json({ error: message }, { status })
}

export function withApiErrorHandler<TArgs extends unknown[]>(handler: ApiHandler<TArgs>) {
  return async (...args: TArgs) => {
    try {
      return await handler(...args)
    } catch (error) {
      return apiError(undefined, 500, error)
    }
  }
}
