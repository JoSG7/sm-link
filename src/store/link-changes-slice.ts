"use client"

import { createSlice } from "@reduxjs/toolkit"

type LinkChangesState = {
  changes: number
}

const initialState: LinkChangesState = {
  changes: 0
} 


export const linkChangesSlice = createSlice({

  name: "linkChanges",
  initialState,
  reducers: {

    recordChange(state) {
      state.changes = state.changes + 1
    }

  }

})


export const { recordChange } = linkChangesSlice.actions
export default linkChangesSlice.reducer


