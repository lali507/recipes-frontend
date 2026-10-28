import { Navigate, useSearchParams } from "react-router"
import type { Pagination } from "../types/paging"

const pageButton = "inline-flex cursor-pointer items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ring-1 ring-brand-100 transition hover:bg-brand-50 hover:text-brand-700 disabled:pointer-events-none disabled:opacity-40"

const Paging = ({ pagination }: { pagination: Pagination }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { page, totalPages } = pagination

    const pageUrl = (newPage: number) => {
        const next = new URLSearchParams(searchParams)
        if (newPage === 1) next.delete("page")
        else next.set("page", String(newPage))
        return next
    }

    const lastPage = Math.max(totalPages, 1)
    if (page > lastPage) return <Navigate to={`?${pageUrl(lastPage)}`} replace />

    if (totalPages <= 1) return null

    return (
        <nav aria-label="מעבר בין עמודים" className="mt-10 flex items-center justify-center gap-3">
            <button type="button" className={pageButton} disabled={page === 1} onClick={() => setSearchParams(pageUrl(page - 1))}>→ הקודם</button>
            <span className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">עמוד {page} מתוך {totalPages}</span>
            <button type="button" className={pageButton} disabled={page === totalPages} onClick={() => setSearchParams(pageUrl(page + 1))}>הבא ←</button>
        </nav>
    )
}
export default Paging
