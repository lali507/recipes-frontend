import { useNavigate } from "react-router";
import { useAppDispatch } from "../store/hook";
import { logout } from "../store/state/userSlice";
import { apiSlice } from "../store/api/apiSlice";
import MyButton from "./form/Button";

 const Exit=()=>
{
    // hooks רק בתוך הקומפוננטה עצמה
    const dispatch = useAppDispatch()
    const nav = useNavigate()

    const delToken=async()=>{
        // קודם לדף הבית (await - מחכים שהמעבר יסתיים) - אחרת דף מוגן יפנה להתחברות כאילו פג התוקף
        await nav("/")
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
