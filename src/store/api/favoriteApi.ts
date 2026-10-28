import { apiSlice } from "./apiSlice"
import type { FavoriteRecipe } from "../../types/recipe"
import type { PaginatedResponse } from "../../types/paging"

export interface FavoriteResponse {
  recipeId: number
  isFavorite: boolean
}

export const favoriteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query<PaginatedResponse<FavoriteRecipe>, { page?: number; limit?: number } | void>({
      query: (params) => ({ url: "/favorites", params: params ?? undefined }),
      providesTags: ["Favorite"],
    }),

    addFavorite: builder.mutation<FavoriteResponse, number>({
      query: (recipeId) => ({ url: `/favorites/${recipeId}`, method: "POST" }),
      invalidatesTags: ["Favorite", "Recipe"],
    }),

    removeFavorite: builder.mutation<void, number>({
      query: (recipeId) => ({ url: `/favorites/${recipeId}`, method: "DELETE" }),
      invalidatesTags: ["Favorite", "Recipe"],
    }),
  }),
})

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoriteApi
