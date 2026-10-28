import { useRef, useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useGetCategoriesQuery } from "../store/api/categoryApi";
import type { Difficulty, KosherType } from "../types/recipe";
import type { errResponse } from "../types/eror";
import FormField from "../components/form/formField";
import MyButton from "../components/form/Button";

const schema = yup.object({
  title: yup
    .string()
    .trim()
    .required("שם המתכון הוא שדה חובה")
    .min(2, "השם חייב להכיל לפחות 2 תווים")
    .max(100, "השם יכול להכיל עד 100 תווים"),
  description: yup
    .string()
    .trim()
    .required("תיאור הוא שדה חובה")
    .min(5, "התיאור חייב להכיל לפחות 5 תווים")
    .max(500, "התיאור יכול להכיל עד 500 תווים"),
  categoryId: yup
    .number()
    .typeError("יש לבחור קטגוריה")
    .required("יש לבחור קטגוריה"),
  ingredients: yup
    .string()
    .trim()
    .required("רכיבים הם שדה חובה")
    .max(5000, "הרכיבים יכולים להכיל עד 5,000 תווים"),
  instructions: yup
    .string()
    .trim()
    .required("הוראות הכנה הן שדה חובה")
    .max(10000, "ההוראות יכולות להכיל עד 10,000 תווים"),
  prepTimeMinutes: yup
    .number()
    .typeError("יש להזין זמן הכנה במספרים")
    .required("זמן הכנה הוא שדה חובה")
    .integer("זמן הכנה חייב להיות מספר שלם")
    .min(1, "זמן הכנה מינימלי הוא דקה אחת")
    .max(1440, "זמן הכנה מקסימלי הוא 1440 דקות (24 שעות)"),
  servings: yup
    .number()
    .typeError("יש להזין מספר מנות")
    .required("מספר מנות הוא שדה חובה")
    .integer("מספר מנות חייב להיות מספר שלם")
    .min(1, "לפחות מנה אחת")
    .max(100, "עד 100 מנות"),
  difficulty: yup
    .mixed<Difficulty>()
    .oneOf(["EASY", "MEDIUM", "HARD"], "יש לבחור רמת קושי")
    .required("יש לבחור רמת קושי"),
  kosherType: yup
    .mixed<KosherType>()
    .oneOf(["MEAT", "DAIRY", "PAREVE"], "יש לבחור סוג תפריט")
    .required("יש לבחור סוג תפריט"),
  isPublic: yup.boolean().default(false),
})

export type RecipeFormInputs = yup.InferType<typeof schema>

export interface RecipeFormResult {
  data: RecipeFormInputs
  image: File | null
  removeImage: boolean
}

interface RecipeFormProps {
  title: string
  submitText: string
  defaultValues?: Partial<RecipeFormInputs>
  currentImageUrl?: string | null
  showVisibility?: boolean
  onSubmit: (result: RecipeFormResult) => Promise<void>
}

const difficultyText: Record<Difficulty, string> = { EASY: "קל", MEDIUM: "בינוני", HARD: "קשה" }
const kosherText: Record<KosherType, string> = { MEAT: "בשרי", DAIRY: "חלבי", PAREVE: "פרווה" }

const imageTypes = ["image/jpeg", "image/png", "image/webp"]
const maxImageSize = 5 * 1024 * 1024

