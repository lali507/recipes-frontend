import { Link, useSearchParams } from "react-router"
import ShowPromise from "../components/showPromise"
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
        <h2>המועדפים שלי</h2>
        <ShowPromise isLoading={isLoading} isError={isError} eror={error} />

        <p aria-live="polite">
            {isSearching && "טוען..."}
            {!isFetching && data?.pagination.total === 0 &&
                <>עדיין אין מתכונים במועדפים. <Link to="/recipes">למתכונים המשותפים</Link></>}
        </p>

        <RecipeList recipes={recipes} isSearching={isSearching} />
        {data && <Paging pagination={data.pagination} />}
    </>)
}
export default FavoritePage;
