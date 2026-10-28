import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { userResponse } from "../../types/user"
import type { RootState } from "../store"

interface userState {
    user: userResponse | null
}

const initialState: userState = { user: null }

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userResponse>) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        }
    }
})

export const selectUser = (state: RootState) => state.user.user
export const selectIsLoggedIn = (state: RootState) => state.user.user !== null

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
