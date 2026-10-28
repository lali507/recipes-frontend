import { Link } from "react-router"
import { buttonClass } from "../components/form/styles"

const ForbiddenPage = () => {
    return <div className="mx-auto max-w-lg py-16 text-center motion-safe:animate-fade-up">
        <span aria-hidden="true" className="inline-block text-7xl motion-safe:animate-float">🔐</span>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-ink">אין הרשאה</h1>
        <p className="mt-3 text-cocoa">אין לך הרשאה מתאימה לצפות בדף הזה.</p>
        <Link to="/" className={`${buttonClass("primary", "lg")} mt-8`}>חזרה לדף הבית</Link>
    </div>
}
export default ForbiddenPage;
