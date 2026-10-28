import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch } from "../store/hook";
import { logout } from "../store/state/userSlice";
import { apiSlice } from "../store/api/apiSlice";
import MyButton from "./form/Button";

 const Exit=()=>
{
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    const { pathname } = useLocation()
    const [leaving, setLeaving] = useState(false)

    useEffect(()=>{
        if (!leaving || pathname !== "/") return
        localStorage.removeItem("token")
        dispatch(logout())
        dispatch(apiSlice.util.resetApiState())
    },[leaving, pathname, dispatch])

    const delToken=()=>{
        setLeaving(true)
        nav("/")
    }

    return(
        <MyButton text="התנתקות" type="button" onClick={()=>delToken()}
        ></MyButton>
    )
}

export default Exit;
