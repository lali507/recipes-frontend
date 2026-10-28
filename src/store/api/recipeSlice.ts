import type { Author, Recipe, RecipeFilters, RecipeInput } from "../../types/recipe"
import type { PaginatedResponse } from "../../types/paging"
import { apiSlice } from "./apiSlice"


export const recipeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query<PaginatedResponse<Recipe>, RecipeFilters | void>({
      query: (filters) => ({ url: "/recipes", params: filters ?? undefined }),
      providesTags: ["Recipe"],
    }),

    getMyRecipes: builder.query<PaginatedResponse<Recipe>, (RecipeFilters & { isPublic?: boolean }) | void>({
      query: (filters) => ({ url: "/recipes/mine", params: filters ?? undefined }),
      providesTags: ["Recipe"],
    }),

    getAuthors: builder.query<Author[], void>({
      query: () => "/recipes/authors",
      providesTags: ["Recipe"],
    }),

    getRecipe: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
      providesTags: ["Recipe"],
    }),

    addRecipe: builder.mutation<Recipe, RecipeInput>({
      query: (body) => ({ url: "/recipes", method: "POST", body }),
      invalidatesTags: ["Recipe", "Category"],
    }),

    updateRecipe: builder.mutation<Recipe, RecipeInput & { id: number; isPublic: boolean }>({
      query: ({ id, ...body }) => ({ url: `/recipes/${id}`, method: "PUT", body }),
      invalidatesTags: ["Recipe", "Favorite", "Category"],
    }),

    deleteRecipe: builder.mutation<void, number>({
      query: (id) => ({ url: `/recipes/${id}`, method: "DELETE" }),
      invalidatesTags: ["Recipe", "Favorite", "Category"],
    }),

    uploadRecipeImage: builder.mutation<Recipe, { id: number; image: File }>({
      query: ({ id, image }) => {
        const body = new FormData()
        body.append("image", image)
        return { url: `/recipes/${id}/image`, method: "POST", body }
      },
      invalidatesTags: ["Recipe", "Favorite"],
    }),

    deleteRecipeImage: builder.mutation<Recipe, number>({
      query: (id) => ({ url: `/recipes/${id}/image`, method: "DELETE" }),
      invalidatesTags: ["Recipe", "Favorite"],
    }),
  }),
})

export const {
  useGetRecipesQuery,
  useGetMyRecipesQuery,
  useGetAuthorsQuery,
  useGetRecipeQuery,
  useAddRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useUploadRecipeImageMutation,
  useDeleteRecipeImageMutation,
} = recipeApi
