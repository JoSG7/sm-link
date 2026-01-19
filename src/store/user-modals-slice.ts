import { createSlice, PayloadAction } from "@reduxjs/toolkit"


type ModalState = {
  createUserLink: {
    isOpen: boolean
  },
  deleteUserLink: {
    isOpen: boolean
    short: string 
  }
  updateUserLink: {
    isOpen: boolean
    short: string | null
  }

  protected: {
    insertUserLinkPassword: {
      isOpen: boolean
      short: string | null
    }
    deleteUserLinkPassword: {
      isOpen: boolean
      short: string | null
    }
  }
}


const initialState: ModalState = {

  createUserLink: { isOpen: false },
  updateUserLink: { isOpen: false, short: "" },
  deleteUserLink: { isOpen: false, short: "" },

  protected: {
    deleteUserLinkPassword: {
      isOpen: false, 
      short: ""
    },
    insertUserLinkPassword: {
      isOpen: false,
      short: ""
    }
  }


}


export const userModalSlice = createSlice({
  name: "user-modals",
  initialState,
  reducers: {
    toggleCreateUserLink(state) {
      state.createUserLink.isOpen = !state.createUserLink.isOpen
    },
    toggleDeleteUserLink(state, action: PayloadAction<string | undefined>) {
      state.deleteUserLink.isOpen = !state.deleteUserLink.isOpen
      state.deleteUserLink.short = action.payload ?? ""
    },
    toggleInsertUserLinkPassword(state, action: PayloadAction<string | undefined>) {
      state.protected.insertUserLinkPassword.isOpen = !state.protected.insertUserLinkPassword.isOpen
      state.protected.insertUserLinkPassword.short = action.payload ?? ""
    },
    toggleDeleteUserLinkPassword(state, action: PayloadAction<string | undefined>) {
      state.protected.deleteUserLinkPassword.isOpen = !state.protected.deleteUserLinkPassword.isOpen
      state.protected.deleteUserLinkPassword.short = action.payload ?? ""
    },
  }
})


export const {
  toggleCreateUserLink,
  toggleDeleteUserLink,
  toggleInsertUserLinkPassword,
  toggleDeleteUserLinkPassword
} = userModalSlice.actions


export default userModalSlice.reducer