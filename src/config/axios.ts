
import axios from 'axios'

export const api = axios.create({
  baseURL: "/api/",
  timeout: 12000,
  withCredentials: true
})

api.interceptors.response.use(
  res => res,
  error => {
    if (axios.isAxiosError<{ error: string }>(error)) {
      throw new Error(
        error.response?.data?.error ?? "Network error, please refresh the page and try again"
      )
    }

    throw error
  }
)