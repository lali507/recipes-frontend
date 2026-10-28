import { apiSlice } from "./apiSlice"
import type { Category, CategoryInput } from "../../types/category"

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // query = בקשה שקוראת נתונים (GET)
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      // הרשימה "מחזיקה" את התגית - כשהיא נפסלת, הרשימה נטענת מחדש
      providesTags: ["Category"],
    }),

    // mutation = בקשה ששולחת או משנה נתונים (POST/PUT/DELETE)
    addCategory: builder.mutation<Category, CategoryInput>({
      query: (body) => ({ url: "/categories", method: "POST", body }),
      invalidatesTags: ["Category"],
    }),

    // צריך גם id ל-url וגם name ל-body, לכן מקבלים אובייקט אחד עם שניהם
    updateCategory: builder.mutation<Category, CategoryInput & { id: number }>({
      query: ({ id, name }) => ({ url: `/categories/${id}`, method: "PUT", body: { name } }),
      invalidatesTags: ["Category"],
    }),

    // 204 - אין גוף תשובה, לכן void
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({ url: `/categories/${id}`, method: "DELETE" }),
      invalidatesTags: ["Category"],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi
