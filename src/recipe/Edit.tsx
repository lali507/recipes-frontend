import { useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { useDeleteRecipeImageMutation, useUpdateRecipeMutation, useUploadRecipeImageMutation } from "../store/api/recipeSlice";
import type { Recipe } from "../types/recipe";
import type { errResponse } from "../types/eror";
import ShowPromise from "../components/showPromise";
import RecipeForm, { type RecipeFormResult } from "./RecipeForm";
import { useAppDispatch } from "../store/hook"
import { showToast } from "../store/state/toastSlice"

const EditRecipe = ({ recipe }: { recipe: Recipe }) => {
  const [updateFn, { isError, error, isLoading }] = useUpdateRecipeMutation()
  const [uploadImageFn] = useUploadRecipeImageMutation()
  const [deleteImageFn] = useDeleteRecipeImageMutation()
  const nav = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const [imageFailed, setImageFailed] = useState(false)

  const onSubmit = async ({ data, image, removeImage }: RecipeFormResult) => {
    setImageFailed(false)
    await updateFn({ id: recipe.id, ...data }).unwrap()

    try {
      if (image) await uploadImageFn({ id: recipe.id, image }).unwrap()
      else if (removeImage) await deleteImageFn(recipe.id).unwrap()
    }
    catch {
      setImageFailed(true)
      return
    }

    dispatch(showToast("השינויים נשמרו בהצלחה"))
    nav(`/recipes/${recipe.id}`, { state: location.state })
  }

  const isValidationError = (error as { data?: errResponse } | undefined)?.data?.error?.code === "VALIDATION_ERROR"

  return (<>
    <ShowPromise isLoading={isLoading} isError={isError && !isValidationError} eror={error} />
    {imageFailed && <p role="alert">הפרטים נשמרו, אבל עדכון התמונה נכשל. אפשר לנסות שוב.</p>}
    <RecipeForm
      title={recipe.isOwner ? "עריכת מתכון" : `עריכת מתכון של ${recipe.author.name} (הרשאת מנהל)`}
      submitText="שמירת שינויים"
      currentImageUrl={recipe.imageUrl}
      showVisibility={recipe.isOwner}
      defaultValues={{
        title: recipe.title,
        description: recipe.description,
        categoryId: recipe.category.id,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        prepTimeMinutes: recipe.prepTimeMinutes,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        kosherType: recipe.kosherType,
        isPublic: recipe.isPublic ?? false,
      }}
      onSubmit={onSubmit}
    />
  </>)
}
export default EditRecipe
