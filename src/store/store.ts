import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import userReducer from "./state/userSlice"


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
  },
  // חובה: ה-middleware מטפל ב-cache ובשליחת הבקשות
  middleware: (getDefault) => getDefault().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
