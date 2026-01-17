"use client"

import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal-slice";
import linkChangesReducer from "./link-changes-slice";
import userReducer from "./user-slice"
import userModalsReducer from "./user-modals-slice"

export const store = configureStore({
  reducer: {
    modals: modalReducer,
    linkChanges: linkChangesReducer,
    user: userReducer,
    userModals: userModalsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;