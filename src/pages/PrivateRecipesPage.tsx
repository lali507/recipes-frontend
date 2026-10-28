import { Link, useSearchParams } from "react-router"
import ShowPromise from "../components/showPromise"
import PageHeader from "../components/PageHeader"
import EmptyState from "../components/EmptyState"
import { buttonClass } from "../components/form/styles"
import { useGetMyRecipesQuery } from "../store/api/recipeSlice"
import useRecipeFilters from "../hooks/useRecipeFilters"
import RecipeFiltersBar from "../recipe/RecipeFilters"
import RecipeList from "../recipe/show"
import Paging from "../recipe/paging"
import VisibilityBadge from "../recipe/VisibilityBadge"

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
        <PageHeader icon="📒" title="המתכונים שלי"
            subtitle={<span className="flex flex-wrap items-center gap-1.5">
                ליד כל מתכון מסומן מי יכול לראות אותו: <VisibilityBadge isPublic /> כל המשתמשים,
                <VisibilityBadge isPublic={false} /> רק את.
            </span>}
            actions={<Link to="/recipes/new" className={buttonClass("primary")}>+ מתכון חדש</Link>} />
        <RecipeFiltersBar showVisibility />
        <ShowPromise isLoading={isLoading} isError={isError} eror={error} />

        <div aria-live="polite">
            {isSearching && <p className="mb-4 text-center text-sm text-cocoa">מחפש...</p>}
            {!isFetching && data?.pagination.total === 0 &&
                (search ? <EmptyState icon="🔍" title={`לא נמצאו מתכונים עבור "${search}"`}>אפשר לנסות מילה אחרת</EmptyState>
                    : hasFilters ? <EmptyState icon="🧐" title="לא נמצאו מתכונים שמתאימים לסינון">אפשר לשנות או לנקות את הסינון</EmptyState>
                        : <EmptyState icon="📝" title="עדיין לא הוספת מתכונים">
                            <Link to="/recipes/new" className={`${buttonClass("primary")} mt-3`}>להוספת המתכון הראשון</Link>
                        </EmptyState>)}
        </div>

        <RecipeList recipes={recipes} isSearching={isSearching} />
        {data && <Paging pagination={data.pagination} />}
    </>)
}
export default PrivateRecipesPage;
