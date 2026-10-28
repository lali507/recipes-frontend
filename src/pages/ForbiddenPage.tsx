import { Link } from "react-router"

// מוצג כשמשתמשת מחוברת נכנסת לדף שהתפקיד שלה לא מורשה אליו (403)
const ForbiddenPage = ()=>{
    return <div>
        <h1>אין הרשאה</h1>
        <p>אין לך הרשאה מתאימה לצפות בדף הזה.</p>
        <Link to="/">חזרה לדף הבית</Link>
    </div>
}
export default ForbiddenPage;
