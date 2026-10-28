import type { CSSProperties } from "react"
import { Link, useLocation } from "react-router"
import type { Recipe } from "../types/recipe"
import FavoriteButton from "./FavoriteButton"
import VisibilityBadge from "./VisibilityBadge"

interface RecipeListProps {
    recipes?: Recipe[]
    isSearching?: boolean
}

const ownCardStyle: CSSProperties = {
    border: "2px solid #FF9A3C",
    background: "#FFF4EC",
    borderRadius: 12,
    padding: 12,
}

const ownLabelStyle: CSSProperties = {
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: 999,
    background: "#E8452C",
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
}

const RecipeList = ({ recipes, isSearching }: RecipeListProps) => {
    const location = useLocation()
    const from = location.pathname + location.search

    return (
        <ul style={{ opacity: isSearching ? 0.5 : 1 }}>
            {recipes?.map((recipe) => (
                <li key={recipe.id} style={recipe.isOwner ? ownCardStyle : undefined}>
                    {recipe.isOwner && <span style={ownLabelStyle}>✏️ המתכון שלי</span>}
                    <Link to={`/recipes/${recipe.id}`} state={{ from }}>
                        {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} width={200} />}
                        <h3>{recipe.title}</h3>
                    </Link>
                    <p>{recipe.description}</p>
                    {!recipe.isOwner && <p>מאת: {recipe.author.name}</p>}
                    <p>{recipe.category.name} · {recipe.prepTimeMinutes} דקות</p>
                    {recipe.isOwner && <p><VisibilityBadge isPublic={recipe.isPublic ?? false} /></p>}
                    <FavoriteButton recipeId={recipe.id} isFavorite={recipe.isFavorite} />
                </li>
            ))}
        </ul>
    )
}
export default RecipeList;
