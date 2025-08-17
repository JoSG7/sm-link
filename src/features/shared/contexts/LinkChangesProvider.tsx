"use client"

import { useState } from "react";
import { LinkChanges } from "./LinkChangesContext";

export function LinkChangesProvider({ children }: { children: React.ReactNode }) {

  const [linkChanges, setLinkChange] = useState(0)

  const recordLinkChanges = () => {
    setLinkChange(prev => prev + 1)
  }

  return(
    <LinkChanges.Provider value={{ linkChanges, recordLinkChanges }}>
      {children}
    </LinkChanges.Provider>
  )

}