import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import type { errResponse } from "../../types/eror"
import { logout } from "../state/userSlice"

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token")
    if (token) headers.set("Authorization", `Bearer ${token}`)
    return headers
  },
})

const baseQueryWithLogout: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    const code = (result.error.data as errResponse | undefined)?.error?.code
    if (code !== "INVALID_CREDENTIALS") {
      localStorage.removeItem("token")
      api.dispatch(apiSlice.util.resetApiState())
      api.dispatch(logout())

    }
  }

  return result
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithLogout,
  tagTypes: ["User", "Recipe", "Category", "Favorite"],
  endpoints: () => ({}),
})
