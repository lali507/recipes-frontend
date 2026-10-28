import { useState } from "react";
import type { Category } from "../types/category";
import type { errResponse } from "../types/eror";
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from "../store/api/categoryApi";
import MyButton from "../components/form/Button";

// שורה אחת ברשימת הקטגוריות: מצב צפייה או מצב עריכה
const CategoryItem = ({ category }: { category: Category }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(category.name)
    const [eror, setEror] = useState("")

    const [updateFn, { isLoading: isSaving }] = useUpdateCategoryMutation()
    const [deleteFn, { isLoading: isDeleting }] = useDeleteCategoryMutation()

    const count = category.totalRecipeCount ?? category.recipeCount
    // השרת לא מוחק קטגוריה שיש בה מתכונים (גם פרטיים)
    const canDelete = category.totalRecipeCount === 0

    const startEdit = () => {
        setName(category.name)
        setEror("")
        setIsEditing(true)
    }

    const save = async () => {
        const trimmed = name.trim()
        // אותם חוקים כמו בשרת: 2-40 תווים
        if (trimmed.length < 2 || trimmed.length > 40) {
            setEror("השם חייב להכיל בין 2 ל-40 תווים")
            return
        }
        try {
            await updateFn({ id: category.id, name: trimmed }).unwrap()
            setIsEditing(false)
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
            // אין צורך לעדכן כלום - invalidatesTags טוען את הרשימה מחדש
        }
        catch (e) {
            const err = (e as { data?: errResponse }).data?.error
            setEror(err?.code === "CATEGORY_IN_USE" ? "אי אפשר למחוק קטגוריה שיש בה מתכונים" : "המחיקה נכשלה")
        }
    }

    if (isEditing)
        return <li>
            <input value={name} onChange={(e) => setName(e.target.value)} autoFocus />
            <MyButton text={isSaving ? "שומר..." : "שמירה"} onClick={save} disabled={isSaving} />
            <MyButton text="ביטול" onClick={() => setIsEditing(false)} disabled={isSaving} />
            {eror && <p>{eror}</p>}
        </li>

    return <li>
        {category.name} ({count} מתכונים)
        <MyButton text="עריכה" onClick={startEdit} />
        <MyButton text={isDeleting ? "מוחק..." : "מחיקה"} onClick={remove} disabled={!canDelete || isDeleting} />
        {eror && <p>{eror}</p>}
    </li>
}

export default CategoryItem;
