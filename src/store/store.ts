import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import userReducer from "./state/userSlice"
import toastReducer from "./state/toastSlice"


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    toast: toastReducer,
  },
  middleware: (getDefault) => getDefault().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
