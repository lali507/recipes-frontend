import { Link, useLocation } from "react-router"
import type { Recipe } from "../types/recipe"
import FavoriteButton from "./FavoriteButton"

interface RecipeListProps {
    // undefined עד שהתשובה מגיעה מהשרת
    recipes?: Recipe[]
    // בזמן חיפוש התוצאות הישנות נשארות, אבל חיוורות
    isSearching?: boolean
}

// רק מציגה רשימה - לא יודעת מאיפה המתכונים הגיעו, אז אפשר להשתמש בה בכל דף
const RecipeList = ({ recipes, isSearching }: RecipeListProps) => {
    // הכתובת הנוכחית כולל סינון ועמוד, למשל /my-recipes?page=2
    const location = useLocation()
    const from = location.pathname + location.search

    return (
        <ul style={{ opacity: isSearching ? 0.5 : 1 }}>
            {recipes?.map((recipe) => (
                <li key={recipe.id}>
                    {/* state עובר לדף המתכון בלי להופיע ב-URL - כדי שיידע לאן לחזור */}
                    <Link to={`/recipes/${recipe.id}`} state={{ from }}>
                        {/* imageUrl הוא null כשאין תמונה */}
                        {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} width={200} />}
                        <h3>{recipe.title}</h3>
                    </Link>
                    <p>{recipe.description}</p>
                    <p>
                        {recipe.category.name} · {recipe.prepTimeMinutes} דקות
                        {/* ציבורי/פרטי מעניין רק את היוצרת - מתכון של אחרים תמיד ציבורי */}
                        {recipe.isOwner && (recipe.isPublic ? " · ציבורי" : " · פרטי")}
                    </p>
                    {/* מחוץ ל-Link - כדי שלחיצה על הלב לא תפתח את המתכון */}
                    <FavoriteButton recipeId={recipe.id} isFavorite={recipe.isFavorite} />
                </li>
            ))}
        </ul>
    )
}
export default RecipeList;
