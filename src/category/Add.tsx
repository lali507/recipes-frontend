import { useState } from "react"
import MyButton from "../components/form/Button"
import { useAddCategoryMutation } from "../store/api/categoryApi"
import type { errResponse } from "../types/eror"


const AddCategory = ()=>{
    const [addFn, { isLoading: isSaving }]=useAddCategoryMutation()
    const [name,setName] = useState("")
    const [eror,setEror] = useState("")

    const  Add = async()=>{

     setEror("")
     try{
     // unwrap() זורק שגיאה אם השרת החזיר שגיאה - בלעדיו לא נגיע ל-catch
     await addFn({name}).unwrap()
     setName("")
     }
     catch(e){
        // שגיאת RTK Query היא לא Error - ההודעה נמצאת ב-data.error
        const err = (e as { data?: errResponse }).data?.error
        setEror(err?.code === "CATEGORY_NAME_TAKEN" ? "קטגוריה בשם הזה כבר קיימת" : err?.message ?? "ההוספה נכשלה")
     }

    }

    return(<>
        <input value={name}onChange={({target})=>setName(target.value)}placeholder="שם הקטוגריה החדשה"></input>
        {eror && <p>{eror}</p>}
        <MyButton text={isSaving?"מוסיף...":"הוספת קטגוריה"} type="submit" onClick={Add}></MyButton>
        </>
    )
}
export default AddCategory
