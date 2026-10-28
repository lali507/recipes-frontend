import { useEffect } from "react"
import { useSearchParams } from "react-router"
import { useForm } from "react-hook-form"
import { useGetCategoriesQuery } from "../store/api/categoryApi"
import { useGetAuthorsQuery } from "../store/api/recipeSlice"
import type { Difficulty, KosherType, RecipeSort } from "../types/recipe"
import MyButton from "../components/form/Button"
import FormField from "../components/form/formField"


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

    const onSearch = (data: { search: string }) => setParam("search", data.search.trim())

    return (
        <>
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
                    maxLength={100}
                />
                <MyButton text="חפש" type="submit" />
            </form>

            <select
                aria-label="קטגוריה"
                value={searchParams.get("categoryId") ?? ""}
                onChange={(e) => setParam("categoryId", e.target.value)}
            >
                <option value="">כל הקטגוריות</option>
                {categories?.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>

            {showAuthor && (
                <select
                    aria-label="מפרסם"
                    value={searchParams.get("authorId") ?? ""}
                    onChange={(e) => setParam("authorId", e.target.value)}
                >
                    <option value="">כל המפרסמים</option>
                    {authors?.map((a) => (
                        <option key={a.id} value={a.id}>{a.name} ({a.recipeCount})</option>
                    ))}
                </select>
            )}

            <select
                aria-label="רמת קושי"
                value={searchParams.get("difficulty") ?? ""}
                onChange={(e) => setParam("difficulty", e.target.value)}
            >
                <option value="">כל הרמות</option>
                {Object.entries(difficultyText).map(([key, text]) => (
                    <option key={key} value={key}>{text}</option>
                ))}
            </select>

            <select
                aria-label="סוג תפריט"
                value={searchParams.get("kosherType") ?? ""}
                onChange={(e) => setParam("kosherType", e.target.value)}
            >
                <option value="">כל סוגי התפריט</option>
                {Object.entries(kosherText).map(([key, text]) => (
                    <option key={key} value={key}>{text}</option>
                ))}
            </select>
            <select
                aria-label="זמן הכנה"
                value={searchParams.get("maxPrepTime") ?? ""}
                onChange={(e) => setParam("maxPrepTime", e.target.value)}
            >
                <option value="">כל זמן הכנה</option>
                {timePrep.map((minutes) => (
                    <option key={minutes} value={minutes}>עד {minutes} דקות</option>
                ))}
            </select>

            <select
                aria-label="מיון"
                value={searchParams.get("sort") ?? ""}
                onChange={(e) => setParam("sort", e.target.value)}
            >
                <option value="">מיון לפי: מהחדש לישן</option>
                {Object.entries(sortText).map(([key, text]) => (
                    <option key={key} value={key}>מיון לפי: {text}</option>
                ))}
            </select>

            {showVisibility && (
                <select
                    aria-label="ציבורי או פרטי"
                    value={searchParams.get("isPublic") ?? ""}
                    onChange={(e) => setParam("isPublic", e.target.value)}
                >
                    <option value="">כל המתכונים שלי</option>
                    <option value="true">ציבוריים</option>
                    <option value="false">פרטיים</option>
                </select>
            )}

            {hasFilters && <MyButton text="ניקוי סינון" onClick={() => setSearchParams(new URLSearchParams())} />}
        </>
    )
}
export default RecipeFilters
