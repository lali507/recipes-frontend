import { useSearchParams } from "react-router"
import type { Difficulty, KosherType, RecipeFilters, RecipeSort } from "../types/recipe"

export const toPositiveInt = (value: string | null) => {
    const num = Number(value)
    return value && Number.isInteger(num) && num > 0 ? num : undefined
}

const oneOf = <T extends string>(value: string | null, allowed: readonly T[]) =>
    allowed.includes(value as T) ? (value as T) : undefined

const difficulties: Difficulty[] = ["EASY", "MEDIUM", "HARD"]
const kosherTypes: KosherType[] = ["MEAT", "DAIRY", "PAREVE"]
const sorts: RecipeSort[] = ["newest", "oldest", "prepTime", "title"]

const useRecipeFilters = () => {
    const [searchParams] = useSearchParams()

    const filters: RecipeFilters = {
        search: searchParams.get("search") || undefined,
        categoryId: toPositiveInt(searchParams.get("categoryId")),
        authorId: toPositiveInt(searchParams.get("authorId")),
        difficulty: oneOf(searchParams.get("difficulty"), difficulties),
        kosherType: oneOf(searchParams.get("kosherType"), kosherTypes),
        maxPrepTime: toPositiveInt(searchParams.get("maxPrepTime")),
        sort: oneOf(searchParams.get("sort"), sorts),
        page: toPositiveInt(searchParams.get("page")),
    }
    return filters
}
export default useRecipeFilters
