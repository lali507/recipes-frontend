import { apiSlice } from "./apiSlice"
import type { Category, CategoryInput } from "../../types/category"

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: ["Category"],
    }),

    addCategory: builder.mutation<Category, CategoryInput>({
      query: (body) => ({ url: "/categories", method: "POST", body }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation<Category, CategoryInput & { id: number }>({
      query: ({ id, name }) => ({ url: `/categories/${id}`, method: "PUT", body: { name } }),
      invalidatesTags: ["Category"],
    }),

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
