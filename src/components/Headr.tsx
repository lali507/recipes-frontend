
import { Link } from "react-router"
import { useAppSelector } from "../store/hook"
import { selectIsLoggedIn, selectUser } from "../store/state/userSlice"
import Exit from "./exit"
import Logo from "./Logo"


const Header = () => {

    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const user = useAppSelector(selectUser)
    const isAdmin = user?.role === "ADMIN"



    if(isLoggedIn)
        return <header>
            <Logo></Logo>
            <nav>

             <Link to="">דף הבית</Link>


             <Link to="recipes">מתכונים משותפים</Link>

             <Link to ="my-recipes">המתכונים שלי</Link>
             <Link to = "favorites">המועדפים</Link>
             {isAdmin && <Link to="admin/categories">ניהול קטגוריות</Link>}
             <span title={user?.email} aria-label={`מחוברת בתור ${user?.name}`}
                 style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
                 <span aria-hidden="true" style={{
                     width: 32, height: 32, borderRadius: "50%",
                     display: "inline-grid", placeItems: "center",
                     background: "linear-gradient(135deg, #FF9A3C, #E8452C)", color: "#fff", fontWeight: 800,
                 }}>{user?.name.charAt(0)}</span>
                 {user?.name}
             </span>
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