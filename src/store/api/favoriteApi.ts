import { apiSlice } from "./apiSlice"
import type { FavoriteRecipe } from "../../types/recipe"
import type { PaginatedResponse } from "../../types/paging"

// POST /favorites/{id} מחזיר את המצב החדש
export interface FavoriteResponse {
  recipeId: number
  isFavorite: boolean
}

export const favoriteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // רשימה עם עמודים, ממוינת מהאחרון שנוסף. לכל פריט יש גם favoritedAt
    getFavorites: builder.query<PaginatedResponse<FavoriteRecipe>, { page?: number; limit?: number } | void>({
      query: (params) => ({ url: "/favorites", params: params ?? undefined }),
      providesTags: ["Favorite"],
    }),

    // אין גוף לבקשה - רק id בכתובת
    // גם Recipe נפסל - כי בכל מתכון יש isFavorite, והלב ברשימות צריך להתעדכן
    addFavorite: builder.mutation<FavoriteResponse, number>({
      query: (recipeId) => ({ url: `/favorites/${recipeId}`, method: "POST" }),
      invalidatesTags: ["Favorite", "Recipe"],
    }),

    // 204 - אין גוף תשובה, לכן void
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
