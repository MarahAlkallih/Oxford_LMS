import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../app/store"


 export const baseQuery = fetchBaseQuery({
  baseUrl: "/",
  credentials: "include", 

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken

    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }

    return headers
  },
})
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {

    const refreshResult = await baseQuery(
      { url: "/refresh", method: "GET" },
      api,
      extraOptions
    )

    if (refreshResult.data) {
    
      api.dispatch({
        type: "auth/setTokens",
        payload: refreshResult.data,
      })
      result = await baseQuery(args, api, extraOptions)

    } else {
      api.dispatch({ type: "auth/logout" })
    }
  }

  return result
}
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth, 
  endpoints: () => ({}),
})