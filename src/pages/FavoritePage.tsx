import { Link, Navigate, useSearchParams } from "react-router"
import ShowPromise from "../components/showPromise"
import { useGetFavoritesQuery } from "../store/api/favoriteApi"
import RecipeList from "../recipe/show"
import Paging from "../recipe/paging"

// למועדפים אין סינון - רק עמודים
const FavoritePage = () => {
    const [searchParams] = useSearchParams()
    const pageParam = searchParams.get("page")
    const page = pageParam ? Number(pageParam) : 1

    // isLoading - רק בטעינה הראשונה. isFetching - בכל בקשה, גם במעבר עמוד
    const { data, isLoading, isFetching, isError, error } = useGetFavoritesQuery({ page })
    const recipes = data?.items
    const isSearching = isFetching && !isLoading

    // הסרתי את המתכון האחרון בעמוד האחרון - העמוד כבר לא קיים, עוברים לעמוד שלפניו
    const totalPages = data?.pagination.totalPages ?? 0
    if (data && totalPages > 0 && page > totalPages) {
        const next = new URLSearchParams(searchParams)
        next.set("page", String(totalPages))
        return <Navigate to={`?${next}`} replace />
    }

    return (<>
        <h2>המועדפים שלי</h2>
        <ShowPromise isLoading={isLoading} isError={isError} eror={error} />

        {/* aria-live - קורא מסך יקריא את ההודעה כשהיא מופיעה */}
        <p aria-live="polite">
            {isSearching && "טוען..."}
            {!isFetching && recipes?.length === 0 &&
                <>עדיין אין מתכונים במועדפים. <Link to="/recipes">לכל המתכונים</Link></>}
        </p>

        {/* לחיצה על הלב כאן מסירה מהמועדפים - הרשימה נטענת מחדש והמתכון נעלם */}
        <RecipeList recipes={recipes} isSearching={isSearching} />
        {data && <Paging pagination={data.pagination} />}
    </>)
}
export default FavoritePage;
