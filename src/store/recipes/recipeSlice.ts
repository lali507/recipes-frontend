import { createAction, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RecipeInput } from "../../../types/recipe"


  


const initialState:RecipeInput[]=[]
const recipeReducer = createSlice({
    name:"recipe",
    initialState,
    reducers:{
        add:(state,action:PayloadAction<RecipeInput>)=>{
            state.push(action.payload)

        },
        update:(state,action:PayloadAction<{recipe:RecipeInput,id:number}>)=>{
            //const find = state.findIndex(a=>a.id==action.payload.id)
            //state[find] = action.payload.recipe

        }
    }

})
export const {add,update}=recipeReducer.actions
export default recipeReducer.reducer