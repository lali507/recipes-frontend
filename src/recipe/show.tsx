import { Link, useLocation } from "react-router"
import type { Recipe } from "../types/recipe"
import FavoriteButton from "./FavoriteButton"

interface RecipeListProps {
    recipes?: Recipe[]
    isSearching?: boolean
}

const RecipeList = ({ recipes, isSearching }: RecipeListProps) => {
    const location = useLocation()
    const from = location.pathname + location.search

    return (
        <ul style={{ opacity: isSearching ? 0.5 : 1 }}>
            {recipes?.map((recipe) => (
                <li key={recipe.id}>
                    <Link to={`/recipes/${recipe.id}`} state={{ from }}>
                        {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} width={200} />}
                        <h3>{recipe.title}</h3>
                    </Link>
                    <p>{recipe.description}</p>
                    <p>
                        {recipe.category.name} · {recipe.prepTimeMinutes} דקות
                        {recipe.isOwner && (recipe.isPublic ? " · ציבורי" : " · פרטי")}
                    </p>
                    <FavoriteButton recipeId={recipe.id} isFavorite={recipe.isFavorite} />
                </li>
            ))}
        </ul>
    )
}
export default RecipeList;
