import { useEffect } from "react"
import { useSearchParams } from "react-router"
import { useForm } from "react-hook-form"
import { useGetCategoriesQuery } from "../store/api/categoryApi"
import { useGetAuthorsQuery } from "../store/api/recipeSlice"
import type { Difficulty, KosherType, RecipeSort } from "../types/recipe"
import MyButton from "../components/form/Button"
import FormField from "../components/form/formField"
import { selectClass } from "../components/form/styles"


const difficultyText: Record<Difficulty, string> = { EASY: "קל", MEDIUM: "בינוני", HARD: "קשה" }
const kosherText: Record<KosherType, string> = { MEAT: "בשרי", DAIRY: "חלבי", PAREVE: "פרווה" }
const sortText: Record<Exclude<RecipeSort, "newest">, string> = { oldest: "מהישן לחדש", prepTime: "זמן הכנה (מהקצר לארוך)", title: "שם המתכון (א-ת)" }
const timePrep: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]

const RecipeFilters = ({ showVisibility = false, showAuthor = false }: { showVisibility?: boolean; showAuthor?: boolean }) => {
    const { data: categories } = useGetCategoriesQuery()
    const { data: authors } = useGetAuthorsQuery(undefined, { skip: !showAuthor })
    const [searchParams, setSearchParams] = useSearchParams()

    const searchParam = searchParams.get("search") ?? ""
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: { search: searchParam },
    })

    useEffect(() => {
        setValue("search", searchParam)
    }, [searchParam, setValue])

    const hasFilters = [...searchParams.keys()].some((key) => key !== "page")

    const setParam = (key: string, value: string) => {
        const next = new URLSearchParams(searchParams)
        if (value) next.set(key, value)
        else next.delete(key)
        next.delete("page")
        setSearchParams(next)
    }

    const filterClass = (key: string) =>
        `${selectClass} py-2.5 text-sm ${searchParams.get(key) ? "border-brand-400 bg-brand-50 font-semibold text-brand-800" : ""}`

    const onSearch = (data: { search: string }) => setParam("search", data.search.trim())

    return (
        <section aria-label="חיפוש וסינון" className="mb-8 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-brand-100 sm:p-5">
            <form onSubmit={handleSubmit(onSearch)} className="flex gap-2">
                <div className="flex-1">
                    <FormField
                        label="חיפוש"
                        hideLabel
                        type="text"
                        registration={register("search", {
                            onChange: (e) => {
                                if (e.target.value.trim() === "") setParam("search", "")
                            },
                        })}
                        placeholder="🔍  חפשי לפי שם, תיאור או רכיבים"
                        maxLength={100}
                    />
                </div>
                <MyButton text="חיפוש" type="submit" />
            </form>

            <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                <select aria-label="קטגוריה" className={filterClass("categoryId")}
                    value={searchParams.get("categoryId") ?? ""}
                    onChange={(e) => setParam("categoryId", e.target.value)}>
                    <option value="">כל הקטגוריות</option>
                    {categories?.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>

                {showAuthor && (
                    <select aria-label="מפרסם" className={filterClass("authorId")}
                        value={searchParams.get("authorId") ?? ""}
                        onChange={(e) => setParam("authorId", e.target.value)}>
                        <option value="">כל המפרסמים</option>
                        {authors?.map((a) => (
                            <option key={a.id} value={a.id}>{a.name} ({a.recipeCount})</option>
                        ))}
                    </select>
                )}

                <select aria-label="רמת קושי" className={filterClass("difficulty")}
                    value={searchParams.get("difficulty") ?? ""}
                    onChange={(e) => setParam("difficulty", e.target.value)}>
                    <option value="">כל הרמות</option>
                    {Object.entries(difficultyText).map(([key, text]) => (
                        <option key={key} value={key}>{text}</option>
                    ))}
                </select>

                <select aria-label="סוג תפריט" className={filterClass("kosherType")}
                    value={searchParams.get("kosherType") ?? ""}
                    onChange={(e) => setParam("kosherType", e.target.value)}>
                    <option value="">כל סוגי התפריט</option>
                    {Object.entries(kosherText).map(([key, text]) => (
                        <option key={key} value={key}>{text}</option>
                    ))}
                </select>

                <select aria-label="זמן הכנה" className={filterClass("maxPrepTime")}
                    value={searchParams.get("maxPrepTime") ?? ""}
                    onChange={(e) => setParam("maxPrepTime", e.target.value)}>
                    <option value="">כל זמן הכנה</option>
                    {timePrep.map((minutes) => (
                        <option key={minutes} value={minutes}>עד {minutes} דקות</option>
                    ))}
                </select>

                <select aria-label="מיון" className={filterClass("sort")}
                    value={searchParams.get("sort") ?? ""}
                    onChange={(e) => setParam("sort", e.target.value)}>
                    <option value="">מיון לפי: מהחדש לישן</option>
                    {Object.entries(sortText).map(([key, text]) => (
                        <option key={key} value={key}>מיון לפי: {text}</option>
                    ))}
                </select>

                {showVisibility && (
                    <select aria-label="ציבורי או פרטי" className={filterClass("isPublic")}
                        value={searchParams.get("isPublic") ?? ""}
                        onChange={(e) => setParam("isPublic", e.target.value)}>
                        <option value="">כל המתכונים שלי</option>
                        <option value="true">ציבוריים</option>
                        <option value="false">פרטיים</option>
                    </select>
                )}
            </div>

            {hasFilters && (
                <div className="mt-3 flex justify-end">
                    <MyButton text="✕ ניקוי סינון" variant="ghost" size="sm" onClick={() => setSearchParams(new URLSearchParams())} />
                </div>
            )}
        </section>
    )
}
export default RecipeFilters
