import type { Difficulty, KosherType, Recipe } from "../types/recipe";

const difficultyText: Record<Difficulty, string> = { EASY: "קל", MEDIUM: "בינוני", HARD: "קשה" }
const kosherText: Record<KosherType, string> = { MEAT: "בשרי", DAIRY: "חלבי", PAREVE: "פרווה" }

const RecipeItem = ({ recipe }: { recipe: Recipe }) => {
    const ingredients = recipe.ingredients.split("\n").filter((line) => line.trim() !== "")

    return (
        <article>
            <h2>{recipe.title}</h2>
            {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} width={300} />}
            <p>{recipe.description}</p>

            <p>
                {recipe.category.name} · {recipe.prepTimeMinutes} דקות · {recipe.servings} מנות ·{" "}
                {difficultyText[recipe.difficulty]} · {kosherText[recipe.kosherType]}
                {recipe.isOwner && (recipe.isPublic ? " · ציבורי" : " · פרטי")}
            </p>
            <p>מאת: {recipe.author.name}</p>

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
