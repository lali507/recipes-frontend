import { Link, useSearchParams } from "react-router"
import ShowPromise from "../components/showPromise"
import { useGetMyRecipesQuery } from "../store/api/recipeSlice"
import useRecipeFilters from "../hooks/useRecipeFilters"
import RecipeFiltersBar from "../recipe/RecipeFilters"
import RecipeList from "../recipe/show"
import Paging from "../recipe/paging"

const PrivateRecipesPage = () => {
    const filters = useRecipeFilters()

    const [searchParams] = useSearchParams()
    const isPublicParam = searchParams.get("isPublic")
    const isPublic = isPublicParam ? isPublicParam === "true" : undefined

    const { data, isLoading, isFetching, isError, error } = useGetMyRecipesQuery({ ...filters, isPublic })
    const recipes = data?.items
    const isSearching = isFetching && !isLoading
    const search = filters.search
    const hasFilters = [...searchParams.keys()].some((key) => key !== "page")

    return (<>
        <h2>המתכונים שלי</h2>
        <Link to="/recipes/new">+ מתכון חדש</Link>
        <RecipeFiltersBar showVisibility />
        <ShowPromise isLoading={isLoading} isError={isError} eror={error} />

        <p aria-live="polite">
            {isSearching && "מחפש..."}
            {!isFetching && data?.pagination.total === 0 &&
                (search ? `לא נמצאו מתכונים עבור "${search}"`
                    : hasFilters ? "לא נמצאו מתכונים שמתאימים לסינון"
                    : <>עדיין לא הוספת מתכונים. <Link to="/recipes/new">להוספת המתכון הראשון</Link></>)}
        </p>

        <RecipeList recipes={recipes} isSearching={isSearching} />
        {data && <Paging pagination={data.pagination} />}
    </>)
}
export default PrivateRecipesPage;
