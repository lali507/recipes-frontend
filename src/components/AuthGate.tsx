
import { useEffect } from "react"
import { useMeQuery } from "../store/api/authApi"
import type { ReactNode } from "react"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { selectUser, setUser } from "../store/state/userSlice"

const AuthGate= ({children}:{children:ReactNode})=>{

    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const token = localStorage.getItem("token")
    const{isSuccess,isLoading,data} =  useMeQuery(undefined,{skip:!token})

    useEffect(()=>{
      if(isSuccess && token)
      {
        dispatch(setUser(data.user))
      }
    },[isSuccess,data,token,dispatch])

    if(isLoading || (token && isSuccess && !user))
      return <p>טוען...</p>

    return children
}
export default AuthGate
