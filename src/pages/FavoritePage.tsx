import { Link, useSearchParams } from "react-router"
import ShowPromise from "../components/showPromise"
import PageHeader from "../components/PageHeader"
import EmptyState from "../components/EmptyState"
import { buttonClass } from "../components/form/styles"
import { useGetFavoritesQuery } from "../store/api/favoriteApi"
import { toPositiveInt } from "../hooks/useRecipeFilters"
import RecipeList from "../recipe/show"
import Paging from "../recipe/paging"

const FavoritePage = () => {
    const [searchParams] = useSearchParams()
    const page = toPositiveInt(searchParams.get("page")) ?? 1

    const { data, isLoading, isFetching, isError, error } = useGetFavoritesQuery({ page })
    const recipes = data?.items
    const isSearching = isFetching && !isLoading

    return (<>
        <PageHeader icon="❤️" title="המועדפים שלי"
            subtitle={data && data.pagination.total > 0 ? `${data.pagination.total} מתכונים שאהבת, מהאחרון שנשמר` : "כל המתכונים שסימנת בלב"} />
        <ShowPromise isLoading={isLoading} isError={isError} eror={error} />

        <div aria-live="polite">
            {isSearching && <p className="mb-4 text-center text-sm text-cocoa">טוען...</p>}
            {!isFetching && data?.pagination.total === 0 &&
                <EmptyState icon="🤍" title="עדיין אין מתכונים במועדפים">
                    <p>מצאת מתכון שאהבת? לחיצה על הלב תשמור אותו כאן.</p>
                    <Link to="/recipes" className={`${buttonClass("primary")} mt-5`}>למתכונים המשותפים ←</Link>
                </EmptyState>}
        </div>

        <RecipeList recipes={recipes} isSearching={isSearching} />
        {data && <Paging pagination={data.pagination} />}
    </>)
}
export default FavoritePage;
