import { Link, useSearchParams } from "react-router"
import ShowPromise from "../components/showPromise"
import { useGetMyRecipesQuery } from "../store/api/recipeSlice"
import useRecipeFilters from "../hooks/useRecipeFilters"
import RecipeFiltersBar from "../recipe/RecipeFilters"
import RecipeList from "../recipe/show"
import Paging from "../recipe/paging"

// כמו PublicRecipesPage - רק השאילתה שונה: /recipes/mine מחזיר את המתכונים שלי (ציבוריים ופרטיים)
const PrivateRecipesPage = () => {
    // הסינון נבנה מה-URL ב-hook משותף לשני הדפים
    const filters = useRecipeFilters()

    // isPublic קיים רק כאן, לכן הוא לא ב-hook המשותף
    // ב-URL זה "true"/"false", והשרת צריך boolean. בלי פרמטר = undefined = הכול
    const [searchParams] = useSearchParams()
    const isPublicParam = searchParams.get("isPublic")
    const isPublic = isPublicParam ? isPublicParam === "true" : undefined

    // isLoading - רק בטעינה הראשונה. isFetching - בכל בקשה, גם כשמשנים סינון או עמוד
    const { data, isLoading, isFetching, isError, error } = useGetMyRecipesQuery({ ...filters, isPublic })
    // data הוא undefined עד שהתשובה מגיעה, לכן ?.
    const recipes = data?.items
    // חיפוש חוזר: יש כבר תוצאות ישנות על המסך, והחדשות עוד לא הגיעו
    const isSearching = isFetching && !isLoading
    const search = filters.search

    return (<>
        <h2>המתכונים שלי</h2>
        <Link to="/recipes/new">+ מתכון חדש</Link>
        <RecipeFiltersBar showVisibility />
        <ShowPromise isLoading={isLoading} isError={isError} eror={error} />

        {/* aria-live - קורא מסך יקריא את ההודעה כשהיא מופיעה */}
        <p aria-live="polite">
            {isSearching && "מחפש..."}
            {/* רק אחרי שהתשובה הגיעה - אחרת "לא נמצאו" יהבהב בזמן החיפוש */}
            {!isFetching && recipes?.length === 0 &&
                (search ? `לא נמצאו מתכונים עבור "${search}"` : <>עדיין לא הוספת מתכונים. <Link to="/recipes/new">להוספת המתכון הראשון</Link></>)}
        </p>

        <RecipeList recipes={recipes} isSearching={isSearching} />
        {data && <Paging pagination={data.pagination} />}
    </>)
}
export default PrivateRecipesPage;
