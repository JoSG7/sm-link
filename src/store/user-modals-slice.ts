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
    editUserLinkPassword: {
      isOpen: boolean
      short: string
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
    },
    editUserLinkPassword: {
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
    toggleEditUserLinkPassword(state, action: PayloadAction<string | undefined>) {
      state.protected.editUserLinkPassword.isOpen = !state.protected.editUserLinkPassword.isOpen
      state.protected.editUserLinkPassword.short = action.payload ?? ""
    },
  }
})


export const {
  toggleCreateUserLink,
  toggleDeleteUserLink,

  toggleInsertUserLinkPassword,
  toggleDeleteUserLinkPassword,
  toggleEditUserLinkPassword,
  
} = userModalSlice.actions


export default userModalSlice.reducer