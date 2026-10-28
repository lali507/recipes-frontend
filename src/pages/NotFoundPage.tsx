import { Link } from "react-router"

const NotFoundPage = ()=>{
    return <div>
        <h1>404 - העמוד לא קיים</h1>
        <p>ייתכן שהקישור שגוי או שהעמוד הוסר.</p>
        <Link to="/">חזרה לדף הבית</Link>
    </div>
}
export default NotFoundPage;
