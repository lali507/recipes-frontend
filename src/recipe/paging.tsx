import { Navigate, useSearchParams } from "react-router"
import type { Pagination } from "../types/paging"

// מקבלת את pagination מהשרת, ומשנה רק את page ב-URL
const Paging = ({ pagination }: { pagination: Pagination }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { page, totalPages } = pagination

    // מעתיקים את כל הפרמטרים הקיימים, כדי לא לאבד את הסינון
    const pageUrl = (newPage: number) => {
        const next = new URLSearchParams(searchParams)
        // עמוד 1 הוא ברירת המחדל, אין צורך לשמור אותו ב-URL
        if (newPage === 1) next.delete("page")
        else next.set("page", String(newPage))
        return next
    }

    // העמוד כבר לא קיים (נמחק המתכון האחרון בעמוד האחרון, או כתובת ששונתה ידנית) - עוברים לעמוד האחרון
    const lastPage = Math.max(totalPages, 1)
    if (page > lastPage) return <Navigate to={`?${pageUrl(lastPage)}`} replace />

    // עמוד אחד או אין תוצאות: אין מה להציג
    if (totalPages <= 1) return null

    return (
        <nav aria-label="מעבר בין עמודים">
            <button type="button" disabled={page === 1} onClick={() => setSearchParams(pageUrl(page - 1))}>הקודם</button>
            <span> עמוד {page} מתוך {totalPages} </span>
            <button type="button" disabled={page === totalPages} onClick={() => setSearchParams(pageUrl(page + 1))}>הבא</button>
        </nav>
    )
}
export default Paging
