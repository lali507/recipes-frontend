import { Link } from "react-router"
import ShowPromise from "../components/showPromise"
import { useGetRecipesQuery } from "../store/api/recipeSlice"
import useRecipeFilters from "../hooks/useRecipeFilters"
import RecipeFiltersBar from "../recipe/RecipeFilters"
import RecipeList from "../recipe/show"
import Paging from "../recipe/paging"

const PublicRecipesPage = () => {
    const filters = useRecipeFilters()

    const { data, isLoading, isFetching, isError, error } = useGetRecipesQuery(filters)
    const recipes = data?.items
    const isSearching = isFetching && !isLoading
    const search = filters.search

    return (<>
        <h2>המתכונים המשותפים</h2>
        <p style={{
            maxWidth: 640, margin: "0 auto 16px", padding: "12px 16px",
            borderRadius: 12, background: "#FFF4EC", border: "1px solid #F3D9C8",
        }}>
            🌐 כאן מופיעים המתכונים שהמשתמשים בחרו לשתף עם כולם.
            {" "}🔒 מתכונים פרטיים, גם שלך, לא מוצגים ברשימה זו.
            {" "}<Link to="/my-recipes">לכל המתכונים שלי, כולל הפרטיים</Link>
        </p>
        <RecipeFiltersBar showAuthor />
        <ShowPromise isLoading={isLoading} isError={isError} eror={error} />

        <p aria-live="polite">
            {isSearching && "מחפש..."}
            {!isFetching && data?.pagination.total === 0 &&
                (search ? `לא נמצאו מתכונים עבור "${search}"` : "לא נמצאו מתכונים")}
        </p>

        <RecipeList recipes={recipes} isSearching={isSearching} />
        {data && <Paging pagination={data.pagination} />}
    </>)
}
export default PublicRecipesPage;
