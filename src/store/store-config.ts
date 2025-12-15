"use client"

import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal-slice";
import linkChangesReducer from "./link-changes-slice";


export const store = configureStore({
  reducer: {
    modals: modalReducer,
    linkChanges: linkChangesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;