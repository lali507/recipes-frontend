
import { Link } from "react-router"
import { useAppSelector } from "../store/hook"
import { selectIsLoggedIn, selectUser } from "../store/state/userSlice"
import Exit from "./exit"
import Logo from "./Logo"


const Header = () => {

    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const isAdmin = useAppSelector(selectUser)?.role === "ADMIN"



    if(isLoggedIn)
        return <header>
            <Logo></Logo>
            <nav>

             <Link to="">דף הבית</Link>


             <Link to="recipes">כל המתכונים</Link>

             <Link to ="my-recipes">המתכונים שלי</Link>
             <Link to = "favorites">המועדפים</Link>
             {isAdmin && <Link to="admin/categories">ניהול קטגוריות</Link>}
             <Exit />
             </nav>

        </header>
    return <header >
         <Logo></Logo>
         <nav>
        <Link to="">דף הבית</Link>

        <Link to="register">הרשמה </Link>
        <Link to="login">התחברות </Link>
        </nav>



    </header>
}

export default Header