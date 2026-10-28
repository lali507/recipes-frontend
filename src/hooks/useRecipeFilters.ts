import { useSearchParams } from "react-router"
import type { Difficulty, KosherType, RecipeFilters, RecipeSort } from "../types/recipe"

// get מחזיר string או null. מספר שלם חיובי - מחזירים אותו, כל דבר אחר (כמו "abc") = undefined
// כך כתובת ששונתה ידנית לא נשלחת לשרת ולא מקבלים שגיאה 400
export const toPositiveInt = (value: string | null) => {
    const num = Number(value)
    return value && Number.isInteger(num) && num > 0 ? num : undefined
}

// מחזיר את הערך רק אם הוא אחד הערכים שהשרת מכיר
const oneOf = <T extends string>(value: string | null, allowed: readonly T[]) =>
    allowed.includes(value as T) ? (value as T) : undefined

const difficulties: Difficulty[] = ["EASY", "MEDIUM", "HARD"]
const kosherTypes: KosherType[] = ["MEAT", "DAIRY", "PAREVE"]
const sorts: RecipeSort[] = ["newest", "oldest", "prepTime", "title"]

// custom hook - פונקציה רגילה שמותר לקרוא בה ל-hooks אחרים
// בונה את הסינון מה-URL, כדי שכל הדפים עם רשימת מתכונים ישתמשו באותו קוד
const useRecipeFilters = () => {
    // פירוק המערך - צריך רק את הערכים, לא את פונקציית העדכון
    const [searchParams] = useSearchParams()

    const filters: RecipeFilters = {
        search: searchParams.get("search") || undefined,
        categoryId: toPositiveInt(searchParams.get("categoryId")),
        difficulty: oneOf(searchParams.get("difficulty"), difficulties),
        kosherType: oneOf(searchParams.get("kosherType"), kosherTypes),
        maxPrepTime: toPositiveInt(searchParams.get("maxPrepTime")),
        sort: oneOf(searchParams.get("sort"), sorts),
        page: toPositiveInt(searchParams.get("page")),
    }
    return filters
}
export default useRecipeFilters
