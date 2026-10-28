import { Link } from "react-router"
import { buttonClass } from "../components/form/styles"

const NotFoundPage = () => {
    return <div className="mx-auto max-w-lg py-16 text-center motion-safe:animate-fade-up">
        <span aria-hidden="true" className="inline-block text-7xl motion-safe:animate-float">🥄</span>
        <p className="mt-4 font-display text-7xl font-extrabold text-brand-200">404</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-ink">העמוד לא קיים</h1>
        <p className="mt-3 text-cocoa">ייתכן שהקישור שגוי או שהעמוד הוסר.</p>
        <Link to="/" className={`${buttonClass("primary", "lg")} mt-8`}>חזרה לדף הבית</Link>
    </div>
}
export default NotFoundPage;
