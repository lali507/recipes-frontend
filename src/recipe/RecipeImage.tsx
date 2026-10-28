import type { Recipe } from "../types/recipe"

const placeholders = ["🍲", "🥗", "🍰", "🥘", "🍪", "🥧", "🍝", "🥙", "🍞", "🧁"]

const RecipeImage = ({ recipe, className = "" }: { recipe: Pick<Recipe, "id" | "title" | "imageUrl">; className?: string }) =>
    recipe.imageUrl
        ? <img src={recipe.imageUrl} alt={recipe.title} loading="lazy" className={`object-cover ${className}`} />
        : <div role="img" aria-label={`${recipe.title} - אין תמונה`}
            className={`grid place-items-center bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 ${className}`}>
            <span aria-hidden="true" className="text-6xl drop-shadow-sm">{placeholders[recipe.id % placeholders.length]}</span>
        </div>

export default RecipeImage
