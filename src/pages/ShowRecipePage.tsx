import { Link, useLocation, useNavigate, useParams } from "react-router";
import { useDeleteRecipeMutation, useGetRecipeQuery } from "../store/api/recipeSlice";
import RecipeItem from "../recipe/recipeItem";
import ShowPromise from "../components/showPromise";
import FavoriteButton from "../recipe/FavoriteButton";
import { useAppDispatch } from "../store/hook"
import { showToast } from "../store/state/toastSlice"

const ShowRecipePage = ()=>{
    const id = Number(useParams().id)
    const { data: recipe, isLoading, isError, error } = useGetRecipeQuery(id);
    const [deleteFn, { isLoading: isDeleting, isError: isDeleteError, error: deleteError }] = useDeleteRecipeMutation()
    const nav = useNavigate()
    const dispatch = useAppDispatch()

    const location = useLocation()
    const from: string = location.state?.from ?? "/recipes"
    const backText = from.startsWith("/my-recipes") ? "חזרה למתכונים שלי"
        : from.startsWith("/favorites") ? "חזרה למועדפים"
        : "חזרה לרשימת המתכונים"

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
        <ShowPromise isLoading={isLoading} isError={isError} eror={error} />
        {recipe && <RecipeItem recipe={recipe}></RecipeItem>}
        {recipe && <FavoriteButton recipeId={recipe.id} isFavorite={recipe.isFavorite} />}

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
