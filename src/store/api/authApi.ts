import { apiSlice } from "./apiSlice"
import type { userRegister, userLogin, userResponse } from "../../types/user"

interface authResponse {
  token: string
  user: userResponse
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // mutation = בקשה ששולחת או משנה נתונים (POST/PUT/DELETE)
    register: builder.mutation<authResponse, userRegister>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),
    login: builder.mutation<authResponse, userLogin>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    // query = בקשה שקוראת נתונים (GET)
    me: builder.query<{ user: userResponse }, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation, useMeQuery } = authApi
