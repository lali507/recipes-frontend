import { Link, useLocation } from "react-router"
import type { Recipe } from "../types/recipe"
import FavoriteButton from "./FavoriteButton"
import VisibilityBadge from "./VisibilityBadge"
import RecipeImage from "./RecipeImage"
import { buttonClass } from "../components/form/styles"
import { formatDate, formatDateTime } from "../utils/date"

interface RecipeListProps {
    recipes?: Recipe[]
    isSearching?: boolean
}

const RecipeList = ({ recipes, isSearching }: RecipeListProps) => {
    const location = useLocation()
    const from = location.pathname + location.search

    return (
        <ul className={`grid gap-6 transition-opacity duration-300 sm:grid-cols-2 lg:grid-cols-3 ${isSearching ? "opacity-50" : "opacity-100"}`}>
            {recipes?.map((recipe) => (
                <li key={recipe.id}
                    className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-200/50 motion-safe:animate-fade-up ${recipe.isOwner
                        ? "ring-2 ring-brand-300"
                        : "ring-1 ring-brand-100"}`}>

                    <Link to={`/recipes/${recipe.id}`} state={{ from }} tabIndex={-1} aria-hidden="true" className="block overflow-hidden">
                        <RecipeImage recipe={recipe} className="aspect-[4/3] w-full transition duration-500 group-hover:scale-105" />
                    </Link>

                    {recipe.isOwner && (
                        <span className="absolute top-3 start-3 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                            ✏️ המתכון שלי
                        </span>
                    )}
                    <div className="absolute top-3 end-3">
                        <FavoriteButton recipeId={recipe.id} isFavorite={recipe.isFavorite} />
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
                            <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-brand-700">{recipe.category.name}</span>
                            <span className="text-cocoa">⏱ {recipe.prepTimeMinutes} דקות</span>
                            {recipe.isOwner && <VisibilityBadge isPublic={recipe.isPublic ?? false} />}
                        </div>

                        <h3 className="font-display text-xl font-bold leading-snug text-ink">
                            <Link to={`/recipes/${recipe.id}`} state={{ from }} className="transition hover:text-brand-600">{recipe.title}</Link>
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-cocoa">{recipe.description}</p>

                        <div className="mt-4 flex items-center justify-between gap-2 border-t border-brand-50 pt-4 text-xs text-cocoa">
                            {recipe.isOwner
                                ? <span className="font-semibold text-brand-700">שלי</span>
                                : <span className="flex items-center gap-1.5 font-semibold text-ink">
                                    <span aria-hidden="true" className="grid size-6 place-items-center rounded-full bg-brand-100 text-[11px] font-bold text-brand-700">{recipe.author.name.charAt(0)}</span>
                                    מאת: {recipe.author.name}
                                </span>}
                            <time dateTime={recipe.createdAt} title={formatDateTime(recipe.createdAt)}>פורסם: {formatDate(recipe.createdAt)}</time>
                        </div>

                        <Link to={`/recipes/${recipe.id}`} state={{ from }} aria-label={`לצפייה במתכון המלא: ${recipe.title}`}
                            className={`${buttonClass("secondary", "md")} mt-4 w-full group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-600`}>
                            לצפייה במתכון המלא ←
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    )
}
export default RecipeList;
