import type { Difficulty, KosherType, Recipe } from "../types/recipe";
import VisibilityBadge from "./VisibilityBadge";
import { formatDate, formatDateTime } from "../utils/date";

const difficultyText: Record<Difficulty, string> = { EASY: "קל", MEDIUM: "בינוני", HARD: "קשה" }
const kosherText: Record<KosherType, string> = { MEAT: "בשרי", DAIRY: "חלבי", PAREVE: "פרווה" }

const RecipeItem = ({ recipe }: { recipe: Recipe }) => {
    const ingredients = recipe.ingredients.split("\n").filter((line) => line.trim() !== "")
    const wasUpdated = new Date(recipe.updatedAt).getTime() - new Date(recipe.createdAt).getTime() > 60_000

    return (
        <article>
            <h2>{recipe.title}</h2>
            {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} width={300} />}
            <p>{recipe.description}</p>

            <p>
                {recipe.category.name} · {recipe.prepTimeMinutes} דקות · {recipe.servings} מנות ·{" "}
                {difficultyText[recipe.difficulty]} · {kosherText[recipe.kosherType]}
                {recipe.isOwner && <> · <VisibilityBadge isPublic={recipe.isPublic ?? false} /></>}
            </p>
            <p>
                מאת: {recipe.author.name}
                {" · "}<time dateTime={recipe.createdAt} title={formatDateTime(recipe.createdAt)}>פורסם: {formatDate(recipe.createdAt)}</time>
                {wasUpdated && <>{" · "}<time dateTime={recipe.updatedAt} title={formatDateTime(recipe.updatedAt)}>עודכן: {formatDate(recipe.updatedAt)}</time></>}
            </p>

            <h3>רכיבים</h3>
            <ul>
                {ingredients.map((line, index) => (
                    <li key={index}>{line}</li>
                ))}
            </ul>

            <h3>אופן ההכנה</h3>
            <p style={{ whiteSpace: "pre-line" }}>{recipe.instructions}</p>
        </article>
    )
}
export default RecipeItem
