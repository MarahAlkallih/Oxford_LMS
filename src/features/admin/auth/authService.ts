import type { User } from "../../../types/user";
import { baseApi } from "../../../api/baseApi";

export const authService = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // LOGIN
    login: builder.mutation<any, User>({
      query: (data) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: data,
      }),
    }),


    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useLogoutUserMutation,
} = authService;