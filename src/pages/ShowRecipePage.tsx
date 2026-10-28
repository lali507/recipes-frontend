import { Link, useLocation, useNavigate, useParams } from "react-router";
import { useDeleteRecipeMutation, useGetRecipeQuery } from "../store/api/recipeSlice";
import RecipeItem from "../recipe/recipeItem";
import ShowPromise from "../components/showPromise";
import FavoriteButton from "../recipe/FavoriteButton";

const ShowRecipePage = ()=>{
    // id מהכתובת הוא מחרוזת - הופכים למספר
    const id = Number(useParams().id)
    // ה-hook מחזיר אובייקט - המתכון עצמו נמצא ב-data
    const { data: recipe, isLoading, isError, error } = useGetRecipeQuery(id);
    const [deleteFn, { isLoading: isDeleting, isError: isDeleteError, error: deleteError }] = useDeleteRecipeMutation()
    const nav = useNavigate()

    // הרשימה שולחת ב-state את הכתובת שממנה הגיעו (כולל סינון ועמוד)
    // כניסה ישירה מקישור או רענון - אין state, אז חוזרים לכל המתכונים
    const location = useLocation()
    const from: string = location.state?.from ?? "/recipes"
    const backText = from.startsWith("/my-recipes") ? "חזרה למתכונים שלי"
        : from.startsWith("/favorites") ? "חזרה למועדפים"
        : "חזרה לרשימת המתכונים"

    const onDelete = async () => {
        // מחיקה אי אפשר לבטל - מבקשים אישור
        if (!window.confirm("למחוק את המתכון? אי אפשר לבטל את הפעולה.")) return
        try {
            await deleteFn(id).unwrap()
            // המתכון כבר לא קיים - חוזרים לרשימה שממנה הגיעו. הרשימה תתעדכן לבד (invalidatesTags)
            nav(from)
        }
        catch {
            // השגיאה מוצגת ב-ShowPromise למטה
        }
    }

    return (<>
        <ShowPromise isLoading={isLoading} isError={isError} eror={error} />
        {/* data הוא undefined עד שהתשובה מגיעה */}
        {recipe && <RecipeItem recipe={recipe}></RecipeItem>}
        {recipe && <FavoriteButton recipeId={recipe.id} isFavorite={recipe.isFavorite} />}

        {/* השרת מחליט מי רשאי - canEdit רק ליוצרת, canDelete גם למנהל על מתכון ציבורי */}
        {/* state - כדי שאחרי העריכה "חזרה" עדיין יוביל לרשימה המקורית */}
        {recipe?.canEdit && <Link to={`/recipes/${id}/edit`} state={location.state}>עריכה</Link>}
        {recipe?.canDelete && (
            <button type="button" onClick={onDelete} disabled={isDeleting}>
                {isDeleting ? "מוחק..." : "מחיקה"}
            </button>
        )}
        <ShowPromise isLoading={false} isError={isDeleteError} eror={deleteError} />

        <Link to={from}>{backText}</Link>
    </>)
}
export default ShowRecipePage;
