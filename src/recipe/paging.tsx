import { useSearchParams } from "react-router"
import type { Pagination } from "../types/paging"

// מקבלת את pagination מהשרת, ומשנה רק את page ב-URL
const Paging = ({ pagination }: { pagination: Pagination }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { page, totalPages } = pagination

    // מעתיקים את כל הפרמטרים הקיימים, כדי לא לאבד את הסינון
    const goTo = (newPage: number) => {
        const next = new URLSearchParams(searchParams)
        // עמוד 1 הוא ברירת המחדל, אין צורך לשמור אותו ב-URL
        if (newPage === 1) next.delete("page")
        else next.set("page", String(newPage))
        setSearchParams(next)
    }

    // עמוד אחד או אין תוצאות: אין מה להציג
    if (totalPages <= 1) return null

    return (
        <nav aria-label="מעבר בין עמודים">
            <button disabled={page === 1} onClick={() => goTo(page - 1)}>הקודם</button>
            <span> עמוד {page} מתוך {totalPages} </span>
            <button disabled={page === totalPages} onClick={() => goTo(page + 1)}>הבא</button>
        </nav>
    )
}
export default Paging
