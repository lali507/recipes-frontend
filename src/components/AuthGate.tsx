
import { useEffect } from "react"
import { useMeQuery } from "../store/api/authApi"
import type { ReactNode } from "react"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { selectUser, setUser } from "../store/state/userSlice"

const AuthGate= ({children}:{children:ReactNode})=>{

    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const token = localStorage.getItem("token")//take token
    const{isSuccess,isLoading,data} =  useMeQuery(undefined,{skip:!token})//chek the token

    useEffect(()=>{
      if(isSuccess)//is user
      {
        dispatch(setUser(data.user))
      }
    },[isSuccess,data,dispatch])

    // מחכים לתשובה מהשרת - עדיין לא יודעים מי המשתמשת
    // isSuccess בלי user = התשובה הגיעה אבל useEffect עוד לא שמר אותה ב-store
    if(isLoading || (isSuccess && !user))
      return <p>טוען...</p>

    // אין טוקן / הצלחה / שגיאה (הטוקן כבר נמחק ב-apiSlice) - מציגים את האתר
    return children
}
export default AuthGate
