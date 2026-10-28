import { useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { useDeleteRecipeImageMutation, useUpdateRecipeMutation, useUploadRecipeImageMutation } from "../store/api/recipeSlice";
import type { Recipe } from "../types/recipe";
import type { errResponse } from "../types/eror";
import ShowPromise from "../components/showPromise";
import RecipeForm, { type RecipeFormResult } from "./RecipeForm";

// מקבלת מתכון שכבר נטען - כך שהערכים ההתחלתיים של הטופס זמינים מהרגע הראשון
const EditRecipe = ({ recipe }: { recipe: Recipe }) => {
  const [updateFn, { isError, error, isLoading }] = useUpdateRecipeMutation()
  const [uploadImageFn] = useUploadRecipeImageMutation()
  const [deleteImageFn] = useDeleteRecipeImageMutation()
  const nav = useNavigate()
  // state מדף המתכון (מאיזו רשימה הגיעו) - מעבירים אותו הלאה בחזרה
  const location = useLocation()
  const [imageFailed, setImageFailed] = useState(false)

  const onSubmit = async ({ data, image, removeImage }: RecipeFormResult) => {
    setImageFailed(false)
    // שלב 1: עדכון הפרטים. בעדכון חובה לשלוח את כל השדות, כולל isPublic
    // שגיאה כאן נזרקת הלאה ל-RecipeForm, שמציג אותה ליד השדות
    await updateFn({ id: recipe.id, ...data }).unwrap()

    // שלב 2: תמונה - תמונה חדשה מחליפה את הקיימת, אחרת מוחקים אם סומן
    try {
      if (image) await uploadImageFn({ id: recipe.id, image }).unwrap()
      else if (removeImage) await deleteImageFn(recipe.id).unwrap()
    }
    catch {
      // הפרטים כבר נשמרו - נשארים בטופס כדי לנסות שוב רק את התמונה
      setImageFailed(true)
      return
    }

    nav(`/recipes/${recipe.id}`, { state: location.state })
  }

  // שגיאות ולידציה מהשרת כבר מוצגות ליד השדות - לא מציגים אותן שוב למעלה
  const isValidationError = (error as { data?: errResponse } | undefined)?.data?.error?.code === "VALIDATION_ERROR"

  return (<>
    <ShowPromise isLoading={isLoading} isError={isError && !isValidationError} eror={error} />
    {imageFailed && <p role="alert">הפרטים נשמרו, אבל עדכון התמונה נכשל. אפשר לנסות שוב.</p>}
    <RecipeForm
      title="עריכת מתכון"
      submitText="שמירת שינויים"
      currentImageUrl={recipe.imageUrl}
      // מהשרת חוזר category כאובייקט - לטופס צריך רק את ה-id
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
