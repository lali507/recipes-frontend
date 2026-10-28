import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useAddRecipeMutation, useUploadRecipeImageMutation } from "../store/api/recipeSlice";
import type { errResponse } from "../types/eror";
import ShowPromise from "../components/showPromise";
import RecipeForm, { type RecipeFormResult } from "./RecipeForm";
import { useAppDispatch } from "../store/hook"
import { showToast } from "../store/state/toastSlice"

export default function AddRecipe() {
  const [addFn, { isError, error, isLoading }] = useAddRecipeMutation()
  const [uploadImageFn] = useUploadRecipeImageMutation()
  const nav = useNavigate()
  const dispatch = useAppDispatch()
  const [savedWithoutImageId, setSavedWithoutImageId] = useState<number | null>(null)

  const onSubmit = async ({ data, image }: RecipeFormResult) => {
    const res = await addFn(data).unwrap()

    if (image) {
      try {
        await uploadImageFn({ id: res.id, image }).unwrap()
      }
      catch {
        setSavedWithoutImageId(res.id)
        return
      }
    }

    dispatch(showToast("המתכון נוסף בהצלחה"))
    nav(`/recipes/${res.id}`)
  }

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
