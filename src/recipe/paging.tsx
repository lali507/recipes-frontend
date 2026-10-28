import { Navigate, useSearchParams } from "react-router"
import type { Pagination } from "../types/paging"

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
        <nav aria-label="מעבר בין עמודים">
            <button type="button" disabled={page === 1} onClick={() => setSearchParams(pageUrl(page - 1))}>הקודם</button>
            <span> עמוד {page} מתוך {totalPages} </span>
            <button type="button" disabled={page === totalPages} onClick={() => setSearchParams(pageUrl(page + 1))}>הבא</button>
        </nav>
    )
}
export default Paging
