import { Link, useLocation, useParams } from "react-router";
import { useGetRecipeQuery } from "../store/api/recipeSlice";
import ShowPromise from "../components/showPromise";
import EditRecipe from "../recipe/Edit";

const EditRecipePage = ()=>{
    // id מהכתובת הוא מחרוזת - הופכים למספר
    const id = Number(useParams().id)
    const { data: recipe, isLoading, isError, error } = useGetRecipeQuery(id);

    return (<>
        <ShowPromise isLoading={isLoading} isError={isError} eror={error} />
        {/* מי שהגיעה ישר לכתובת של מתכון לא שלה - השרת היה מחזיר 403 בשמירה, אז לא מציגים טופס */}
        {recipe && !recipe.canEdit && <p>אין לך הרשאה לערוך את המתכון הזה.</p>}
        {/* הטופס מוצג רק אחרי שהמתכון נטען - כדי שהערכים ההתחלתיים יהיו מוכנים */}
        {recipe?.canEdit && <EditRecipe recipe={recipe} />}
        {/* state - כדי ש"חזרה" בדף המתכון עדיין יוביל לרשימה המקורית */}
        <Link to={`/recipes/${id}`} state={useLocation().state}>ביטול וחזרה למתכון</Link>
    </>)
}
export default EditRecipePage;
