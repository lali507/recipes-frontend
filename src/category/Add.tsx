import { useState, type FormEvent } from "react"
import MyButton from "../components/form/Button"
import { useAddCategoryMutation } from "../store/api/categoryApi"
import type { errResponse } from "../types/eror"
import { useAppDispatch } from "../store/hook"
import { showToast } from "../store/state/toastSlice"


const AddCategory = ()=>{
    const [addFn, { isLoading: isSaving }]=useAddCategoryMutation()
    const dispatch = useAppDispatch()
    const [name,setName] = useState("")
    const [eror,setEror] = useState("")

    const  Add = async(e: FormEvent)=>{
     e.preventDefault()
     setEror("")
     const trimmed = name.trim()
     if (trimmed.length < 2 || trimmed.length > 40) {
        setEror("השם חייב להכיל בין 2 ל-40 תווים")
        return
     }
     try{
     await addFn({name: trimmed}).unwrap()
     setName("")
     dispatch(showToast(`הקטגוריה "${trimmed}" נוספה בהצלחה`))
     }
     catch(e){
        const err = (e as { data?: errResponse }).data?.error
        setEror(err?.code === "CATEGORY_NAME_TAKEN" ? "קטגוריה בשם הזה כבר קיימת" : err?.details?.[0]?.message ?? err?.message ?? "ההוספה נכשלה")
     }

    }

    return(
        <form onSubmit={Add}>
        <h2>הוספת קטגוריה</h2>
        <input value={name} onChange={({target})=>setName(target.value)} placeholder="שם הקטגוריה החדשה" aria-label="שם הקטגוריה החדשה" maxLength={40}></input>
        {eror && <p role="alert">{eror}</p>}
        <MyButton text={isSaving?"מוסיף...":"הוספת קטגוריה"} type="submit" disabled={isSaving}></MyButton>
        </form>
    )
}
export default AddCategory
