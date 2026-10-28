import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useAddRecipeMutation, useUploadRecipeImageMutation } from "../store/api/recipeSlice";
import type { errResponse } from "../types/eror";
import ShowPromise from "../components/showPromise";
import Alert from "../components/Alert";
import { buttonClass } from "../components/form/styles";
import RecipeForm, { type RecipeFormResult } from "./RecipeForm";
import { useAppDispatch } from "../store/hook"
import { showToast } from "../store/state/toastSlice"

export default function AddRecipe() {
  const [addFn, { isError, error }] = useAddRecipeMutation()
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
      <div className="mx-auto max-w-xl space-y-5 py-10 text-center">
        <Alert tone="warning">המתכון נשמר, אבל העלאת התמונה נכשלה.</Alert>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to={`/recipes/${savedWithoutImageId}/edit`} className={buttonClass("primary")}>לנסות להעלות שוב מעריכת המתכון</Link>
          <Link to={`/recipes/${savedWithoutImageId}`} className={buttonClass("secondary")}>לצפייה במתכון</Link>
        </div>
      </div>
    )
  }

  return (<>
    <div className="mx-auto mb-4 max-w-3xl"><ShowPromise isLoading={false} isError={isError && !isValidationError} eror={error} /></div>
    <RecipeForm title="הוספת מתכון" submitText="שמירת מתכון" onSubmit={onSubmit} />
  </>)
}
