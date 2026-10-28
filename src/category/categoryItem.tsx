import { useState, type FormEvent } from "react";
import type { Category } from "../types/category";
import type { errResponse } from "../types/eror";
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from "../store/api/categoryApi";
import MyButton from "../components/form/Button";
import Alert from "../components/Alert";
import { errorClass, inputClass } from "../components/form/styles";
import { useAppDispatch } from "../store/hook"
import { showToast } from "../store/state/toastSlice"

const CategoryItem = ({ category }: { category: Category }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(category.name)
    const [eror, setEror] = useState("")
    const [showHelp, setShowHelp] = useState(false)

    const [updateFn, { isLoading: isSaving }] = useUpdateCategoryMutation()
    const [deleteFn, { isLoading: isDeleting }] = useDeleteCategoryMutation()
    const dispatch = useAppDispatch()

    const count = category.totalRecipeCount ?? category.recipeCount
    const canDelete = category.totalRecipeCount === 0
    const hiddenCount = (category.totalRecipeCount ?? 0) - category.recipeCount

    const startEdit = () => {
        setName(category.name)
        setEror("")
        setIsEditing(true)
    }

    const save = async (e: FormEvent) => {
        e.preventDefault()
        const trimmed = name.trim()
        if (trimmed.length < 2 || trimmed.length > 40) {
            setEror("השם חייב להכיל בין 2 ל-40 תווים")
            return
        }
        try {
            await updateFn({ id: category.id, name: trimmed }).unwrap()
            setIsEditing(false)
            dispatch(showToast(`שם הקטגוריה עודכן ל"${trimmed}"`))
        }
        catch (e) {
            const err = (e as { data?: errResponse }).data?.error
            setEror(err?.code === "CATEGORY_NAME_TAKEN" ? "קטגוריה בשם הזה כבר קיימת" : "השמירה נכשלה")
        }
    }

    const remove = async () => {
        if (!window.confirm(`למחוק את הקטגוריה "${category.name}"?`)) return
        try {
            await deleteFn(category.id).unwrap()
            dispatch(showToast(`הקטגוריה "${category.name}" נמחקה בהצלחה`))
        }
        catch (e) {
            const err = (e as { data?: errResponse }).data?.error
            setEror(err?.code === "CATEGORY_IN_USE" ? "אי אפשר למחוק קטגוריה שיש בה מתכונים" : "המחיקה נכשלה")
        }
    }

    if (isEditing)
        return <li className="bg-brand-50/50 px-6 py-4">
            <form onSubmit={save} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input value={name} onChange={(e) => setName(e.target.value)} aria-label="שם הקטגוריה" maxLength={40} autoFocus className={`${inputClass} py-2 sm:flex-1`} />
                <div className="flex gap-2">
                    <MyButton text={isSaving ? "שומר..." : "שמירה"} type="submit" size="sm" disabled={isSaving} />
                    <MyButton text="ביטול" variant="ghost" size="sm" onClick={() => setIsEditing(false)} disabled={isSaving} />
                </div>
            </form>
            {eror && <p role="alert" className={errorClass}>⚠ {eror}</p>}
        </li>

    return <li className="px-6 py-4 transition hover:bg-brand-50/40">
        <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-ink">{category.name}</span>
            <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">{count} מתכונים</span>
            <div className="ms-auto flex gap-2">
                <MyButton text="✏️ עריכה" variant="secondary" size="sm" onClick={startEdit} />
                <MyButton text={isDeleting ? "מוחק..." : "🗑 מחיקה"} variant="danger" size="sm" onClick={remove} disabled={!canDelete || isDeleting} />
            </div>
        </div>

        {!canDelete && (
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-cocoa">
                <span>
                    {hiddenCount > 0
                        ? (hiddenCount === 1 ? "יש בה מתכון פרטי אחד שלא מוצג לך" : `יש בה ${hiddenCount} מתכונים פרטיים שלא מוצגים לך`)
                        : "אי אפשר למחוק קטגוריה שיש בה מתכונים"}
                </span>
                {hiddenCount > 0 && (
                    <button type="button" onClick={() => setShowHelp(!showHelp)} aria-expanded={showHelp}
                        className="cursor-pointer rounded-full bg-amber-50 px-2.5 py-0.5 font-semibold text-amber-800 ring-1 ring-amber-200 transition hover:bg-amber-100">
                        {showHelp ? "סגירת ההסבר" : "ℹ️ למה?"}
                    </button>
                )}
            </div>
        )}

        {showHelp && (
            <div role="note" className="mt-3">
                <Alert tone="warning">
                    <p>
                        {hiddenCount === 1 ? "בקטגוריה יש מתכון פרטי אחד" : `בקטגוריה יש ${hiddenCount} מתכונים פרטיים`} של משתמשים אחרים.
                        מתכון פרטי גלוי רק למי שכתב אותו, ולכן גם מנהל לא רואה אותו ברשימות.
                    </p>
                    <p className="mt-2">
                        כל עוד יש בקטגוריה מתכונים, גם פרטיים, אי אפשר למחוק אותה, כדי שהמתכונים לא יישארו בלי קטגוריה.
                        הקטגוריה תהיה ניתנת למחיקה אחרי שהכותבים יעבירו את המתכונים לקטגוריה אחרת או ימחקו אותם.
                        בינתיים אפשר לשנות את שם הקטגוריה.
                    </p>
                </Alert>
            </div>
        )}
        {eror && <p role="alert" className={errorClass}>⚠ {eror}</p>}
    </li>
}

export default CategoryItem;
