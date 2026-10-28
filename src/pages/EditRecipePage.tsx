import { Link, useLocation, useParams } from "react-router";
import { useGetRecipeQuery } from "../store/api/recipeSlice";
import ShowPromise from "../components/showPromise";
import EditRecipe from "../recipe/Edit";

const EditRecipePage = ()=>{
    const id = Number(useParams().id)
    const { data: recipe, isLoading, isError, error } = useGetRecipeQuery(id);

    return (<>
        <ShowPromise isLoading={isLoading} isError={isError} eror={error} />
        {recipe && !recipe.canEdit && <p>אין לך הרשאה לערוך את המתכון הזה.</p>}
        {recipe?.canEdit && <EditRecipe recipe={recipe} />}
        <Link to={`/recipes/${id}`} state={useLocation().state}>ביטול וחזרה למתכון</Link>
    </>)
}
export default EditRecipePage;