const RecipeForm = ({ title, submitText, defaultValues, currentImageUrl, showVisibility = true, onSubmit }: RecipeFormProps) => {
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery()

  const [image, setImage] = useState<File | null>(null)
  const [imageError, setImageError] = useState("")
  const [removeImage, setRemoveImage] = useState(false)
  const imageInput = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormInputs>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      description: "",
      ingredients: "",
      instructions: "",
      isPublic: false,
      ...defaultValues,
    },
  });

  const onImageChange = (input: HTMLInputElement) => {
    const file = input.files?.[0]
    setImageError("")
    if (!file) return setImage(null)
    const reject = (message: string) => {
      input.value = ""
      setImage(null)
      setImageError(message)
    }
    if (!imageTypes.includes(file.type)) return reject("אפשר להעלות רק JPG, PNG או WEBP")
    if (file.size > maxImageSize) return reject("התמונה גדולה מדי (עד 5MB)")
    setImage(file)
  }

  const submit: SubmitHandler<RecipeFormInputs> = async (data) => {
    try {
      await onSubmit({ data, image, removeImage })
    }
    catch (e) {
      const err = (e as { data?: errResponse }).data?.error
      err?.details?.forEach((d) => setError(d.field as keyof RecipeFormInputs, { message: d.message }))
    }
  }

  if (isLoadingCategories) return <p>טוען...</p>

  return (
    <form onSubmit={handleSubmit(submit)}>
      <h2>{title}</h2>

      <FormField type="text" registration={register("title")} error={errors.title} label="שם המתכון" required instructions="בין 2 ל-100 תווים" maxLength={100} />
      <FormField type="text" registration={register("description")} error={errors.description} label="תיאור קצר" required instructions="בין 5 ל-500 תווים" maxLength={500} />

      <div>
        <label htmlFor="recipe-category">קטגוריה<span aria-hidden="true"> *</span></label>
        <select id="recipe-category" {...register("categoryId")} aria-invalid={!!errors.categoryId}>
          <option value="">בחירת קטגוריה</option>
          {categories?.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {errors.categoryId && <p role="alert">{errors.categoryId.message}</p>}
      </div>

      <div>
        <label htmlFor="recipe-ingredients">רכיבים<span aria-hidden="true"> *</span></label>
        <textarea id="recipe-ingredients" rows={6} {...register("ingredients")} placeholder="רכיב בכל שורה" aria-invalid={!!errors.ingredients} />
        {errors.ingredients && <p role="alert">{errors.ingredients.message}</p>}
      </div>

      <div>
        <label htmlFor="recipe-instructions">הוראות הכנה<span aria-hidden="true"> *</span></label>
        <textarea id="recipe-instructions" rows={8} {...register("instructions")} aria-invalid={!!errors.instructions} />
        {errors.instructions && <p role="alert">{errors.instructions.message}</p>}
      </div>

      <FormField type="number" registration={register("prepTimeMinutes")} error={errors.prepTimeMinutes} label="זמן הכנה (דקות)" required instructions="מספר שלם בין 1 ל-1440" />
      <FormField type="number" registration={register("servings")} error={errors.servings} label="מספר מנות" required instructions="מספר שלם בין 1 ל-100" />

      <div>
        <label htmlFor="recipe-difficulty">רמת קושי<span aria-hidden="true"> *</span></label>
        <select id="recipe-difficulty" {...register("difficulty")} aria-invalid={!!errors.difficulty}>
          <option value="">בחירת רמת קושי</option>
          {Object.entries(difficultyText).map(([key, text]) => (
            <option key={key} value={key}>{text}</option>
          ))}
        </select>
        {errors.difficulty && <p role="alert">{errors.difficulty.message}</p>}
      </div>

      <div>
        <label htmlFor="recipe-kosher">סוג תפריט<span aria-hidden="true"> *</span></label>
        <select id="recipe-kosher" {...register("kosherType")} aria-invalid={!!errors.kosherType}>
          <option value="">בחירת סוג תפריט</option>
          {Object.entries(kosherText).map(([key, text]) => (
            <option key={key} value={key}>{text}</option>
          ))}
        </select>
        {errors.kosherType && <p role="alert">{errors.kosherType.message}</p>}
      </div>

      {showVisibility && <FormField type="checkbox" registration={register("isPublic")} error={errors.isPublic} label="מתכון ציבורי (כולם יוכלו לראות)" />}

      <div>
        <label htmlFor="recipe-image">{currentImageUrl ? "החלפת תמונה" : "תמונה (לא חובה)"}</label>
        {currentImageUrl && !removeImage && <img src={currentImageUrl} alt="התמונה הנוכחית" width={150} />}
        <input id="recipe-image" ref={imageInput} type="file" accept=".jpg,.jpeg,.png,.webp" hidden onChange={(e) => onImageChange(e.target)} />
        <MyButton
          text={image ? "החלפת הקובץ שנבחר" : imageError ? "ניסיון חוזר - בחירת תמונה אחרת" : "בחירת תמונה"}
          onClick={() => imageInput.current?.click()}
        />
        {image && <span> נבחר: {image.name}</span>}
        <p>JPG, PNG או WEBP, עד 5MB</p>
        {imageError && <p role="alert">{imageError}</p>}
        {currentImageUrl && !image && (
          <label>
            <input type="checkbox" checked={removeImage} onChange={(e) => setRemoveImage(e.target.checked)} />
            הסרת התמונה הנוכחית
          </label>
        )}
      </div>

      <MyButton text={isSubmitting ? "שומר..." : submitText} type="submit" disabled={isSubmitting} />
    </form>
  )
}
export default RecipeForm
