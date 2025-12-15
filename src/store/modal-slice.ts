"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type ModalState = {

  menuDrawer: {
    isOpen: boolean
  }
  deleteLink: {
    isOpen: boolean;
    shortLink: string | null;
  }
  setPassword: {
    isOpen: boolean;
    shortLink: string | null;
  }
  deletePassword: {
    isOpen: boolean;
    shortLink: string | null;
  }
  setExpiration: {
    isOpen: boolean;
    shortLink: string | null;
  }

}


const initialState: ModalState = {
  menuDrawer: { isOpen: false },
  deleteLink: { isOpen: false, shortLink: null },
  setPassword: { isOpen: false, shortLink: null },
  deletePassword: { isOpen: false, shortLink: null },
  setExpiration: { isOpen: false, shortLink: null },
}


export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {

    toggleMenuDrawer(state) {
      state.menuDrawer.isOpen = !state.menuDrawer.isOpen
    },

    toggleDeleteLink(state, action: PayloadAction<string | undefined>) {
      state.deleteLink.isOpen = !state.deleteLink.isOpen;
      state.deleteLink.shortLink = action.payload ?? null;
    },

    // SET PASSWORD
    toggleSetPassword(state, action: PayloadAction<string | undefined>) {
      state.setPassword.isOpen = !state.setPassword.isOpen;
      state.setPassword.shortLink = action.payload ?? null;
    },

    // DELETE PASSWORD
    toggleDeletePassword(state, action: PayloadAction<string | undefined>) {
      state.deletePassword.isOpen = !state.deletePassword.isOpen;
      state.deletePassword.shortLink = action.payload ?? null;
    },

    // SET EXPIRATION
    toggleSetExpiration(state, action: PayloadAction<string | undefined>) {
      state.setExpiration.isOpen = !state.setExpiration.isOpen;
      state.setExpiration.shortLink = action.payload ?? null;
    },

  }
})


export const {
  toggleMenuDrawer,
  toggleDeleteLink,
  toggleSetPassword,
  toggleDeletePassword,
  toggleSetExpiration,
} = modalSlice.actions

export default modalSlice.reducer