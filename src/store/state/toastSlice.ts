import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

interface toastState {
    message: string
    id: number
}

const initialState: toastState = { message: "", id: 0 }

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<string>) => {
            state.message = action.payload
            state.id += 1
        },
        hideToast: (state) => {
            state.message = ""
        }
    }
})

export const selectToast = (state: RootState) => state.toast

export const { showToast, hideToast } = toastSlice.actions
export default toastSlice.reducer
