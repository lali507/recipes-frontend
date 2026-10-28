import { useSearchParams } from "react-router"
import { useForm } from "react-hook-form"
import { useGetCategoriesQuery } from "../store/api/categoryApi"
import type { Difficulty, KosherType, RecipeSort } from "../types/recipe"
import MyButton from "../components/form/Button"
import FormField from "../components/form/formField"


const difficultyText: Record<Difficulty, string> = { EASY: "קל", MEDIUM: "בינוני", HARD: "קשה" }
const kosherText: Record<KosherType, string> = { MEAT: "בשרי", DAIRY: "חלבי", PAREVE: "פרווה" }
const sortText: Record<RecipeSort, string> = { newest: "מהחדש לישן", oldest: "מהישן לחדש", prepTime: "זמן הכנה", title: "לפי שם" }
const timePrep: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]

// showVisibility - סינון ציבורי/פרטי, רק בדף המתכונים שלי (ל-/recipes אין פרמטר כזה)
const RecipeFilters = ({ showVisibility = false }: { showVisibility?: boolean }) => {
    // הנתונים של RTK Query תמיד ב-data - משנים את השם ל-categories
    const { data: categories } = useGetCategoriesQuery()
    const [searchParams, setSearchParams] = useSearchParams()

    // react-hook-form שומר את ערך החיפוש - לא צריך useState
    // הערך ההתחלתי מה-URL, כדי שהחיפוש יישאר אחרי רענון
    const { register, handleSubmit } = useForm({
        defaultValues: { search: searchParams.get("search") ?? "" },
    })

    // מעדכנת פרמטר אחד ב-URL. ערך ריק = מוחקים את הפרמטר
    const setParam = (key: string, value: string) => {
        const next = new URLSearchParams(searchParams)
        if (value) next.set(key, value)
        else next.delete(key)
        // סינון חדש = חוזרים לעמוד הראשון, אחרת אפשר לקבל עמוד ריק
        next.delete("page")
        setSearchParams(next)
    }

    // handleSubmit כבר עושה preventDefault ומעביר את ערכי הטופס ב-data
    const onSearch = (data: { search: string }) => setParam("search", data.search.trim())

    return (
        <>
            {/* חיפוש - נשלח רק ב-Enter או בלחיצה על הכפתור, לא בכל הקלדה */}
            <form onSubmit={handleSubmit(onSearch)}>
                <FormField
                    label="חיפוש"
                    type="text"
                    registration={register("search", {
        onChange: (e) => {
            if (e.target.value.trim() === "") setParam("search", "")
        },
    })}
                    placeholder="חפש לפי שם, תיאור או רכיבים"
                />
                {/* ברירת המחדל של MyButton היא "button" - צריך submit כדי שהטופס יישלח */}
                <MyButton text="חפש" type="submit" />
            </form>

            {/* קטגוריות - מערך מהשרת, אפשר map ישירות */}
            <select
                value={searchParams.get("categoryId") ?? ""}
                onChange={(e) => setParam("categoryId", e.target.value)}
            >
                <option value="">כל הקטגוריות</option>
                {/* categories הוא undefined עד שהתשובה מגיעה, לכן ?. */}
                {categories?.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>

            {/* רמת קושי - Record הוא אובייקט, Object.entries הופך אותו למערך [מפתח, ערך] */}
            <select
                value={searchParams.get("difficulty") ?? ""}
                onChange={(e) => setParam("difficulty", e.target.value)}
            >
                <option value="">כל הרמות</option>
                {Object.entries(difficultyText).map(([key, text]) => (
                    <option key={key} value={key}>{text}</option>
                ))}
            </select>

            {/* כשרות - בדיוק כמו רמת קושי */}
            <select
                value={searchParams.get("kosherType") ?? ""}
                onChange={(e) => setParam("kosherType", e.target.value)}
            >
                <option value="">כל סוגי התפריט</option>
                {Object.entries(kosherText).map(([key, text]) => (
                    <option key={key} value={key}>{text}</option>
                ))}
            </select>
            {/* זמן הכנה - מערך רגיל, אפשר map ישירות. שם הפרמטר חייב להיות כמו בשרת */}
            <select
                value={searchParams.get("maxPrepTime") ?? ""}
                onChange={(e) => setParam("maxPrepTime", e.target.value)}
            >
                <option value="">כל זמן הכנה</option>
                {timePrep.map((minutes) => (
                    <option key={minutes} value={minutes}>עד {minutes} דקות</option>
                ))}
            </select>

            {/* מיון - כמו רמת קושי. בלי בחירה השרת ממיין מהחדש לישן */}
            <select
                value={searchParams.get("sort") ?? ""}
                onChange={(e) => setParam("sort", e.target.value)}
            >
                <option value="">מיון</option>
                {Object.entries(sortText).map(([key, text]) => (
                    <option key={key} value={key}>{text}</option>
                ))}
            </select>

            {/* ציבורי/פרטי - ב-URL נשמר כמחרוזת "true"/"false", ההמרה ל-boolean בדף */}
            {showVisibility && (
                <select
                    value={searchParams.get("isPublic") ?? ""}
                    onChange={(e) => setParam("isPublic", e.target.value)}
                >
                    <option value="">כל המתכונים שלי</option>
                    <option value="true">ציבוריים</option>
                    <option value="false">פרטיים</option>
                </select>
            )}
        </>
    )
}
export default RecipeFilters
