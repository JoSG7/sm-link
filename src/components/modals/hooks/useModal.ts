"use client"

import { useContext } from "react";
import { MenuDrawer } from "../contexts/ModalContext";

export function useMenuDrawer() {
  const context = useContext(MenuDrawer)
  if (!context) throw new Error("useMenuDrawer must be used within a MenuDrawerProvider")
  return context
}