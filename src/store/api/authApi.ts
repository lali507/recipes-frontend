import { apiSlice } from "./apiSlice"
import type { userRegister, userLogin, userResponse } from "../../types/user"

interface authResponse {
  token: string
  user: userResponse
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<authResponse, userRegister>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),
    login: builder.mutation<authResponse, userLogin>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    me: builder.query<{ user: userResponse }, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation, useMeQuery } = authApi
