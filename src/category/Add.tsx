import { useState, type FormEvent } from "react"
import MyButton from "../components/form/Button"
import { errorClass, hintClass, inputClass, labelClass } from "../components/form/styles"
import { useAddCategoryMutation } from "../store/api/categoryApi"
import type { errResponse } from "../types/eror"
import { useAppDispatch } from "../store/hook"
import { showToast } from "../store/state/toastSlice"


const AddCategory = () => {
    const [addFn, { isLoading: isSaving }] = useAddCategoryMutation()
    const dispatch = useAppDispatch()
    const [name, setName] = useState("")
    const [eror, setEror] = useState("")

    const Add = async (e: FormEvent) => {
        e.preventDefault()
        setEror("")
        const trimmed = name.trim()
        if (trimmed.length < 2 || trimmed.length > 40) {
            setEror("השם חייב להכיל בין 2 ל-40 תווים")
            return
        }
        try {
            await addFn({ name: trimmed }).unwrap()
            setName("")
            dispatch(showToast(`הקטגוריה "${trimmed}" נוספה בהצלחה`))
        }
        catch (e) {
            const err = (e as { data?: errResponse }).data?.error
            setEror(err?.code === "CATEGORY_NAME_TAKEN" ? "קטגוריה בשם הזה כבר קיימת" : err?.details?.[0]?.message ?? err?.message ?? "ההוספה נכשלה")
        }
    }

    return (
        <form onSubmit={Add} className="space-y-4 rounded-3xl bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm ring-1 ring-brand-100 lg:sticky lg:top-24">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink"><span aria-hidden="true">➕</span> הוספת קטגוריה</h2>
            <div>
                <label htmlFor="new-category" className={labelClass}>שם הקטגוריה החדשה</label>
                <input id="new-category" value={name} onChange={({ target }) => setName(target.value)} placeholder="למשל: פשטידות" maxLength={40}
                    aria-invalid={!!eror} className={inputClass} />
                <p className={hintClass}>בין 2 ל-40 תווים, שם שעוד לא קיים</p>
                {eror && <p role="alert" className={errorClass}>⚠ {eror}</p>}
            </div>
            <MyButton text={isSaving ? "מוסיף..." : "הוספת קטגוריה"} type="submit" disabled={isSaving} fullWidth />
        </form>
    )
}
export default AddCategory
