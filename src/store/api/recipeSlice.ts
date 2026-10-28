import type { Recipe, RecipeFilters, RecipeInput } from "../../types/recipe"
import type { PaginatedResponse } from "../../types/paging"
import { apiSlice } from "./apiSlice"


export const recipeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // query = בקשה שקוראת נתונים (GET)
    // השרת מחזיר רשימה עם עמודים: { items, pagination }
    // אפשר לקרוא בלי פרמטרים (void) או עם אובייקט סינון
    getRecipes: builder.query<PaginatedResponse<Recipe>, RecipeFilters | void>({
      // params הופך את האובייקט ל-query string (כולל קידוד עברית), ושדות undefined לא נשלחים
      query: (filters) => ({ url: "/recipes", params: filters ?? undefined }),
      providesTags: ["Recipe"],
    }),

    // אותם פילטרים, ובנוסף isPublic: true = רק ציבוריים, false = רק פרטיים, בלי = הכול
    getMyRecipes: builder.query<PaginatedResponse<Recipe>, (RecipeFilters & { isPublic?: boolean }) | void>({
      query: (filters) => ({ url: "/recipes/mine", params: filters ?? undefined }),
      providesTags: ["Recipe"],
    }),

    // מתכון אחד לפי id
    getRecipe: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
      providesTags: ["Recipe"],
    }),

    // mutation = בקשה ששולחת או משנה נתונים (POST/PUT/DELETE)
    // השרת מחזיר את המתכון החדש, כולל id (צריך אותו להעלאת תמונה)
    addRecipe: builder.mutation<Recipe, RecipeInput>({
      query: (body) => ({ url: "/recipes", method: "POST", body }),
      invalidatesTags: ["Recipe"],
    }),

    // צריך גם id ל-url וגם את כל השדות ל-body. בעדכון isPublic חובה
    updateRecipe: builder.mutation<Recipe, RecipeInput & { id: number; isPublic: boolean }>({
      query: ({ id, ...body }) => ({ url: `/recipes/${id}`, method: "PUT", body }),
      invalidatesTags: ["Recipe", "Favorite"],
    }),

    // 204 - אין גוף תשובה, לכן void
    deleteRecipe: builder.mutation<void, number>({
      query: (id) => ({ url: `/recipes/${id}`, method: "DELETE" }),
      invalidatesTags: ["Recipe", "Favorite"],
    }),

    // הבקשה היחידה שאינה JSON: שולחים FormData עם שדה בשם image
    // לא מגדירים Content-Type - הדפדפן מוסיף אותו לבד
    uploadRecipeImage: builder.mutation<Recipe, { id: number; image: File }>({
      query: ({ id, image }) => {
        const body = new FormData()
        body.append("image", image)
        return { url: `/recipes/${id}/image`, method: "POST", body }
      },
      invalidatesTags: ["Recipe", "Favorite"],
    }),

    // השרת מחזיר את המתכון עם imageUrl: null
    deleteRecipeImage: builder.mutation<Recipe, number>({
      query: (id) => ({ url: `/recipes/${id}/image`, method: "DELETE" }),
      invalidatesTags: ["Recipe", "Favorite"],
    }),
  }),
})

export const {
  useGetRecipesQuery,
  useGetMyRecipesQuery,
  useGetRecipeQuery,
  useAddRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useUploadRecipeImageMutation,
  useDeleteRecipeImageMutation,
} = recipeApi
