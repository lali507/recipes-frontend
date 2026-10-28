import { Link } from "react-router"
import ShowPromise from "../components/showPromise"
import PageHeader from "../components/PageHeader"
import EmptyState from "../components/EmptyState"
import Alert from "../components/Alert"
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
        <PageHeader icon="🍲" title="המתכונים המשותפים"
            subtitle={data ? `${data.pagination.total} מתכונים שהמשתמשים בחרו לשתף עם כולם` : "מתכונים שהמשתמשים בחרו לשתף עם כולם"} />
        <div className="mb-6">
            <Alert tone="info" icon="🔒">
                מתכונים פרטיים, גם שלך, לא מוצגים ברשימה זו.{" "}
                <Link to="/my-recipes" className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 hover:text-brand-800">לכל המתכונים שלי, כולל הפרטיים</Link>
            </Alert>
        </div>
        <RecipeFiltersBar showAuthor />
        <ShowPromise isLoading={isLoading} isError={isError} eror={error} />

        <div aria-live="polite">
            {isSearching && <p className="mb-4 text-center text-sm text-cocoa">מחפש...</p>}
            {!isFetching && data?.pagination.total === 0 &&
                (search
                    ? <EmptyState icon="🔍" title={`לא נמצאו מתכונים עבור "${search}"`}>אפשר לנסות מילה אחרת או לנקות את הסינון</EmptyState>
                    : <EmptyState icon="🍽️" title="לא נמצאו מתכונים">אפשר לשנות את הסינון</EmptyState>)}
        </div>

        <RecipeList recipes={recipes} isSearching={isSearching} />
        {data && <Paging pagination={data.pagination} />}
    </>)
}
export default PublicRecipesPage;
