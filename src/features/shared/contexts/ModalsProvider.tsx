"use client"

import { HomeModalsProvider } from "@/features/home/contexts/ModalsProvider"

export function ModalsProvider ({ children }: { children: React.ReactNode }) {
  return(
    <HomeModalsProvider>
      { children }
    </HomeModalsProvider>
  )
}