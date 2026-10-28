import { Navigate, Outlet,  } from "react-router"
import { useAppSelector } from "../store/hook"
import { selectUser } from "../store/state/userSlice"
import type { userResponse } from "../types/user"
import ForbiddenPage from "../pages/ForbiddenPage"


const Protected = ({ roles }: { roles: userResponse["role"][] }) => {
    
    const user = useAppSelector(selectUser)

    if (!user)
        return <Navigate to="/login" />

    if (!roles.includes(user.role))
        return <ForbiddenPage />

    return <Outlet/>
}

export default Protected
