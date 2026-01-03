"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";


type UserSlice = {
  user: User | null
}

const initialState: UserSlice = {
  user: null
}


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    updateUser(state, action: PayloadAction<User | null>){
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
    }

  }
})


export const {
  updateUser,
  clearUser
} = userSlice.actions

export default userSlice.reducer