import { Link, useLocation, useParams } from "react-router";
import { useGetRecipeQuery } from "../store/api/recipeSlice";
import ShowPromise from "../components/showPromise";
import Alert from "../components/Alert";
import { buttonClass } from "../components/form/styles";
import EditRecipe from "../recipe/Edit";

const EditRecipePage = () => {
    const id = Number(useParams().id)
    const { data: recipe, isLoading, isError, error } = useGetRecipeQuery(id);
    const state = useLocation().state

    return (<>
        <div className="mx-auto mb-5 max-w-3xl">
            <Link to={`/recipes/${id}`} state={state} className={buttonClass("ghost", "sm")}>→ ביטול וחזרה למתכון</Link>
        </div>
        <ShowPromise isLoading={isLoading} isError={isError} eror={error} />
        {recipe && !recipe.canEdit && <div className="mx-auto max-w-3xl"><Alert tone="error">אין לך הרשאה לערוך את המתכון הזה.</Alert></div>}
        {recipe?.canEdit && <EditRecipe recipe={recipe} />}
    </>)
}
export default EditRecipePage;
