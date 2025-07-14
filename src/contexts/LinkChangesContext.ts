import { createContext } from "react";

type LinkChangesType = {
  linkChanges: number
  recordLinkChanges: () => void;
}

export const LinkChanges = createContext<LinkChangesType | null>(null)

