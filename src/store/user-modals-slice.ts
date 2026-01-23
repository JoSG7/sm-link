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
    short: string
  }

  protected: {
    createUserLinkPassword: {
      isOpen: boolean
      short: string
    }
    updateUserLinkPassword: {
      isOpen: boolean
      short: string
    }
    deleteUserLinkPassword: {
      isOpen: boolean
      short: string
    }
  }

  expiration: {
    createUserLinkExpiration: {
      isOpen: boolean,
      short: string
    },
    updateUserLinkExpiration: {
      isOpen: boolean
      short: string
    },
    deleteUserLinkExpiration: {
      isOpen: boolean
      short: string
    }
  }
}


const initialState: ModalState = {

  createUserLink: { isOpen: false },
  updateUserLink: { isOpen: false, short: "" },
  deleteUserLink: { isOpen: false, short: "" },

  protected: {
    createUserLinkPassword: {
      isOpen: false,
      short: ""
    },
    updateUserLinkPassword: {
      isOpen: false,
      short: ""
    },
    deleteUserLinkPassword: {
      isOpen: false,
      short: ""
    },
  },

  expiration: {
    createUserLinkExpiration: {
      isOpen: false,
      short: ""
    },
    updateUserLinkExpiration: {
      isOpen: false,
      short: ""
    },
    deleteUserLinkExpiration: {
      isOpen: false,
      short: ""
    }
  },



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

    toggleCreateUserLinkPassword(state, action: PayloadAction<string | undefined>) {
      state.protected.createUserLinkPassword.isOpen = !state.protected.createUserLinkPassword.isOpen
      state.protected.createUserLinkPassword.short = action.payload ?? ""
    },
    toggleUpdateUserLinkPassword(state, action: PayloadAction<string | undefined>) {
      state.protected.updateUserLinkPassword.isOpen = !state.protected.updateUserLinkPassword.isOpen
      state.protected.updateUserLinkPassword.short = action.payload ?? ""
    },
    toggleDeleteUserLinkPassword(state, action: PayloadAction<string | undefined>) {
      state.protected.deleteUserLinkPassword.isOpen = !state.protected.deleteUserLinkPassword.isOpen
      state.protected.deleteUserLinkPassword.short = action.payload ?? ""
    },

    toggleCreateUserLinkExpiration(state, action: PayloadAction<string | undefined>) {
      state.expiration.createUserLinkExpiration.isOpen = !state.expiration.createUserLinkExpiration.isOpen
      state.expiration.createUserLinkExpiration.short = action.payload ?? ""
    },
    toggleUpdateUserLinkExpiration(state, action: PayloadAction<string | undefined>) {
      state.expiration.updateUserLinkExpiration.isOpen = !state.expiration.updateUserLinkExpiration.isOpen
      state.expiration.updateUserLinkExpiration.short = action.payload ?? ""
    },
    toggleDeleteUserLinkExpiration(state, action: PayloadAction<string | undefined>) {
      state.expiration.deleteUserLinkExpiration.isOpen = !state.expiration.deleteUserLinkExpiration.isOpen
      state.expiration.deleteUserLinkExpiration.short = action.payload ?? ""
    },
  }
})


export const {
  toggleCreateUserLink,
  toggleDeleteUserLink,

  toggleCreateUserLinkPassword,
  toggleDeleteUserLinkPassword,
  toggleUpdateUserLinkPassword,

  toggleCreateUserLinkExpiration,
  toggleUpdateUserLinkExpiration,
  toggleDeleteUserLinkExpiration,
  
} = userModalSlice.actions


export default userModalSlice.reducer