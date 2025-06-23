"use client"

import { createContext } from "react";

type MenuDrawerType = {
  menu: boolean;
  toggleMenu: () => void;
}

export const MenuDrawer = createContext<MenuDrawerType | null>(null)


