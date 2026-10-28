import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { userResponse } from "../../types/user"
import type { RootState } from "../store"

// null = אין משתמשת מחוברת (אורחת)
interface userState {
    user: userResponse | null
}

const initialState: userState = { user: null }

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // אחרי login / register / auth/me
        setUser: (state, action: PayloadAction<userResponse>) => {
            state.user = action.payload
        },
        // התנתקות / 401
        logout: (state) => {
            state.user = null
        }
    }
})

export const selectUser = (state: RootState) => state.user.user
export const selectIsLoggedIn = (state: RootState) => state.user.user !== null

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
