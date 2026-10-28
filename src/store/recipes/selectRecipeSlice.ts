import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
const initialState = {
    type: [
        { id: 1, name: "ברית" },
        { id: 2, name: "בר מצוה" },
        { id: 3, name: "חתונה" },
        { id: 4, name: "שבת חתן" }

    ],
    lastApdate: new Date(),
    selecteType: 2
}
const selectReducer = createSlice({
    name: "select",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<string>) => {
            console.log(action);
            state.type.push({ id: state.type[state.type.length - 1].id + 1, name: action.payload })
        },
        remove: (state, action: PayloadAction<number>) => {
            console.log(action);
            state.type = state.type.filter(x => x.id != action.payload)
            state.lastApdate = new Date()
        },
        selectedType: (state, action: PayloadAction<number>) => {
            state.selecteType = action.payload
        }

    }

})


export const { add, remove ,selectedType} = selectReducer.actions
export default selectReducer.reducer