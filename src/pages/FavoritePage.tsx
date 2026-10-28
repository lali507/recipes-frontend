import { Link, useSearchParams } from "react-router"
import ShowPromise from "../components/showPromise"
import { useGetFavoritesQuery } from "../store/api/favoriteApi"
import { toPositiveInt } from "../hooks/useRecipeFilters"
import RecipeList from "../recipe/show"
import Paging from "../recipe/paging"

// למועדפים אין סינון - רק עמודים
const FavoritePage = () => {
    const [searchParams] = useSearchParams()
    const page = toPositiveInt(searchParams.get("page")) ?? 1

    // isLoading - רק בטעינה הראשונה. isFetching - בכל בקשה, גם במעבר עמוד
    const { data, isLoading, isFetching, isError, error } = useGetFavoritesQuery({ page })
    const recipes = data?.items
    const isSearching = isFetching && !isLoading

    return (<>
        <h2>המועדפים שלי</h2>
        <ShowPromise isLoading={isLoading} isError={isError} eror={error} />

        {/* aria-live - קורא מסך יקריא את ההודעה כשהיא מופיעה */}
        <p aria-live="polite">
            {isSearching && "טוען..."}
            {/* total ולא items - בעמוד שכבר לא קיים items ריק, אבל יש מתכונים בעמודים אחרים */}
            {!isFetching && data?.pagination.total === 0 &&
                <>עדיין אין מתכונים במועדפים. <Link to="/recipes">לכל המתכונים</Link></>}
        </p>

        {/* לחיצה על הלב כאן מסירה מהמועדפים - הרשימה נטענת מחדש והמתכון נעלם */}
        <RecipeList recipes={recipes} isSearching={isSearching} />
        {data && <Paging pagination={data.pagination} />}
    </>)
}
export default FavoritePage;
