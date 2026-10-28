import ShowPromise from "../components/showPromise"
import { useGetRecipesQuery } from "../store/api/recipeSlice"
import useRecipeFilters from "../hooks/useRecipeFilters"
import RecipeFiltersBar from "../recipe/RecipeFilters"
import RecipeList from "../recipe/show"
import Paging from "../recipe/paging"

// הדף מחזיק את הקריאה לשרת, ומעביר לכל קומפוננטה רק את מה שהיא צריכה
const PublicRecipesPage = () => {
    // הסינון נבנה מה-URL ב-hook משותף לשני הדפים
    const filters = useRecipeFilters()

    // isLoading - רק בטעינה הראשונה. isFetching - בכל בקשה, גם כשמשנים סינון או עמוד
    const { data, isLoading, isFetching, isError, error } = useGetRecipesQuery(filters)
    // data הוא undefined עד שהתשובה מגיעה, לכן ?.
    const recipes = data?.items
    // חיפוש חוזר: יש כבר תוצאות ישנות על המסך, והחדשות עוד לא הגיעו
    const isSearching = isFetching && !isLoading
    const search = filters.search

    return (<>
        <h2>כל המתכונים</h2>
        <RecipeFiltersBar />
        <ShowPromise isLoading={isLoading} isError={isError} eror={error} />

        {/* aria-live - קורא מסך יקריא את ההודעה כשהיא מופיעה */}
        <p aria-live="polite">
            {isSearching && "מחפש..."}
            {/* רק אחרי שהתשובה הגיעה - אחרת "לא נמצאו" יהבהב בזמן החיפוש */}
            {/* total ולא items - בעמוד שכבר לא קיים items ריק, אבל יש מתכונים בעמודים אחרים */}
            {!isFetching && data?.pagination.total === 0 &&
                (search ? `לא נמצאו מתכונים עבור "${search}"` : "לא נמצאו מתכונים")}
        </p>

        <RecipeList recipes={recipes} isSearching={isSearching} />
        {data && <Paging pagination={data.pagination} />}
    </>)
}
export default PublicRecipesPage;
