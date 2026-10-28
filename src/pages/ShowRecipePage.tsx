import { Link, useLocation, useNavigate, useParams } from "react-router";
import { useDeleteRecipeMutation, useGetRecipeQuery } from "../store/api/recipeSlice";
import RecipeItem from "../recipe/recipeItem";
import ShowPromise from "../components/showPromise";
import FavoriteButton from "../recipe/FavoriteButton";
import { buttonClass } from "../components/form/styles";
import { useAppDispatch } from "../store/hook"
import { showToast } from "../store/state/toastSlice"

const ShowRecipePage = () => {
    const id = Number(useParams().id)
    const { data: recipe, isLoading, isError, error } = useGetRecipeQuery(id);
    const [deleteFn, { isLoading: isDeleting, isError: isDeleteError, error: deleteError }] = useDeleteRecipeMutation()
    const nav = useNavigate()
    const dispatch = useAppDispatch()

    const location = useLocation()
    const from: string = location.state?.from ?? "/recipes"
    const backText = from.startsWith("/my-recipes") ? "חזרה למתכונים שלי"
        : from.startsWith("/favorites") ? "חזרה למועדפים"
            : "חזרה למתכונים המשותפים"

    const onDelete = async () => {
        if (!window.confirm("למחוק את המתכון? אי אפשר לבטל את הפעולה.")) return
        try {
            await deleteFn(id).unwrap()
            dispatch(showToast("המתכון נמחק בהצלחה"))
            nav(from)
        }
        catch {
        }
    }

    return (<>
        <Link to={from} className={`${buttonClass("ghost", "sm")} mb-5`}>→ {backText}</Link>
        <ShowPromise isLoading={isLoading} isError={isError} eror={error} />
        <div className="mb-4"><ShowPromise isLoading={false} isError={isDeleteError} eror={deleteError} /></div>
        {recipe && (
            <RecipeItem recipe={recipe} actions={<>
                <FavoriteButton recipeId={recipe.id} isFavorite={recipe.isFavorite} withLabel />
                {recipe.canEdit && <Link to={`/recipes/${id}/edit`} state={location.state} className={buttonClass("secondary")}>✏️ עריכה</Link>}
                {recipe.canDelete && (
                    <button type="button" onClick={onDelete} disabled={isDeleting} className={buttonClass("danger")}>
                        🗑 {isDeleting ? "מוחק..." : "מחיקה"}
                    </button>
                )}
            </>} />
        )}
    </>)
}
export default ShowRecipePage;
