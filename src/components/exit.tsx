import { useAppDispatch } from "../store/hook";
import { logout } from "../store/state/userSlice";
import { apiSlice } from "../store/api/apiSlice";
import MyButton from "./form/Button";

 const Exit=()=>
{
    // hooks רק בתוך הקומפוננטה עצמה
    const dispatch = useAppDispatch()
   

    const delToken=()=>{
        localStorage.removeItem("token")
        dispatch(logout())
        // מוחק את כל המידע השמור ב-cache של המשתמשת שהתנתקה
        dispatch(apiSlice.util.resetApiState())
    }

    return(
        <MyButton text="התנתקות" type="button" onClick={()=>delToken()}
        ></MyButton>
    )
}

export default Exit;
