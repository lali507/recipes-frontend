import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useAddRecipeMutation, useUploadRecipeImageMutation } from "../store/api/recipeSlice";
import type { errResponse } from "../types/eror";
import ShowPromise from "../components/showPromise";
import RecipeForm, { type RecipeFormResult } from "./RecipeForm";

export default function AddRecipe() {
  const [addFn, { isError, error, isLoading }] = useAddRecipeMutation()
  const [uploadImageFn] = useUploadRecipeImageMutation()
  const nav = useNavigate()
  // המתכון נשמר אבל התמונה נכשלה - שומרים את ה-id כדי לתת קישור לעריכה
  const [savedWithoutImageId, setSavedWithoutImageId] = useState<number | null>(null)

  const onSubmit = async ({ data, image }: RecipeFormResult) => {
    // שלב 1: יצירת המתכון. data כבר בדיוק בצורה של RecipeInput
    // שגיאה כאן נזרקת הלאה ל-RecipeForm, שמציג אותה ליד השדות
    const res = await addFn(data).unwrap()

    // שלב 2: תמונה, רק אם נבחרה
    if (image) {
      try {
        await uploadImageFn({ id: res.id, image }).unwrap()
      }
      catch {
        // המתכון כבר נשמר - לא יוצרים אותו שוב, רק מציעים לנסות מהעריכה
        setSavedWithoutImageId(res.id)
        return
      }
    }

    nav(`/recipes/${res.id}`)
  }

  // שגיאות ולידציה מהשרת כבר מוצגות ליד השדות - לא מציגים אותן שוב למעלה
  const isValidationError = (error as { data?: errResponse } | undefined)?.data?.error?.code === "VALIDATION_ERROR"

  if (savedWithoutImageId) {
    return (
      <div role="alert">
        <p>המתכון נשמר, אבל העלאת התמונה נכשלה.</p>
        <Link to={`/recipes/${savedWithoutImageId}/edit`}>לנסות להעלות שוב מעריכת המתכון</Link>
        {" · "}
        <Link to={`/recipes/${savedWithoutImageId}`}>לצפייה במתכון</Link>
      </div>
    )
  }

  return (<>
    <ShowPromise isLoading={isLoading} isError={isError && !isValidationError} eror={error} />
    <RecipeForm title="הוספת מתכון" submitText="שמירת מתכון" onSubmit={onSubmit} />
  </>)
}
