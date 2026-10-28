import { Navigate, Outlet, useLocation } from "react-router"
import { useAppSelector } from "../store/hook"
import { selectUser } from "../store/state/userSlice"
import type { userResponse } from "../types/user"
import ForbiddenPage from "../pages/ForbiddenPage"


const Protected = ({ roles }: { roles: userResponse["role"][] }) => {

    const user = useAppSelector(selectUser)
    const location = useLocation()

    if (!user)
        return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />

    if (!roles.includes(user.role))
        return <ForbiddenPage />

    return <Outlet/>
}

export default Protected
