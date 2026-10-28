import type { ReactNode } from "react";
import type { Difficulty, KosherType, Recipe } from "../types/recipe";
import VisibilityBadge from "./VisibilityBadge";
import RecipeImage from "./RecipeImage";
import { formatDate, formatDateTime } from "../utils/date";

const difficultyText: Record<Difficulty, string> = { EASY: "קל", MEDIUM: "בינוני", HARD: "קשה" }
const kosherText: Record<KosherType, string> = { MEAT: "בשרי", DAIRY: "חלבי", PAREVE: "פרווה" }

const Fact = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-brand-100">
        <span aria-hidden="true" className="text-2xl">{icon}</span>
        <div>
            <div className="text-xs text-cocoa">{label}</div>
            <div className="font-bold text-ink">{value}</div>
        </div>
    </div>
)

const RecipeItem = ({ recipe, actions }: { recipe: Recipe; actions?: ReactNode }) => {
    const ingredients = recipe.ingredients.split("\n").filter((line) => line.trim() !== "")
    const steps = recipe.instructions.split("\n").map((line) => line.trim().replace(/^\d+[.)]\s*/, "")).filter((line) => line !== "")
    const wasUpdated = new Date(recipe.updatedAt).getTime() - new Date(recipe.createdAt).getTime() > 60_000

    return (
        <article className="motion-safe:animate-fade-up">
            {recipe.imageUrl
                ? <div className="relative overflow-hidden rounded-[2rem] shadow-lg shadow-brand-200/40 ring-1 ring-brand-100">
                    <RecipeImage recipe={recipe} className="aspect-[16/9] max-h-[460px] w-full sm:aspect-[21/9]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
                        <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-semibold backdrop-blur">{recipe.category.name}</span>
                        <h1 className="mt-3 font-display text-3xl font-extrabold drop-shadow sm:text-5xl">{recipe.title}</h1>
                        <p className="mt-2 max-w-2xl text-white/90 sm:text-lg">{recipe.description}</p>
                    </div>
                </div>
                : <div className="relative isolate flex items-center gap-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-50 via-white to-brand-100 p-6 shadow-sm ring-1 ring-brand-100 sm:p-10">
                    <div aria-hidden="true" className="absolute -top-16 -end-16 -z-10 size-64 rounded-full bg-brand-200/50 blur-3xl" />
                    <div className="flex-1">
                        <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-700">{recipe.category.name}</span>
                        <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-5xl">{recipe.title}</h1>
                        <p className="mt-2 max-w-2xl text-cocoa sm:text-lg">{recipe.description}</p>
                    </div>
                    <RecipeImage recipe={recipe} className="hidden size-36 shrink-0 rounded-3xl shadow-inner sm:grid" />
                </div>}

            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-cocoa">
                    <span className="flex items-center gap-2 font-semibold text-ink">
                        <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 font-bold text-white">{recipe.author.name.charAt(0)}</span>
                        מאת: {recipe.author.name}
                    </span>
                    <time dateTime={recipe.createdAt} title={formatDateTime(recipe.createdAt)}>פורסם: {formatDate(recipe.createdAt)}</time>
                    {wasUpdated && <time dateTime={recipe.updatedAt} title={formatDateTime(recipe.updatedAt)}>עודכן: {formatDate(recipe.updatedAt)}</time>}
                    {recipe.isOwner && <VisibilityBadge isPublic={recipe.isPublic ?? false} />}
                </div>
                {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Fact icon="⏱" label="זמן הכנה" value={`${recipe.prepTimeMinutes} דקות`} />
                <Fact icon="🍽️" label="מנות" value={String(recipe.servings)} />
                <Fact icon="📊" label="רמת קושי" value={difficultyText[recipe.difficulty]} />
                <Fact icon="🥄" label="סוג תפריט" value={kosherText[recipe.kosherType]} />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
                <section aria-labelledby="ingredients-title" className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-100 sm:p-8 lg:sticky lg:top-24">
                    <h2 id="ingredients-title" className="mb-1 flex items-center gap-2 font-display text-2xl font-bold text-ink">
                        <span aria-hidden="true">🧺</span> רכיבים
                    </h2>
                    <p className="mb-4 text-xs text-cocoa">אפשר לסמן כל רכיב שכבר הוכן</p>
                    <ul className="space-y-1">
                        {ingredients.map((line, index) => (
                            <li key={index}>
                                <label className="flex cursor-pointer items-start gap-3 rounded-xl px-2 py-2 transition hover:bg-brand-50 has-[:checked]:text-cocoa has-[:checked]:line-through">
                                    <input type="checkbox" className="mt-1 size-4 shrink-0 cursor-pointer accent-brand-600" />
                                    <span>{line}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </section>

                <section aria-labelledby="steps-title" className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-100 sm:p-8">
                    <h2 id="steps-title" className="mb-5 flex items-center gap-2 font-display text-2xl font-bold text-ink">
                        <span aria-hidden="true">👩‍🍳</span> אופן ההכנה
                    </h2>
                    <ol className="space-y-5">
                        {steps.map((step, index) => (
                            <li key={index} className="flex gap-4">
                                <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-100 font-display font-bold text-brand-700">{index + 1}</span>
                                <p className="pt-1.5 leading-relaxed">{step}</p>
                            </li>
                        ))}
                    </ol>
                </section>
            </div>
        </article>
    )
}
export default RecipeItem
