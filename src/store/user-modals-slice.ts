import { createSlice } from "@reduxjs/toolkit"


type ModalState = {
  createLink: {
    isOpen: boolean
  }
  updateLink: {
    isOpen: boolean
    short: string | null
  }
}


const initialState: ModalState = {
  createLink: { isOpen: false },
  updateLink: { isOpen: false, short: null }
}


export const userModalSlice = createSlice({
  name: "user-modals",
  initialState,
  reducers: {
    toggleCreateLink(state) {
      state.createLink.isOpen = !state.createLink.isOpen
    }
  }
}) 


export const {
  toggleCreateLink
} = userModalSlice.actions


export default userModalSlice.reducer