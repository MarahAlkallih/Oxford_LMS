import type { LoginUser } from "../../types/user";
import { baseApi } from "../../api/baseApi";
import { persistAuthSession } from "../../features/admin/auth/authStorage";

export const authTrainerService = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    loginTrainer: builder.mutation<any, LoginUser>({
      query: (data) => ({
        url: "/auth/login",
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
  useLoginTrainerMutation,
  useLogoutUserMutation,
} = authTrainerService;