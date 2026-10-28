import { useSearchParams } from "react-router"
import type { Difficulty, KosherType, RecipeFilters, RecipeSort } from "../types/recipe"

// custom hook - פונקציה רגילה שמותר לקרוא בה ל-hooks אחרים
// בונה את הסינון מה-URL, כדי שכל הדפים עם רשימת מתכונים ישתמשו באותו קוד
const useRecipeFilters = () => {
    // פירוק המערך - צריך רק את הערכים, לא את פונקציית העדכון
    const [searchParams] = useSearchParams()

    // get מחזיר תמיד string או null. מספרים ממירים עם Number, ו-null הופך ל-undefined כדי שלא יישלח
    const categoryId = searchParams.get("categoryId")
    const maxPrepTime = searchParams.get("maxPrepTime")
    const page = searchParams.get("page")
    const filters: RecipeFilters = {
        search: searchParams.get("search") ?? undefined,
        categoryId: categoryId ? Number(categoryId) : undefined,
        difficulty: (searchParams.get("difficulty") as Difficulty) ?? undefined,
        kosherType: (searchParams.get("kosherType") as KosherType) ?? undefined,
        maxPrepTime: maxPrepTime ? Number(maxPrepTime) : undefined,
        sort: (searchParams.get("sort") as RecipeSort) ?? undefined,
        page: page ? Number(page) : undefined,
    }
    return filters
}
export default useRecipeFilters
