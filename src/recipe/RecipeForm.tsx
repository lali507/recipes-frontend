import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useGetCategoriesQuery } from "../store/api/categoryApi";
import type { Difficulty, KosherType } from "../types/recipe";
import type { errResponse } from "../types/eror";
import FormField from "../components/form/formField";
import MyButton from "../components/form/Button";
import Loader from "../components/Loader";
import { errorClass, hintClass, inputClass, labelClass, selectClass } from "../components/form/styles";

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

const Section = ({ icon, title, children }: { icon: string; title: string; children: ReactNode }) => (
  <fieldset className="space-y-5 border-t border-brand-100 pt-8 first:border-t-0 first:pt-0">
    <legend className="mb-1 flex items-center gap-2 font-display text-lg font-bold text-ink">
      <span aria-hidden="true" className="grid size-8 place-items-center rounded-xl bg-brand-50">{icon}</span>{title}
    </legend>
    {children}
  </fieldset>
)

const Required = () => <span aria-hidden="true" className="text-brand-600"> *</span>

const RecipeForm = ({ title, submitText, defaultValues, currentImageUrl, showVisibility = true, onSubmit }: RecipeFormProps) => {
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery()

  const [image, setImage] = useState<File | null>(null)
  const [imageError, setImageError] = useState("")
  const [removeImage, setRemoveImage] = useState(false)
  const imageInput = useRef<HTMLInputElement>(null)

  const previewUrl = useMemo(() => (image ? URL.createObjectURL(image) : null), [image])
  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl) }, [previewUrl])

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

  if (isLoadingCategories) return <Loader />

  const shownImage = previewUrl ?? (currentImageUrl && !removeImage ? currentImageUrl : null)

  return (
    <form onSubmit={handleSubmit(submit)} className="mx-auto max-w-3xl motion-safe:animate-fade-up">
      <h1 className="mb-6 font-display text-3xl font-extrabold text-ink sm:text-4xl">{title}</h1>

      <div className="space-y-8 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-brand-100 sm:p-10">
        <Section icon="📝" title="פרטי המתכון">
          <FormField type="text" registration={register("title")} error={errors.title} label="שם המתכון" placeholder="למשל: עוגת שמרים לשבת" required instructions="בין 2 ל-100 תווים" maxLength={100} />
          <FormField type="text" registration={register("description")} error={errors.description} label="תיאור קצר" placeholder="משפט או שניים על המנה" required instructions="בין 5 ל-500 תווים" maxLength={500} />
          <div>
            <label htmlFor="recipe-category" className={labelClass}>קטגוריה<Required /></label>
            <select id="recipe-category" {...register("categoryId")} aria-invalid={!!errors.categoryId} className={selectClass}>
              <option value="">בחירת קטגוריה</option>
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {errors.categoryId && <p role="alert" className={errorClass}>{errors.categoryId.message}</p>}
          </div>
        </Section>

        <Section icon="🧺" title="רכיבים והכנה">
          <div>
            <label htmlFor="recipe-ingredients" className={labelClass}>רכיבים<Required /></label>
            <textarea id="recipe-ingredients" rows={6} {...register("ingredients")} placeholder={"2 כוסות קמח\n1 כפית מלח\n..."} aria-invalid={!!errors.ingredients} className={`${inputClass} leading-relaxed`} />
            <p className={hintClass}>רכיב אחד בכל שורה</p>
            {errors.ingredients && <p role="alert" className={errorClass}>{errors.ingredients.message}</p>}
          </div>
          <div>
            <label htmlFor="recipe-instructions" className={labelClass}>הוראות הכנה<Required /></label>
            <textarea id="recipe-instructions" rows={8} {...register("instructions")} placeholder={"מחממים תנור ל-180 מעלות\nמערבבים את כל הרכיבים\n..."} aria-invalid={!!errors.instructions} className={`${inputClass} leading-relaxed`} />
            <p className={hintClass}>כל שלב בשורה נפרדת, הם יוצגו כרשימה ממוספרת</p>
            {errors.instructions && <p role="alert" className={errorClass}>{errors.instructions.message}</p>}
          </div>
        </Section>

        <Section icon="⚙️" title="פרטים נוספים">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField type="number" registration={register("prepTimeMinutes")} error={errors.prepTimeMinutes} label="זמן הכנה (דקות)" required instructions="מספר שלם בין 1 ל-1440" />
            <FormField type="number" registration={register("servings")} error={errors.servings} label="מספר מנות" required instructions="מספר שלם בין 1 ל-100" />
            <div>
              <label htmlFor="recipe-difficulty" className={labelClass}>רמת קושי<Required /></label>
              <select id="recipe-difficulty" {...register("difficulty")} aria-invalid={!!errors.difficulty} className={selectClass}>
                <option value="">בחירת רמת קושי</option>
                {Object.entries(difficultyText).map(([key, text]) => (
                  <option key={key} value={key}>{text}</option>
                ))}
              </select>
              {errors.difficulty && <p role="alert" className={errorClass}>{errors.difficulty.message}</p>}
            </div>
            <div>
              <label htmlFor="recipe-kosher" className={labelClass}>סוג תפריט<Required /></label>
              <select id="recipe-kosher" {...register("kosherType")} aria-invalid={!!errors.kosherType} className={selectClass}>
                <option value="">בחירת סוג תפריט</option>
                {Object.entries(kosherText).map(([key, text]) => (
                  <option key={key} value={key}>{text}</option>
                ))}
              </select>
              {errors.kosherType && <p role="alert" className={errorClass}>{errors.kosherType.message}</p>}
            </div>
          </div>

          {showVisibility && <FormField type="checkbox" registration={register("isPublic")} error={errors.isPublic}
            label="🌐 מתכון ציבורי" instructions="כל המשתמשים יוכלו לראות אותו ב'מתכונים משותפים'. בלי סימון, רק את תראי אותו" />}
        </Section>

        <Section icon="📷" title={currentImageUrl ? "החלפת תמונה" : "תמונה (לא חובה)"}>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="grid aspect-[4/3] w-full shrink-0 place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/60 sm:w-56">
              {shownImage
                ? <img src={shownImage} alt={previewUrl ? "התמונה שנבחרה" : "התמונה הנוכחית"} className="size-full object-cover" />
                : <span aria-hidden="true" className="text-5xl opacity-60">🖼️</span>}
            </div>
            <div className="space-y-3">
              <input id="recipe-image" ref={imageInput} type="file" accept=".jpg,.jpeg,.png,.webp" hidden onChange={(e) => onImageChange(e.target)} />
              <MyButton
                variant="secondary"
                text={image ? "החלפת הקובץ שנבחר" : imageError ? "ניסיון חוזר - בחירת תמונה אחרת" : "בחירת תמונה"}
                onClick={() => imageInput.current?.click()}
              />
              {image && <p className="text-sm font-medium text-ink">נבחר: {image.name}</p>}
              <p className={hintClass}>JPG, PNG או WEBP, עד 5MB</p>
              {imageError && <p role="alert" className={errorClass}>⚠ {imageError}</p>}
              {currentImageUrl && !image && (
                <label className="flex cursor-pointer items-center gap-2 text-sm text-ink">
                  <input type="checkbox" checked={removeImage} onChange={(e) => setRemoveImage(e.target.checked)} className="size-4 accent-brand-600" />
                  הסרת התמונה הנוכחית
                </label>
              )}
            </div>
          </div>
        </Section>

        <div className="border-t border-brand-100 pt-8">
          <MyButton text={isSubmitting ? "שומר..." : submitText} type="submit" size="lg" disabled={isSubmitting} fullWidth />
        </div>
      </div>
    </form>
  )
}
export default RecipeForm
