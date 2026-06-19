import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearAuthSession, getAccessToken, getRefreshToken, persistAuthSession } from "../features/admin/auth/authStorage";

export const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include",

prepareHeaders: (headers) => {
  const token = getAccessToken();

   headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
},
});
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
      console.log(result)
  if (result.error && result.error.status === 401) {
    const refreshToken = getRefreshToken();

    const refreshResult = await baseQuery(
      {
        url: "auth/refresh",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      persistAuthSession(refreshResult.data);
      result = await baseQuery(args, api, extraOptions);
    } else {
      clearAuthSession();
    }
  }

  return result;
};

export const refreshAuth = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    clearAuthSession();
    return { data: null };
  }

  const refreshResult = await baseQuery(
    {
      url: "auth/refresh",
      method: "POST",
      body: { refreshToken }, 
    },
    { dispatch: () => undefined, getState: () => ({}) } as any,
    {}
  );

  if (refreshResult.data) {
    persistAuthSession(refreshResult.data);
  } else {
    clearAuthSession();
  }

  return refreshResult;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
    tagTypes: [
    "Language",
    "users",
    "user",
    "TrainingPlan",
    "Venues",
    "Locations",
    "Categories",
    "Trainers",
    "Exam-types",
    "Questions-types",
    "Courses",
    "Courses-statuses",
    "StartForms",
    "EndForms",
    "Questions",
    "Exam-instances"
  ],
  endpoints: () => ({}),
});





// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import type { RootState } from "../app/store"


//  export const baseQuery = fetchBaseQuery({
//   baseUrl: "/",
//   credentials: "include", 

//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.accessToken

//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`)
//     }

//     return headers
//   },
// })
// const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
//   let result = await baseQuery(args, api, extraOptions)

//   if (result.error && result.error.status === 401) {

//     const refreshResult = await baseQuery(
//       { url: "/refresh", method: "GET" },
//       api,
//       extraOptions
//     )

//     if (refreshResult.data) {
    
//       api.dispatch({
//         type: "auth/setTokens",
//         payload: refreshResult.data,
//       })
//       result = await baseQuery(args, api, extraOptions)

//     } else {
//       api.dispatch({ type: "auth/logout" })
//     }
//   }

//   return result
// }
// export const baseApi = createApi({
//   reducerPath: "api",
//   baseQuery: baseQueryWithReauth, 
//   endpoints: () => ({}),
// })