import type { User } from "../../types/user";
import { baseApi } from "../../api/baseApi";
import { persistAuthSession } from "../../features/admin/auth/authStorage";

export const authService = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation<any, User>({
      query: (data) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => {
        
        const authData = response?.data || response?.payload || response;
    
        persistAuthSession(authData);
        
        return authData;
      },
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